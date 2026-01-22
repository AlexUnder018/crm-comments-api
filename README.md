## CRM Comments API

REST API для CRM-системы: пользователи, задачи и комментарии к задачам.

## Кратко о решении
Проект реализован на NestJS с модульной архитектурой: `auth`, `users`, `tasks`, `comments`. Бизнес-правила закрываются на уровне сервисов и guard-ов, а корректность входных данных — через DTO + глобальный `ValidationPipe`.

## Почему именно так (аргументация решений)
- **NestJS + модули** — удобно разнести ответственность и тестировать фичи отдельно.
- **JWT + Passport** — минимальный и ожидаемый способ авторизации для тестового.
- **RolesGuard** — формально закрепляет правило “кто может создавать задачи/комментарии” (роль проверяется в `@Roles`).
- **TypeORM + `autoLoadEntities`** — быстрый старт без ручной регистрации сущностей.
- **`synchronize: true`** — допустимо для тестового задания, чтобы не тратить время на миграции. В проде — только миграции.
- **Сортировка по дате в репозиториях** — гарантирует “новые первыми” независимо от клиента.
- **Swagger** — дополнительный плюс по требованиям; документация доступна сразу после запуска.

## Технологии
- Node.js
- NestJS
- TypeORM
- PostgreSQL
- TypeScript

## Функциональность
1. Авторизация и регистрация пользователей с JWT.
2. CRUD для задач.
3. CRUD для комментариев к задачам.

## Бизнес-правила
- Создавать, редактировать и удалять комментарий может только его пользователь.
- Комментарии возвращаются отсортированными по дате (новые первыми).
- У задачи может быть несколько комментариев, комментарий относится только к одной задаче.
- Только пользователь с ролью `user` может создать задачу.
- Только пользователь с ролью `author` может создать комментарий.

## Сущности
### Users
- id: UUID
- password: string
- role: string (`author` или `user`)
- created_at: timestamp
- updated_at: timestamp

### Tasks
- id: UUID
- user_id: UUID
- description: string (1–1000)
- created_at: timestamp
- updated_at: timestamp

### Comment
- id: UUID
- task_id: UUID
- user_id: UUID
- text: string (1–1000)
- created_at: timestamp
- updated_at: timestamp

## Эндпоинты
### Пользователи
- POST /users — создать пользователя
- GET /users/:id — получить пользователя по ID
- GET /users — список пользователей
- PATCH /users/:id — редактировать пользователя
- DELETE /users/:id — удалить пользователя

### Аутентификация
- POST /auth/register — регистрация (role: `author` | `user`)
- POST /auth/login — логин

### Задачи
- POST /tasks — создать задачу
- GET /tasks/:id — получить задачу по ID
- GET /tasks — список задач (новые первыми)
- PATCH /tasks/:id — редактировать задачу
- DELETE /tasks/:id — удалить задачу

### Комментарии
- POST /comments — создать комментарий
- GET /comments?task_id=xxx — список комментариев к задаче (новые первыми)
- GET /comments/:id — получить комментарий по ID
- PATCH /comments/:id — редактировать комментарий
- DELETE /comments/:id — удалить комментарий

## Запуск проекта
### 1) Установить зависимости
```bash
npm install
```

### 2) Поднять PostgreSQL через Docker
```bash
docker compose up -d
```

### 3) Создать .env в корне проекта
```dotenv
DB_HOST=localhost
DB_PORT=5432
DB_USER=crm
DB_PASS=crm
DB_NAME=crm

JWT_ACCESS_SECRET=supersecret
JWT_ACCESS_EXPIRES_IN=15m
```

### 4) Запустить приложение
```bash
npm run start:dev
```

### Swagger
Документация доступна по адресу: http://localhost:3000/docs

## Тестирование
```bash
npm run test
npm run test:e2e
```

## Примечания
- Валидация данных реализована через DTO и `ValidationPipe`.
- JWT используется для защиты эндпоинтов (Bearer token).
- Для тестового задания включена автосинхронизация схемы (`synchronize: true`).
