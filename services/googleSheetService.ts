
import { GOOGLE_SHEET_URL } from '../constants';

export async function syncBookingToCloud(bookingData: any) {
  if (!GOOGLE_SHEET_URL) {
    console.warn("Google Sheet URL not configured. Skipping cloud sync.");
    return { success: true, localOnly: true };
  }

  try {
    // Note: We use 'text/plain' and 'no-cors' to allow the JSON data to reach 
    // Google Apps Script without triggering complex CORS preflight checks 
    // that Apps Script does not natively handle.
    await fetch(GOOGLE_SHEET_URL, {
      method: 'POST',
      mode: 'no-cors', 
      cache: 'no-cache',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify(bookingData),
    });
    
    // In 'no-cors' mode, we won't get a readable response body, 
    // but the data will be sent to the server.
    return { success: true };
  } catch (error) {
    console.error("Cloud Sync Error:", error);
    return { success: false, error };
  }
}
