export interface Farmer {
  id: string;
  name: string;
  fertilizer: string;
  status: "eligible" | "claimed" | "pending";
  dealer: string;
  claimTime: string;
  location: string;
  aadhar: string;
}

export const mockFarmers: Farmer[] = [
  { id: "F001", name: "Rajesh Kumar", fertilizer: "Urea (50kg)", status: "claimed", dealer: "AgriMart Pune", claimTime: "2026-03-28 10:30", location: "Maharashtra", aadhar: "XXXX-XXXX-1234" },
  { id: "F002", name: "Sunita Devi", fertilizer: "DAP (25kg)", status: "eligible", dealer: "GreenField Jaipur", claimTime: "—", location: "Rajasthan", aadhar: "XXXX-XXXX-5678" },
  { id: "F003", name: "Mohan Lal", fertilizer: "NPK Complex (50kg)", status: "claimed", dealer: "KisanHub Delhi", claimTime: "2026-03-27 14:15", location: "Uttar Pradesh", aadhar: "XXXX-XXXX-9012" },
  { id: "F004", name: "Priya Sharma", fertilizer: "MOP (25kg)", status: "pending", dealer: "FarmFirst Lucknow", claimTime: "—", location: "Uttar Pradesh", aadhar: "XXXX-XXXX-3456" },
  { id: "F005", name: "Arjun Patel", fertilizer: "SSP (50kg)", status: "eligible", dealer: "AgriMart Ahmedabad", claimTime: "—", location: "Gujarat", aadhar: "XXXX-XXXX-7890" },
  { id: "F006", name: "Lakshmi Naidu", fertilizer: "Urea (50kg)", status: "claimed", dealer: "KisanHub Hyderabad", claimTime: "2026-03-26 09:45", location: "Telangana", aadhar: "XXXX-XXXX-2345" },
  { id: "F007", name: "Vikram Singh", fertilizer: "DAP (50kg)", status: "eligible", dealer: "GreenField Chandigarh", claimTime: "—", location: "Punjab", aadhar: "XXXX-XXXX-6789" },
  { id: "F008", name: "Anita Kumari", fertilizer: "NPK Complex (25kg)", status: "claimed", dealer: "FarmFirst Patna", claimTime: "2026-03-25 16:00", location: "Bihar", aadhar: "XXXX-XXXX-0123" },
];

export const stats = {
  totalFarmers: 1248,
  claimed: 847,
  notClaimed: 401,
};
