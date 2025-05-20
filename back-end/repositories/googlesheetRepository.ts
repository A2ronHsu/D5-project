import { google,sheets_v4 } from "googleapis";
import { JWT } from "google-auth-library";

const KEY_FILE_PATH = "./secret.json" ;
const SHEET_ID =  "1C0z5vlXqGPIEEzPIYqMp9g_Xh1Z4HntJV8cIYHNn-vo"
const SCOPE = ['https://www.googleapis.com/auth/spreadsheets'];



class GoogleRepository {
   private sheet: sheets_v4.Sheets;

   constructor(){
      this.initialize()
   }

   private async initialize():Promise<void> {
      try{
         const auth = new google.auth.GoogleAuth({
            keyFile: KEY_FILE_PATH,
            scopes: SCOPE
         });

         const client = await auth.getClient();
         this.sheet = google.sheets({ version: 'v4', auth: auth});

      }
   }


}