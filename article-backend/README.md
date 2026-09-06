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

## Running with Docker (Quick Start)

> **Prerequisites:** Ensure [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) are installed on your machine.

Follow this step-by-step guide to run the server and set up the database (including dummy data):

### 1. Start the Containers
You can start the containers in either Development or Production mode. In both modes, the database schema will be automatically pushed on startup.

**Development Mode (with hot-reload):**
```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d
```

**Production Mode:**
```bash
docker compose up -d
```
*(Wait a moment for the database container to fully start and automatically push the database schema)*

### 2. Insert Dummy Data (Seeder)
Finally, populate the database with initial dummy data (1 user and 25 articles) so the API is ready to use:
```bash
docker compose exec backend npx prisma db seed
```

**Done!** Your backend API is now fully operational at `http://localhost:8000`.

---

### Common Commands

```bash
docker compose ps              # View container status
docker compose logs -f backend # View live logs from the backend
docker compose up -d --build   # Rebuild images and restart services (useful when package.json changes)
docker compose down            # Stop all services
docker compose down -v         # Stop services AND DELETE the database data
```
