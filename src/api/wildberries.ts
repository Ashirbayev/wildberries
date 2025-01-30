import axios from "axios";
import knex from "../db";

const WB_API_URL = "https://common-api.wildberries.ru/api/v1/tariffs/return";
const WB_API_TOKEN = "eyJhbGciOiJFUzI1NiIsImtpZCI6IjIwMjQxMDE2djEiLCJ0eXAiOiJKV1QifQ.eyJlbnQiOjEsImV4cCI6MTc0NjA2ODAxNywiaWQiOiIwMTkyZGRlYS1mOWU2LTcxNzItODk0Ny1iMjE1Y2I5MmU5NDgiLCJpaWQiOjQ1OTExNjA5LCJvaWQiOjExMzA0NiwicyI6MTA3Mzc0MTgzMiwic2lkIjoiOTMyYzE3NmEtNTA4NS01YzZmLWJjMzMtNGU4NGNkZjU4ZDdlIiwidCI6ZmFsc2UsInVpZCI6NDU5MTE2MDl9.l2C-kGr-1YptJ5iyp_q1RYSxDOgENHXfGepnmo709g2UsGDnT90NnBt5K-nVLVH14XaEFi81dcmeZvF6qz-oxQ";

export async function fetchTariffs() {
    try {
        const response = await axios.get(WB_API_URL, {
            headers: { Authorization: `Bearer ${WB_API_TOKEN}` },
            params: { date: new Date().toISOString().split("T")[0] }, // текущая дата
        });

        const tariffs = response.data.response?.data?.warehouseList; // Проверяем путь к данным

        if (!Array.isArray(tariffs)) {
            throw new Error("Некорректный формат данных от API");
        }

        for (const tariff of tariffs) {
            await knex("tariffs")
                .insert({
                    warehouse: tariff.warehouseName,
                    deliverydumpkgtofficebase: tariff.deliveryDumpKgtOfficeBase,
                    deliverydumpkgtofficeliter: tariff.deliveryDumpKgtOfficeLiter,
                    deliverydumpkgtreturnexpr: tariff.deliveryDumpKgtReturnExpr,
                    deliverydumpsrgofficeexpr: tariff.deliveryDumpSrgOfficeExpr,
                    deliverydumpsrgreturnexpr: tariff.deliveryDumpSrgReturnExpr,
                    deliverydumpsupcourierbase: tariff.deliveryDumpSupCourierBase,
                    deliverydumpsupcourierliter: tariff.deliveryDumpSupCourierLiter,
                    deliverydumpsupofficebase: tariff.deliveryDumpSupOfficeBase,
                    deliverydumpsupofficeliter: tariff.deliveryDumpSupOfficeLiter,
                    deliverydumpsupreturnexpr: tariff.deliveryDumpSupReturnExpr,
                    date: new Date().toISOString().split("T")[0],
                })
                .onConflict(["warehouse", "date"])
                .merge();
        }

        console.log("Данные успешно обновлены");
    } catch (error) {
        console.error("Ошибка при получении данных:", error);
    }
}
