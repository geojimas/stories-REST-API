## Stories REST API with NodeJS / TypeScript / Prisma ORM.

### Setup locally:

```shell
npm install
```

```shell
cp .env.example .env
```

```shell
npx prisma migrate dev --name init
```

```shell
npm run dev
```

#### Request Headers
```
Content-Type : application/json
X-Requested-With : XMLHttpRequest
```