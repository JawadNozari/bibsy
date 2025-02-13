# Bibsy

🚦 **Running the Project:**

Create a PostgreSQL database and add its URL to the .env file at the root of the project.
DATABASE_URL=LINK_TO_YOUR_DATABASE

Using [Bun](https://bun.sh/) for package management is recommended due to its speed and modern features. If you prefer, you can use [Yarn](https://yarnpkg.com/) as an alternative.

### Install Dependencies

#### Using Bun (Recommended):
```sh
bun install
```

#### Using Yarn:
```sh
yarn install
```

### Running the Project

#### With Bun:
```sh
bun run dev
```

#### With Yarn:
```sh
yarn dev
```

### Environment Setup
Create a PostgreSQL database and add its URL to the `.env` file at the root of the project.
```env
DATABASE_URL=LINK_TO_YOUR_DATABASE
