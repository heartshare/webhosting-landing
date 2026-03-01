# Laravel LMS 技術方案
## 1000 間學校擴展解決方案

---

## 📋 目錄

1. [推薦架構](#推薦架構)
2. [基礎設施規格](#基礎設施規格)
3. [部署策略](#部署策略)
4. [安全性考量](#安全性考量)
5. [擴展計劃](#擴展計劃)
6. [風險評估與緩解](#風險評估與緩解)

---

## 推薦架構

### 核心決定：Laravel Forge + 單體 + 橫向擴展

**為何不用 K3s/K8s：**
- 兩人團隊維護 K8s 過於吃力
- Laravel 單體可以處理 500k 用戶
- K8s 學習成本高，ROI 低

### 架構圖

```
                    ┌─────────────┐
                    │   CDN       │ (CloudFlare)
                    │   靜態資源   │
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │ Load Balancer│ (Nginx / HAProxy)
                    └──────┬──────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
   ┌────▼────┐       ┌────▼────┐       ┌────▼────┐
   │ Laravel │       │ Laravel │       │ Laravel │
   │ App #1  │       │ App #2  │       │ App #3  │
   │ (4C8G)  │       │ (4C8G)  │       │ (4C8G)  │
   └────┬────┘       └────┬────┘       └────┬────┘
        │                  │                  │
        └──────────────────┼──────────────────┘
                           │
                    ┌──────▼──────┐
                    │   Redis     │ (Session + Queue + Cache)
                    │   Sentinel  │ (2C4G)
                    └──────┬──────┘
                           │
                ┌──────────┼──────────┐
         ┌──────▼────┐ ┌───▼────┐ ┌───▼────┐
         │ MySQL     │ │ MySQL  │ │ S3/    │
         │ Master    │ │ Slave  │ │ MinIO  │
         │ (4C16G)   │ │(4C16G) │ │(2C4G)  │
         └───────────┘ └────────┘ └────────┘
```

### 多租戶策略：Single-Database with Tenant Filtering

**為何選 Single-DB：**
- 降低基礎設施成本
- Schema 更新簡單
- 統一 analytics
- <500 間學校時足夠

**後續擴展：**
- 當 2-3 間學校用戶 >10k，再 migrate 到 database-per-tenant

---

## 基礎設施規格

### Phase 1: MVP (0-6 個月，<50k 用戶)

| 組件 | 數量 | 規格 | 月成本 |
|------|------|------|--------|
| Laravel App | 2 | 4C8G SSD 50GB | $80 |
| Redis | 1 | 2C4G | $30 |
| MySQL | 1 | 4C16G SSD 200GB | $60 |
| S3/MinIO | 1 | 2C4G HDD 500GB | $30 |
| **小計** | | | **~$200** |

### Phase 2: Production (6-18 個月，50k-200k 用戶)

| 組件 | 數量 | 規格 | 月成本 |
|------|------|------|--------|
| Laravel App | 3 | 4C8G SSD 50GB | $120 |
| Redis Cluster | 3 | 2C4G (Sentinel) | $90 |
| MySQL Cluster | 3 | 4C16G SSD 200GB (1M2S) | $180 |
| S3/MinIO | 1 | 2C4G HDD 1TB | $30 |
| Monitoring | 1 | 2C4G | $30 |
| **小計** | | | **~$450** |

### Phase 3: Scale (18 個月後，>200k 用戶)

**此時可考慮：**
- MySQL 分庫分表
- Redis Cluster 擴展
- CDN 全球節點
- 或 migrate 到 K8s

---

## 部署策略

### CI/CD 流程

```yaml
# GitHub Actions
name: Laravel CI/CD

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup PHP
        uses: shivammathur/setup-php@v2
        with:
          php-version: '8.2'
      - name: Install dependencies
        run: composer install --no-dev --optimize-autoloader
      - name: Run tests
        run: php artisan test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Deploy to Forge
        env:
          FORGE_API_KEY: ${{ secrets.FORGE_API_KEY }}
        run: |
          curl -X POST https://forge.laravel.com/api/servers/.../sites/.../deploy \
            -H "Authorization: Bearer $FORGE_API_KEY"
```

### 環境配置

```bash
# Production .env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://lms.yourdomain.com

# Database
DB_CONNECTION=mysql
DB_HOST=db-master.internal
DB_PORT=3306
DB_DATABASE=lms_production
DB_USERNAME=lms_user
DB_PASSWORD=強密碼

# Redis
REDIS_HOST=redis.internal
REDIS_PASSWORD=強密碼
REDIS_PORT=6379

# Queue
QUEUE_CONNECTION=redis

# Cache
CACHE_DRIVER=redis

# Session
SESSION_DRIVER=redis
SESSION_LIFETIME=120

# File Storage
FILESYSTEM_DISK=s3
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...
AWS_DEFAULT_REGION=ap-southeast-1
AWS_BUCKET=lms-storage
AWS_URL=https://lms-storage.s3.ap-southeast-1.amazonaws.com
```

### Queue Worker 配置

```bash
# Supervisor 配置
[program:laravel-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /var/www/lms/artisan queue:work redis --sleep=3 --tries=3 --timeout=90
autostart=true
autorestart=true
user=www-data
numprocs=4
redirect_stderr=true
stdout_logfile=/var/www/lms/storage/logs/worker.log
```

---

## 安全性考量

### 必須配置

```bash
# 1. HTTPS (Let's Encrypt)
certbot --nginx -d lms.yourdomain.com

# 2. Firewall
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 22/tcp
ufw limit 22/tcp
ufw enable

# 3. Fail2ban (防暴力破解)
apt install fail2ban
cat > /etc/fail2ban/jail.local <<EOF
[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log
maxretry = 5
bantime = 3600
EOF

# 4. MySQL 安全
mysql_secure_installation

# 5. Laravel 安全
# .env 文件權限
chmod 600 .env

# 防止目錄遍歷
Order deny,allow
Deny from all

# 防止直接訪問敏感文件
<FilesMatch "^\.env|artisan|composer\.json">
    Order allow,deny
    Deny from all
</FilesMatch>
```

### Rate Limiting

```php
// app/Providers/RouteServiceProvider.php
Route::middleware(['throttle:60,1'])->group(function () {
    // API routes
});

// 登錄暴力破解防護
RateLimiter::for('login', function (Request $request) {
    return Limit::perMinute(5)->by($request->ip());
});

// API 全局限速
RateLimiter::for('api', function (Request $request) {
    return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
});
```

### 數據加密

```php
// 敏感數據加密
use Illuminate\Support\Facades\Crypt;

$encrypted = Crypt::encryptString('sensitive-data');
$decrypted = Crypt::decryptString($encrypted);

// Database 加密字段
protected $casts = [
    'ssn' => 'encrypted',
    'credit_card' => 'encrypted',
];
```

---

## 擴展計劃

### Phase 1: MVP (0-6 個月)

**目標：**
- 快速上線
- 驗證需求
- <50k 用戶

**技術棧：**
- Laravel 11.x
- MySQL 8.0
- Redis 7.x
- Laravel Forge

**功能：**
- 基礎 LMS 功能（課程、作業、成績）
- 用戶管理
- 多租戶基礎

---

### Phase 2: Growth (6-18 個月)

**目標：**
- 50k-200k 用戶
- 穩定性優化
- 性能優化

**技術升級：**
- MySQL Master-Slave 讀寫分離
- Redis Cluster
- CDN (CloudFlare)
- Laravel Horizon (Queue 監控)
- Sentry (錯誤追蹤)

**功能：**
- 高級分析
- 即時通知
- 行動端優化

---

### Phase 3: Scale (18 個月後)

**目標：**
- >200k 用戶
- 全球部署
- 高可用

**技術升級：**
- MySQL 分庫分表 或遷移到 Postgres
- 或 migrate 到 K8s (此時團隊可能已擴展)
- 多區域部署
- 進階監控 (Datadog, New Relic)

---

## 風險評估與緩解

### 風險 1: 單點故障

**風險級別：** 高

**緩解：**
- MySQL Master-Slave + 自動故障切換
- Redis Sentinel
- Laravel App 多實例 + Load Balancer
- 備份策略

**RTO:** 4 小時
**RPO:** 15 分鐘

---

### 風險 2: 數據庫連接池耗盡

**風險級別：** 中

**緩解：**
- 連接池配置
- 讀寫分離
- Query 優化
- 索引優化

---

### 風險 3: 緩存失效錯誤

**風險級別：** 中

**緩解：**
- Cache tagging 測試
- Atomic version keys
- 監控 cache hit ratio
- 自動失效機制

---

### 風險 4: DDoS 攻擊

**風險級別：** 高

**緩解：**
- CloudFlare WAF
- Rate limiting
- Fail2ban
- 監控異常流量

---

### 風險 5: 數據泄露

**風險級別：** 高

**緩解：**
- 敏感數據加密
- SQL injection 防護 (Laravel Eloquent)
- XSS 防護
- CSRF 防護
- 定期安全審計

---

## 監控和警報

### 必須監控

```yaml
# Prometheus + Grafana 監控指標
metrics:
  - HTTP 请求速率
  - HTTP 响应时间 (P50, P95, P99)
  - 数据库查询时间
  - Redis 命令速率
  - Queue jobs 失败率
  - 磁盘使用率
  - CPU 使用率
  - 内存使用率

# 警報規則
alerts:
  - HTTP 错误率 > 5%
  - 数据库查询时间 > 1s
  - Queue jobs 失败 > 10/min
  - 磁盘使用率 > 80%
  - CPU 使用率 > 90% (持續 5 分鐘)
```

### 工具推薦

- **Laravel Telescope** - 本地開發調試
- **Laravel Horizon** - Queue 監控
- **Sentry** - 錯誤追蹤 (USD 20-50/月)
- **Grafana Cloud** - 監控面板 (USD 50-100/月)
- **UptimeRobot** - Uptime 監控 (免費)

---

## 備份策略

### MySQL 備份

```bash
#!/bin/bash
# 每日全備
mysqldump --single-transaction --routines --triggers \
  -u backup_user -p$password lms_production > /backup/lms_$(date +%Y%m%d).sql

# Binlog 增量備份 (每 15 分鐘)
mysqlbinlog --start-datetime="$(date -d '15 minutes ago' +'%Y-%m-%d %H:%M:%S')" \
  /var/lib/mysql/mysql-bin.* > /backup/binlog_$(date +%Y%m%d_%H%M).sql

# 上傳到 S3
aws s3 cp /backup/lms_$(date +%Y%m%d).sql s3://lms-backups/mysql/
aws s3 cp /backup/binlog_$(date +%Y%m%d_%H%M).sql s3://lms-backups/binlog/
```

### Laravel Storage 備份

```bash
#!/bin/bash
# 每日同步到 S3
rsync -avz --delete /var/www/lms/storage/app/ /backup/storage/
aws s3 sync /backup/storage/ s3://lms-backups/storage/

# 保留 30 天備份
find /backup/ -mtime +30 -delete
```

---

## 總結

### 推薦方案：Laravel Forge + 單體

**優點：**
- 開發快速，部署簡單
- 兩人團隊可維護
- 成本低 (~$200-450/月)
- 可以處理 500k 用戶

**下一步：**
1. 搭建 Laravel + Forge 環境 (2 天)
2. 實現多租戶基礎 (1 週)
3. 實現 LMS 核心功能 (4-6 週)
4. 性能測試和優化 (2 週)
5. Beta 測試 (4 週)

### 時間表

| 階段 | 時間 | 里程碑 |
|------|------|--------|
| Phase 1 | 0-3 個月 | MVP 上線，10 學校 |
| Phase 2 | 3-6 個月 | 擴展到 100 學校 |
| Phase 3 | 6-12 個月 | 擴展到 500 學校 |
| Phase 4 | 12-24 個月 | 擴展到 1000 學校 |

---

## 聯繫方式

**技術負責人：** Bob & Timmy
**文檔版本：** v1.0
**最後更新：** 2026-02-25

---

*本方案基於實踐經驗和最佳實踐，實施時請根據具體需求調整。*
