import {google} from 'googleapis';
import {GoogleAuth} from 'google-auth-library';
import knex from "../db";
import credentials from '../../credentials.json'; // JSON-ключ

// Интерфейс для данных из PostgreSQL
interface Tariff {
    warehouse: string;
    date: string;
    deliverydumpkgtofficebase: string;
    deliverydumpkgtofficeliter: string;
    deliverydumpkgtreturnexpr: string;
    deliverydumpsrgofficeexpr: string;
    deliverydumpsrgreturnexpr: string;
    deliverydumpsupcourierbase: string;
    deliverydumpsupcourierliter: string;
    deliverydumpsupofficebase: string;
    deliverydumpsupofficeliter: string;
    deliverydumpsupreturnexpr: string;
}

// Настройка API Google Sheets
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const auth = new GoogleAuth({
    credentials,
    scopes: SCOPES,
});
const sheets = google.sheets({version: 'v4', auth});

// ID Google Таблицы (замени на свой)
const SPREADSHEET_ID = '1IAmcr9-QMUT3LaMQI7qPBIYFCd2PRBUImBzMujWZsWI';
const LIST_NAME = 'stocks_coefs';

/**
 * Функция для экспорта данных в Google Sheets
 */
export async function exportToGoogleSheets(): Promise<void> {
    try {
        // Получаем данные из PostgreSQL
        const data: Tariff[] = await knex<Tariff>('tariffs')
            .select('*')
            .orderBy('deliverydumpkgtofficebase'); // сортировка по коэффициенту

        const rows: (string | number)[][] = data.map((row) => [
            row.warehouse,
            row.date,
            row.deliverydumpkgtofficebase,
            row.deliverydumpkgtofficeliter,
            row.deliverydumpkgtreturnexpr,
            row.deliverydumpsrgofficeexpr,
            row.deliverydumpsrgreturnexpr,
            row.deliverydumpsupcourierbase,
            row.deliverydumpsupcourierliter,
            row.deliverydumpsupofficebase,
            row.deliverydumpsupofficeliter,
            row.deliverydumpsupreturnexpr,
        ]);

        await sheets.spreadsheets.values.update({
            spreadsheetId: SPREADSHEET_ID,
            range: LIST_NAME,
            valueInputOption: 'RAW',
            requestBody: {values: rows},
        });

        console.log('✅ Данные успешно выгружены в Google Sheets');
    } catch (error) {
        console.error('❌ Ошибка при выгрузке данных:', error);
    }
}
