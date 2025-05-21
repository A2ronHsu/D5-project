import { google, sheets_v4 } from "googleapis";
import { GoogleAuth } from "google-auth-library";

//id of my spreadsheet on googlesheets
const SHEET_ID = "1MWYhGu-_8qygncjqUFn3FrwXVLcijCz-1ofay4x6q60"

class GoogleRepository {
   private sheet: sheets_v4.Sheets | undefined;

   constructor(private authClient: GoogleAuth) {
      // This line initializes the 'googleapis' Sheets client instance, configuring it to use the 'auth' object (which handles the actual authentication tokens) for all API requests.
      this.sheet = google.sheets({ version: "v4", auth: authClient });

   }


   private getSheetClient(): sheets_v4.Sheets {
      if (!this.sheet) throw new Error("SheetService not initialized.");
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
   async writeData(
      range: string,
      values: string[][],
      valueInputOption: "USER_ENTERED" | "RAW" = "USER_ENTERED"
   ): Promise<sheets_v4.Schema$AppendValuesResponse | null> {
      try {
         const sheets = this.getSheetClient();

         const requestBody: sheets_v4.Schema$ValueRange = {
            values: values
         }

         const response = await sheets.spreadsheets.values.append({
            spreadsheetId: SHEET_ID,
            range: range,
            valueInputOption: valueInputOption,
            requestBody: requestBody

         });

         console.log(`Data appended: ${response.data.updates?.updatedCells}`);
         console.log(response.data);
         return response.data;

      } catch (error: any) {
         console.error(`Error peendin data to range ${range}:, `, error.message);
         return null
      }
   }

   /**
    * 
    * @param range range using A1 notation to be returned
    * @returns range as an array of array [][], as row x column
    */
   async getRange(range: string) {
      try {
         const sheets = this.getSheetClient();
         const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SHEET_ID,
            range: range
         });
         
         const values = response.data.values;
         
         if (!values) throw new Error("empty range");
         return values

      } catch (error: any) {

         throw error.message
      }
   }

   async filterCodigoIndex(codigo: string) {
      const codigoColumns = await this.getRange("A:A");
      let allCodigo: string[] = [];
      codigoColumns.forEach((row: string[]) => row.forEach((columns: string) => {
         allCodigo.push(columns);
      }))

      const codigoIndex = allCodigo.indexOf(codigo);

      return codigoIndex;
   }
}

export default GoogleRepository;