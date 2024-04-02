# postgre-pdf-upload
## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- PostgreSQL database (ElephantSQL) set up.
- Sign up for an ElephantSQL account to obtain your database credentials.
- ```bash
  CREATE TABLE pdf_storage (
    id SERIAL PRIMARY KEY,
    filename TEXT,
    pdf_data BYTEA,
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    uploaded_by TEXT
);


### Installation

1. **Clone the repository:**

   ```bash
   git clone [https://github.com/yourusername/quickzen.git](https://github.com/abhaydixit07/postgre-pdf-upload.git)
2. **Navigate to the project directory:**

   ```bash
   cd quickzen
3. **Install dependencies:**
   ```bash
   npm install

4. **Configure the database:**

   -Set up a PostgreSQL database on ElephantSQL.  
   -Obtain your database credentials from ElephantSQL.  
   -Update the database configuration in index.js with your ElephantSQL credentials.  

5. **Run the application:**
   ```bash
   npm start

**The application will be accessible at http://localhost:3000 by default.**
