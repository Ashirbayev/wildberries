import express, { Request, Response } from "express"; // Добавляем типы Request и Response
import "./scheduler"; // Импортируем планировщик

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {  // Указываем типы для req и res
    res.send("Сервер запущен 🚀");
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
