## Start

### 部署

1. 需要在有 docker 的環境

2. 執行 `docker-compose up -d`

3. 進入 container 執行 `sequelize db:migrate --config config/db.json`

### 開發

1. 請在開發環境準備好 MySQL

2. 修改 `config/db.json` 內 `development` 中的資料庫參數

3. 執行 `node_modules/.bin/sequelize db:migrate --config config/db.json`

4. 執行 `npm start`
