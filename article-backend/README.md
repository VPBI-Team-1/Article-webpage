# Article Backend

This is the backend service for the Article Webpage project, built with Express, TypeScript, Prisma, and MariaDB.

## Prerequisites
- Node.js installed
- MariaDB/MySQL database running

## How to Run Locally

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file in the root directory and add your database connection string and other required variables (e.g., `DATABASE_URL`, `JWT_SECRET`).

3. **Database Setup**
   Apply the Prisma schema to your database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Start the Development Server**
   ```bash
   npm run dev
   ```
   The server will run using `tsx watch` for automatic hot-reloading.

## Production Build

To build and run the project for production:

```bash
npm run build
npm start
```

---

## Running with Docker

> **Prerequisites:** [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) must be installed.

### Production

```bash
docker compose up
```

On first run, Docker will automatically build the image, run migrations, and start the server at `http://localhost:8000`. To rebuild after code changes, add the `--build` flag.

### Development (Hot-Reload)

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml up
```

### Common Commands

```bash
docker compose ps              # Check container status
docker compose logs -f backend # Stream backend logs
docker compose down            # Stop all services
docker compose down -v         # Stop and remove volumes (clears database)
```

