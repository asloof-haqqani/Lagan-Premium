
import { GOOGLE_SHEET_URL } from '../constants';

/**
 * Syncs a new booking to the Google Sheet.
 * Uses URL parameters as the user's Apps Script relies on e.parameter.
 */
export async function syncBookingToCloud(bookingData: any) {
  if (!GOOGLE_SHEET_URL) return { success: false, error: 'URL not configured' };

  try {
    const params = new URLSearchParams({
      method: 'add',
      name: bookingData.name,
      phone: bookingData.phone,
      from: bookingData.from,
      to: bookingData.to,
      date: bookingData.date,
      bus: bookingData.bus,
      seats: String(bookingData.seatCount || bookingData.seats)
    });

    // We use a POST request with no-cors for 'adding' as we don't need to read the response
    // and it's more reliable for background syncing.
    await fetch(`${GOOGLE_SHEET_URL}?${params.toString()}`, {
      method: 'POST',
      mode: 'no-cors',
      cache: 'no-cache'
    });
    
    return { success: true };
  } catch (error) {
    console.error("Cloud Sync Error:", error);
    return { success: false, error };
  }
}

/**
 * Fetches booking details by phone number from the Google Sheet.
 * Uses a GET request which is CORS-friendly in Apps Script.
 */
export async function fetchBookingByPhone(phone: string) {
  if (!GOOGLE_SHEET_URL) return { success: false, message: 'URL not configured' };

  try {
    const url = `${GOOGLE_SHEET_URL}?method=search&phone=${encodeURIComponent(phone)}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch Error:", error);
    return { success: false, message: "Connection to secure vault failed." };
  }
}
