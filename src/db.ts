import knex from "knex";

// Настройка соединения с базой данных PostgreSQL
const db = knex({
    client: "pg",
    connection: {
        host: "localhost",
        user: "postgres", // Укажи имя пользователя
        password: "Astana2042", // Укажи пароль
        database: "wildberries", // Укажи имя базы данных
    },
});

export default db;
