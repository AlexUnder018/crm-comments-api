## CRM Comments API

REST API для CRM-системы: пользователи, задачи и комментарии к задачам.

### Технологии
- Node.js
- NestJS
- TypeORM
- PostgreSQL
- TypeScript

### Функциональность
1. Авторизация и регистрация пользователей с JWT.
2. CRUD для задач.
3. CRUD для комментариев к задачам.

### Бизнес-правила
- Создавать, редактировать и удалять комментарий может только его пользователь.
- Комментарии возвращаются отсортированными по дате (новые первыми).
- У задачи может быть несколько комментариев, комментарий относится только к одной задаче.
- Только пользователь может создать задачу.
- Только автор может создать комментарий.

### Сущности
#### Users
- id: UUID
- password: string
- role: string (AUTHOR или USER)
- created_at: timestamp
- updated_at: timestamp

#### Tasks
- id: UUID
- user_id: UUID
- description: string (1–1000)
- created_at: timestamp
- updated_at: timestamp

#### Comment
- id: UUID
- task_id: UUID
- user_id: UUID
- text: string (1–1000)
- created_at: timestamp
- updated_at: timestamp

### Эндпоинты
#### Пользователи
- POST /users — создать пользователя
- GET /users/:id — получить пользователя по ID
- GET /users — список пользователей
- PATCH /users/:id — редактировать пользователя
- DELETE /users/:id — удалить пользователя

#### Аутентификация
- POST /auth/register — регистрация
- POST /auth/login — логин

#### Задачи
- POST /tasks — создать задачу
- GET /tasks/:id — получить задачу по ID
- GET /tasks — список задач (новые первыми)
- PATCH /tasks/:id — редактировать задачу
- DELETE /tasks/:id — удалить задачу

#### Комментарии
- POST /comments — создать комментарий
- GET /comments?task_id=xxx — список комментариев к задаче (новые первыми)
- GET /comments/:id — получить комментарий по ID
- PATCH /comments/:id — редактировать комментарий
- DELETE /comments/:id — удалить комментарий

### Запуск проекта
1. Установить зависимости:
   - npm install
2. Поднять PostgreSQL через Docker:
   - docker compose up -d
3. Запустить приложение:
   - npm run start:dev

### Переменные окружения
Создайте файл .env в корне проекта и укажите:
- DB_HOST
- DB_PORT
- DB_USERNAME
- DB_PASSWORD
- DB_DATABASE
- JWT_SECRET
- JWT_EXPIRES_IN

### Тестирование
- npm run test
- npm run test:e2e

### Примечания
- Валидация данных реализована через DTO.
- JWT используется для защиты эндпоинтов.
