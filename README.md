# Subsly

<img src="./docs/subsly.png" width="800px" />

Manage your subscription spending in one place 🚀

## Frontend

The frontend of **Subsly** is built with **Angular** and provides the user interface to view, add, edit, and track subscriptions.

### Setup

To set up the frontend locally:

1. Clone the repository.

   ```bash
   git clone https://github.com/Waxer59/Subsly.git
   ```

2. Change the working directory to the frontend folder.

   ```bash
   cd Subsly/frontend
   ```

3. Install dependencies:

   ```bash
   pnpm install
   ```

4. Start the development server:

   ```bash
   pnpm start
   ```

### Dependencies

The frontend uses the following technologies:

* Angular
* Tailwind CSS
* TypeScript
* Spartan UI
* ChartJs
* Lucide icons
* Zod

---

## Backend

The backend of Subsly is implemented in **Java with Spring Boot** and exposes a REST API for managing subscriptions, users, etc.

### Setup

To set up the backend locally:

1. Navigate to the backend directory:

   ```bash
   cd Subsly/backend
   ```

2. Install dependencies & build:

   ```bash
   ./mvnw clean install
   ```

3. Create environment configuration:

   ```bash
   cp .template.env .env
   ```

4. Fill in required environment variables in `.env` (DB credentials, API keys, etc).

5. Run the backend:

   ```bash
   ./mvnw spring-boot:run
   ```

### Dependencies

The backend uses:

* Spring Boot
* Spring Data JPA
* PostgreSQL
* Swagger / OpenAPI for API documentation
* Sprint Security
* Spring Security OAuth2
* Lombok
* Jacoco
* JUnit

---

## API Documentation (Swagger)

Subsly’s backend includes **Swagger / OpenAPI documentation** to explore and test all endpoints.

### Accessing Swagger UI

Once the backend is running, open your browser and visit:

```
http://localhost:<PORT>/api/swagger-ui/index.html
```

Replace `<PORT>` with the port the application listens on (configured in `.env` / `application.yml`).

## Chrome Extension

Subsly includes a Chrome extension that lets users **quickly add subscriptions from any website**.

### Setup

1. In Chrome, go to `chrome://extensions`.
2. Enable **Developer mode**.
3. Click **Load unpacked** and select the `chrome-extension/dist` folder.
4. The extension will install locally.

Use it to capture subscription services as you browse and add them to your Subsly dashboard.

### Dependencies

The Chrome extension uses:
* TypeScript
* React
* Tailwind CSS
* crxjs
