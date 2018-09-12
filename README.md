## Version

node 8.11.1

Mariadb 5.5

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

### 建 Migration

1. 執行 `node_modules/.bin/sequelize migration:generate --name create-table-xxxx`

2. 修改新建立的 migration file，添加欄位

3. 執行 `node_modules/.bin/sequelize db:migrate --config config/db.json`

4. 在 `models` 資料夾建立相對應 model 檔案

[sequelize 資料類型](http://docs.sequelizejs.com/manual/tutorial/models-definition.html#data-types)

