## Project Setup

### Server Setup

To set up the Node.js server, follow these steps:

1. **Install Dependencies**
   Run the following command to install all necessary packages:

   ```bash
   npm install
   ```

2. **Start the Server**
   Use the command below to start the server in development mode:

   ```bash
   npm run dev
   ```

   For production mode, use:

   ```bash
   npm start
   ```

### Database Setup

If your project includes a MySQL database and uses Sequelize, follow the steps below to set up the database:

1. **Configure Database Connection**
   Update the `config/config.json` file with your database credentials. Ensure it matches the settings specified in your `.env` file.

2. **Generate a Model**
   To generate a `User` model with attributes `firstName`, `lastName`, and `email`, use:

   ```bash
   npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
   ```

3. **Generate a Seeder**
   To generate a seeder file use:

   ```bash
   npx sequelize-cli seed:generate --name demo-user
   ```

4. **Run Migrations**
   Apply all pending migrations by running:

   ```bash
   npx sequelize-cli db:migrate
   ```

5. **Run Seeders** (Optional)
   If seed data is available, run:

   ```bash
   npx sequelize-cli db:seed:all
   ```

6. **Undo All Migrations and Seeders**
   If seed data is available, run:

   ```bash
   npx sequelize-cli db:migrate:undo:all
   npx sequelize-cli db:seed:undo:all
   ```
