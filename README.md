# DiamondStore Inventory & Analytics

**DiamondStore** is a full-stack e-commerce application tailored for independent diamond merchants. It provides real-time inventory management, secure sales transactions, and live analytics dashboards, helping sellers make data-driven decisions and buyers find the perfect gem.

---

## Features

- **Seller Dashboard**: 
  - CRUD operations for diamonds with detailed attributes (carat, cut, clarity, certification, price, status).
  - Image uploads to AWS S3 with instant preview.
  - CSV bulk import for fast inventory entry.

- **Public Listings**:
  - Dynamic filtering (price, carat range, cut, clarity) and sorting.
  - Paginated grid with client-side updates (no full-page refresh).
  - SEO-friendly Next.js pages.

- **Gift Quiz**:
  - Interactive multi-step quiz collecting preferences.
  - Randomized diamond recommendations based on user input.

- **Order Flow**:
  - Secure checkout form with validation.
  - JWT-based authentication (access & refresh tokens).
  - Order confirmation and simulated payment.

- **Live Analytics**:
  - Real-time charts (bar, pie, line) powered by Chart.js.
  - `/admin/sales` endpoint aggregates sales, inventory, and status counts.
  - Polling every 10 seconds for instant dashboard updates.

- **Quality Assurance & CI/CD**:
  - Unit tests (Jest + Supertest) and integration tests (Postman/Newman).
  - Automated workflows with GitHub Actions.
  - Performance benchmarks (ApacheBench, Artillery).

---

## Tech Stack

- **Frontend**: Next.js, React, Chart.js
- **Backend**: Node.js, Express, Sequelize ORM
- **Database**: PostgreSQL
- **Storage**: AWS S3
- **Authentication**: JSON Web Tokens (JWT)
- **Testing**: Jest, Supertest, Postman/Newman
- **CI/CD**: GitHub Actions
- **Project Management**: Trello, GitHub Issues

---

## Prerequisites

- Node.js (v18.x)
- npm (v8+)
- PostgreSQL
- AWS account with S3 bucket
- (Optional) Mailgun or other SMTP provider for email

---

## Setup & Installation

1. **Clone the repository**  
   ```bash
   git clone https://github.com/<your-org>/DiamondInventory.git
   cd DiamondInventory
   ```

2. **Environment Variables**  
   Create a `.env` in `backend/` and `frontend/` with:
   ```
   # Backend
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=diamondstore
   DB_USER=postgres
   DB_PASS=your_db_password
   JWT_SECRET=your_jwt_secret
   JWT_REFRESH_SECRET=your_jwt_refresh_secret
   EMAIL_HOST=smtp.mailgun.org
   EMAIL_PORT=587
   EMAIL_USER=postmaster@your_domain
   EMAIL_PASS=your_mailgun_api_key
   AWS_ACCESS_KEY_ID=YOUR_AWS_KEY
   AWS_SECRET_ACCESS_KEY=YOUR_AWS_SECRET
   S3_BUCKET_NAME=your_bucket_name

   # Frontend
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

3. **Install Dependencies**  
   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

4. **Database Setup**  
   ```bash
   # In backend
   npx sequelize db:create
   npx sequelize db:migrate
   ```
   
5. **Run the App**  
   ```bash
   # Start backend
   cd backend
   npm start

   # In another terminal, start frontend
   cd ../frontend
   npm run dev
   ```
   The frontend will be available at `http://localhost:3000`, backend at `http://localhost:5000`.

---

## Testing

- **Unit & Integration**  
  ```bash
  cd backend
  npm test
  ```
- **Postman Collections**  
  Import `backend/tests/PostmanCollection.json` into Postman and run with Newman.

- **Performance**  
  ```bash
  ab -n 1000 -c 10 http://localhost:5000/import
  artillery run tests/artillery.yml
  ```

---

## Deployment

1. **Build Frontend**  
   ```bash
   cd frontend
   npm run build
   ```
2. **Deploy Backend**  
   Configure your production environment variables and use Docker or your preferred host.

3. **GitHub Actions**  
   Adjust `.github/workflows/ci.yml` as needed to automate tests and deployments.

---

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m "Add YourFeature"`
4. Push to branch: `git push origin feature/YourFeature`
5. Open a Pull Request.

---

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

## Contact

Made with by Saqib Rehman — [210212860@aston.ac.uk](mailto:210212860@aston.ac.uk)
