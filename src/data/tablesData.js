// 24 Tables configuration matching hotel floor plan
// Tables 1, 2, 3, 4: Family Tables (8 Seaters)
// Tables 5 to 24: Standard Tables (4 Seaters)

export const TIME_SLOTS = [
  { id: "slot-1", label: "Slot 1 (11:30 AM - 01:00 PM)", time: "11:30 AM - 01:00 PM", period: "Lunch" },
  { id: "slot-2", label: "Slot 2 (01:00 PM - 02:30 PM)", time: "01:00 PM - 02:30 PM", period: "Lunch (Peak)" },
  { id: "slot-3", label: "Slot 3 (02:30 PM - 04:00 PM)", time: "02:30 PM - 04:00 PM", period: "Late Lunch" },
  { id: "slot-4", label: "Slot 4 (04:30 PM - 06:30 PM)", time: "04:30 PM - 06:30 PM", period: "Evening Snacks & Tea" },
  { id: "slot-5", label: "Slot 5 (07:00 PM - 08:30 PM)", time: "07:00 PM - 08:30 PM", period: "Dinner (Early)" },
  { id: "slot-6", label: "Slot 6 (08:30 PM - 10:00 PM)", time: "08:30 PM - 10:00 PM", period: "Dinner (Peak)" },
  { id: "slot-7", label: "Slot 7 (10:00 PM - 11:30 PM)", time: "10:00 PM - 11:30 PM", period: "Late Dinner" },
];

export const HOTEL_TABLES = Array.from({ length: 24 }, (_, i) => {
  const tableNumber = i + 1;
  const isFamily = tableNumber <= 4;
  
  return {
    id: `table-${tableNumber}`,
    number: tableNumber,
    name: `Table ${tableNumber}`,
    isFamily: isFamily,
    capacity: isFamily ? 8 : 4,
    type: isFamily ? "Family Booth (8 Seater)" : "Standard Dining (4 Seater)",
    section: isFamily ? "Center Luxury Booths" : (tableNumber <= 14 ? "Window Row" : "Garden View Side"),
    features: isFamily 
      ? ["Luxury Wooden Booth", "Ambient Cove Lighting", "8 Comfortable Cushions", "Best for Family Gatherings"]
      : ["4 Upholstered Chairs", "Warm Chandelier Glow", "Ideal for Couples & Small Groups"],
  };
});

export const HOTEL_ROOMS = [
  ...Array.from({ length: 12 }, (_, i) => ({ number: `10${i + 1}`, floor: "1st Floor (Deluxe)" })),
  ...Array.from({ length: 12 }, (_, i) => ({ number: `20${i + 1}`, floor: "2nd Floor (Executive)" })),
  ...Array.from({ length: 12 }, (_, i) => ({ number: `30${i + 1}`, floor: "3rd Floor (Suite)" })),
];
