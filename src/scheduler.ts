import { fetchTariffs } from "./api/wildberries";
import { exportToGoogleSheets } from "./api/exportToGoogleSheets";

async function runTask() {
    console.log("Запуск обновления данных...");
    try {
        await fetchTariffs();
        await exportToGoogleSheets();
        console.log("Данные успешно обновлены.");
    } catch (error) {
        console.error("Ошибка при обновлении данных:", error);
    }
}

// Запускаем сразу при старте
runTask();

setInterval(runTask, 60 * 60 * 1000);  // 1 час

