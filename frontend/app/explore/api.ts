const BASE_URL = "http://localhost:8000";

export const api = {
  getMonuments: async () => {
    const res = await fetch(`${BASE_URL}/api/monuments`);
    if (!res.ok) throw new Error("Failed to fetch monuments");
    return res.json();
  },
  
  createBooking: async (bookingData: any) => {
    const res = await fetch(`${BASE_URL}/api/booking/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData),
    });
    if (!res.ok) throw new Error("Booking failed");
    return res.json();
  },

  getAiSuggestion: async (message: string) => {
    const res = await fetch(`${BASE_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    if (!res.ok) throw new Error("AI query failed");
    return res.json();
  }
};
