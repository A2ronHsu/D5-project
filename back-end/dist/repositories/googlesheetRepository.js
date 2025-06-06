"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const googleapis_1 = require("googleapis");
//id of my spreadsheet on googlesheets
const SHEET_ID = "1MWYhGu-_8qygncjqUFn3FrwXVLcijCz-1ofay4x6q60";
class GoogleRepository {
    authClient;
    sheet;
    constructor(authClient) {
        this.authClient = authClient;
        // This line initializes the 'googleapis' Sheets client instance, configuring it to use the 'auth' object (which handles the actual authentication tokens) for all API requests.
        this.sheet = googleapis_1.google.sheets({ version: "v4", auth: authClient });
    }
    getSheetClient() {
        if (!this.sheet)
            throw new Error("SheetService not initialized.");
        return this.sheet;
    }
    /**
     * Appends new rows of data to the specified range in the Google Sheet.
     * This is ideal for adding new records.
     *
     * @param range The A1 notation or R1C1 notation of a range to append values to.
     * If the range is 'Sheet1!A:D', data will be appended after the last row in columns A-D.
     * @param values The data to append, as an array of arrays (each inner array is a row).
     * @param valueInputOption How the input data should be interpreted. 'USER_ENTERED' (default) parses values
     * as if they were entered into the UI. 'RAW' treats all values as strings.
     * @returns A promise that resolves to the append response from the API, or null if an error occurs.
     */
    async writeData(range, values, valueInputOption = "USER_ENTERED") {
        try {
            const sheets = this.getSheetClient();
            const requestBody = {
                values: values
            };
            const response = await sheets.spreadsheets.values.update({
                spreadsheetId: SHEET_ID,
                range: range,
                valueInputOption: valueInputOption,
                requestBody: requestBody,
                includeValuesInResponse: true
            });
            // console.log(response.data.updatedData);
            return response.data.updatedData?.values;
        }
        catch (error) {
            console.error(`Error peendin data to range ${range}:, `, error.message);
            return null;
        }
    }
    /**
     *
     * @param range range using A1 notation to be returned
     * @returns data as an array of array [][] on the given range, as row x column, otherwise return undefined
     */
    async getRange(range) {
        try {
            const sheets = this.getSheetClient();
            const response = await sheets.spreadsheets.values.get({
                spreadsheetId: SHEET_ID,
                range: range
            });
            const values = response.data.values;
            return values;
        }
        catch (error) {
            throw error.message;
        }
    }
    async getAll() {
        try {
            const sheet = await this.getRange("A:V");
            if (!sheet)
                throw new Error("the sheet is empty");
            return sheet;
        }
        catch (error) {
            error.message += "; error on getAll";
            throw new Error(error.message);
        }
    }
    /**
     * use getAll to find the 0 starting index of the the input
     *
     * @param codigo string input to find on the sheets
     * @returns index of codigo if present otherwise throws an error
     */
    async filterCodigoIndex(codigo) {
        try {
            const codigoColumns = await this.getAllCodigos();
            //find the index of the first occurrence of "codigo"
            let codigoIndex = codigoColumns.findIndex(row => row.toLocaleLowerCase() == codigo.toLocaleLowerCase());
            if (codigoIndex == -1)
                throw new Error("codigo not found");
            return codigoIndex;
        }
        catch (error) {
            error.message += "; error on filterCodigoIndex";
            console.error(error.message);
            throw new Error(error.message);
        }
    }
    /**
     *
     * @param codigo codigo of the posicion to be updated
     * @param newPosicion array of the new posicion in the correct order: pasillo, bloco, secuencia
     * @returns an array of array string[][], representing the row and columns of the updated row of codigo
     */
    async appendPosicion(codigo, newPosicion) {
        const condigoIndex = await this.filterCodigoIndex(codigo);
        const range = `D${condigoIndex + 1}:V${condigoIndex + 1}`;
        const dataRow = await this.getRange(range);
        if (!dataRow) {
            return await this.writeData(range, [newPosicion]);
        }
        const outputData = newPosicion;
        outputData.push(...dataRow[0]);
        if (outputData.length > 20) {
            for (let i = 0; i < 4; i++) {
                outputData.pop();
            }
        }
        // console.log(dataRow);
        return this.writeData(range, [outputData]);
    }
    /**
     *
     * @returns all codigo of the table, basically the column A:A
     */
    async getAllCodigos() {
        const allCodigos = await this.getRange("A:A");
        if (!allCodigos)
            throw new Error("empty codigo columns");
        return allCodigos.flat();
    }
    async getRow(codigo) {
        const index = await this.filterCodigoIndex(codigo);
        const row = (await this.getRange(`D${index + 1}:V${index + 1}`))?.flat();
        if (!row)
            throw new Error("error on getRow");
        return row;
    }
}
exports.default = GoogleRepository;
