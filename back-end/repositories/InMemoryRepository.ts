import { google, sheets_v4 } from "googleapis";
import GoogleRepository from "./googlesheetRepository";
import { auth, GoogleAuth } from "google-auth-library";

class inMemoryRepository implements GoogleRepository {
   private sheet: sheets_v4.Sheets;
   private repostitory = [
      
   ];
   constructor(private authClient:GoogleAuth){
      this.sheet = google.sheets({version: "v4", auth: authClient});
   }


}

export default inMemoryRepository;