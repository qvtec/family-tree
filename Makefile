include .env
SAIL=./vendor/bin/sail

install:
	@make up
	docker compose exec app composer install
	docker compose exec app cp .env.example .env
	docker compose exec app php artisan key:generate
	docker compose exec app php artisan storage:link
	docker compose exec app chmod -R 777 storage bootstrap/cache
	@make migrate
	@run-install
	@run-build

# Docker ////////////////////////////////////////////////////////////////////////////
up:
	$(SAIL) up -d
stop:
	$(SAIL) stop
down:
	$(SAIL) down --remove-orphans
ps:
	$(SAIL) ps

# Log ////////////////////////////////////////////////////////////////////////////
logs:
	$(SAIL) logs
logs-watch:
	$(SAIL) logs --follow

# Docker container ////////////////////////////////////////////////////////////////////////////
web:
	$(SAIL) exec laravel.test bash
db:
	$(SAIL) exec mysql bash
sql:
	$(SAIL) exec mysql bash -c 'mysql -u $(DB_USERNAME) -p$(DB_PASSWORD) $(DB_DATABASE)'

# Front ////////////////////////////////////////////////////////////////////////////
run:
	$(SAIL) exec laravel.test npm run dev
run-install:
	$(SAIL) exec laravel.test npm install
run-build:
	$(SAIL) exec laravel.test npm run build

# DB ////////////////////////////////////////////////////////////////////////////
migrate:
	$(SAIL) exec laravel.test php artisan migrate
migrate-rollback:
	$(SAIL) exec laravel.test php artisan migrate:rollback
fresh:
	$(SAIL) exec laravel.test php artisan migrate:fresh --seed
seed:
	$(SAIL) exec laravel.test php artisan db:seed
tinker:
	$(SAIL) exec laravel.test php artisan tinker
test:
	$(SAIL) exec laravel.test php artisan test

# Laravel create file ////////////////////////////////////////////////////////////////////////////
# make create-mcr name=User
create-mcr:
	$(SAIL) exec laravel.test php artisan make:model $(name) -mcr
	sudo chown -R 1000:1000 ./app/Http/Controllers
	sudo chown -R 1000:1000 ./app/Models
	sudo chown -R 1000:1000 ./database/migrations

# make create-migration table_name=carshares
create-migration:
	$(SAIL) exec laravel.test php artisan make:migration create_$(table_name)_table --create=$(table_name)
	sudo chown -R 1000:1000 ./database/migrations

# make create-controller name=Auth
create-controller:
	$(SAIL) exec laravel.test php artisan make:controller $(name)Controller --resource
	sudo chown -R 1000:1000 ./app/Http/Controllers

# make create-model name=User
create-model:
	$(SAIL) exec laravel.test php artisan make:model $(name)
	sudo chown -R 1000:1000 ./app/Models
