"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const googleapis_1 = require("googleapis");
const requestErrorHandler_1 = __importDefault(require("../4schemas/requestErrorHandler"));
//id of my spreadsheet on googlesheets
const SHEET_ID = {
    'D5': "1NECc6VReyx16_O1TTrizbDPZzyGas4lmatn8hGAG3xE",
    'D8': "1Ut6kE5d_Jn_KC0jBP4I9BhJ5u6A17tAB3cGI4cxZLzA",
    'D1': "1CqLs1V4tMhBMb1EeOyOsy4heoruVqqDLogiSQSSppVE",
    'D9': "1SdGxEMuxIx9lC8_GXLSuiyr96mM8KuVzgq5OPf8t_3k",
    'D4': "1SaMpkICKXfvdlBmdogTb_GPOubPN7KapdP6n-GGMYf8",
    'D2': "1m5lRqJ2JSaLxG9lNDOBKPtbpI0b7zjeccDlCHQvS5co"
};
class GoogleRepository {
    authClient;
    sheet;
    constructor(authClient) {
        this.authClient = authClient;
        // This line initializes the 'googleapis' Sheets client instance, configuring it to use the 'auth' object (which handles the actual authentication tokens) for all API requests.
        this.sheet = googleapis_1.google.sheets({ version: "v4", auth: authClient });
    }
    /**
     * Appends new rows of data to the specified range in the Google Sheet.
     * This is ideal for adding new records.
     *
     * @param range The A1 notation or R1C1 notation of a range to append values to.  If the range is 'Sheet1!A:D', data will be appended after the last row in columns A-D.
     * @param values The data to append, as an array of arrays (each inner array is a row).
     * @param valueInputOption How the infilterCodigoIndexput data should be interpreted. 'USER_ENTERED' (default) parses values     * as if they were entered into the UI. 'RAW' treats all values as strings.
     * @param dep Warehouse name referent to SHEET_ID
     * @returns A promise that resolves to the append response from the API, or null if an error occurs.
     */
    async writeData(range, values, dep, valueInputOption = "USER_ENTERED") {
        try {
            const sheets = this.sheet;
            const requestBody = {
                values: values
            };
            const response = await sheets.spreadsheets.values.update({
                spreadsheetId: SHEET_ID[dep],
                range: range,
                valueInputOption: valueInputOption,
                requestBody: requestBody,
                includeValuesInResponse: true
            });
            if (!response.data.updatedData.values) {
                throw new Error();
            }
            return response.data.updatedData.values;
        }
        catch (error) {
            console.error(`Error apending data to range ${range}:, `, error);
            if (error instanceof Error) {
                throw new requestErrorHandler_1.default(500, "Error on writing data", error.message);
            }
            else {
                throw new requestErrorHandler_1.default(500, "Error on writing data", "unknown error");
            }
        }
    }
    /**
     *
     * @param range range using A1 notation to be returned
     * @param dep Warehouse name referent to SHEET_ID
     * @returns data as an array of array [][] on the given range, as row x column, otherwise return undefined
     */
    async getRange(range, dep) {
        try {
            const sheets = this.sheet;
            const response = await sheets.spreadsheets.values.get({
                spreadsheetId: SHEET_ID[dep],
                range: range
            });
            const values = response.data.values;
            // if(!values) throw new Error ("no values on get range");
            return values;
        }
        catch (error) {
            console.error("Error getting the range ", range, error);
            if (error instanceof Error) {
                throw new requestErrorHandler_1.default(500, "error getting range", error.message);
            }
            else {
                throw new requestErrorHandler_1.default(500, "error getting range", "unknown error");
            }
        }
    }
    /**
     * @param dep Warehouse name referent to SHEET_ID
     * @returns Entire table data
     */
    async getAll(dep) {
        try {
            const sheet = await this.getRange("A:V", dep);
            if (!sheet)
                throw new Error("the sheet is empty");
            return sheet;
        }
        catch (error) {
            console.error("error getting all", error);
            if (error instanceof Error) {
                throw new requestErrorHandler_1.default(500, "error getting all", error.message);
            }
            else {
                throw new requestErrorHandler_1.default(500, "error getting all", "unknown error");
            }
        }
    }
    /**
     * use getAll to find the 0 starting index of the the input
     * @param dep Warehouse name referent to SHEET_ID
     *
     * @param codigo string input to find on the sheets
     * @returns index of codigo if present otherwise throws an error
     */
    async findCodigoIndex(codigo, dep) {
        try {
            const codigoColumns = await this.getAllCodigos(dep);
            //find the index of the first occurrence of "codigo"
            let codigoIndex = codigoColumns.findIndex(row => row.toLocaleLowerCase() == codigo.toLocaleLowerCase());
            if (codigoIndex == -1)
                throw new Error("codigo not found");
            return codigoIndex;
        }
        catch (error) {
            console.error("error fetching codigo index", error);
            if (error instanceof Error) {
                throw new requestErrorHandler_1.default(500, "index error", error.message);
            }
            else {
                throw new requestErrorHandler_1.default(500, "index error", "unknown error");
            }
        }
    }
    /**
     * @param dep Warehouse name referent to SHEET_ID
     * @param codigo codigo of the posicion to be updated
     * @param newPosicion array of the new posicion in the correct order: pasillo, bloco, secuencia
     * @returns an array of array string[][], representing the row and columns of the updated row of codigo
     */
    async appendPosicion(codigo, newPosicion, dep) {
        try {
            const codigoIndex = await this.findCodigoIndex(codigo, dep);
            const range = `D${codigoIndex + 1}:W${codigoIndex + 1}`;
            let dataRow = await this.getRange(range, dep);
            if (!dataRow) {
                dataRow = [[]];
            }
            const outputData = Array.from(newPosicion);
            outputData.push(...dataRow[0]);
            //these two constants are specific for the table formatting
            const endOfSheet = 20; //this is the number of columns
            const posicionDataUnit = 5; //this is the size of data unit, which is 5 cells
            if (outputData.length > endOfSheet) {
                for (let i = 0; i < posicionDataUnit; i++) {
                    outputData.pop();
                }
            }
            // console.log(dataRow);
            return this.writeData(range, [outputData], dep);
        }
        catch (error) {
            console.error("error appending", error);
            if (error instanceof Error) {
                throw new requestErrorHandler_1.default(500, "append error", error.message);
            }
            else {
                throw new requestErrorHandler_1.default(500, "append error", "Unknown error");
            }
        }
    }
    /**
     * @param dep Warehouse name referent to SHEET_ID
     *
     * @returns all codigo of the table, basically the column A:A
     */
    async getAllCodigos(dep) {
        try {
            const allCodigos = await this.getRange("A:A", dep);
            if (!allCodigos)
                throw new Error("empty codigo columns");
            return allCodigos.flat();
        }
        catch (error) {
            console.error("error getting all codigos", error);
            if (error instanceof Error) {
                throw new requestErrorHandler_1.default(500, "error getting codigo", error.message);
            }
            else {
                throw new requestErrorHandler_1.default(500, "error getting codigo", "unknown error");
            }
        }
    }
    /**
     * @param dep Warehouse name referent to SHEET_ID
     *
     * @param codigo the string representing the codigo of the product on the sheet
     * @returns flaten array representing the data on the fetched row.
     */
    async getRow(codigo, dep) {
        try {
            const index = await this.findCodigoIndex(codigo, dep);
            const row = (await this.getRange(`B${index + 1}:W${index + 1}`, dep))?.flat();
            if (!row)
                throw new Error("error on getRow");
            return row;
        }
        catch (error) {
            console.error("error getting row", error);
            if (error instanceof Error) {
                throw new requestErrorHandler_1.default(500, "row error", error.message);
            }
            else {
                throw new requestErrorHandler_1.default(500, "row error", "unknown error");
            }
        }
    }
}
exports.default = GoogleRepository;
