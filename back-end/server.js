const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let suppliers = [
  { id: 1, name: "Global Travels" },
  { id: 2, name: "Sunset Adventures" },
  { id: 3, name: "Blue Horizon Tours" },
  { id: 4, name: "Peak Destinations" },
  { id: 5, name: "Oceanic Voyages" },
  { id: 6, name: "Wanderlust Co." },
  { id: 7, name: "Skyline Getaways" },
  { id: 8, name: "Golden Path Travel" },
  { id: 9, name: "Evergreen Expeditions" },
  { id: 10, name: "Mystic Trails" },
];

let bookings = [
  { id: 1, supplierId: 1, customer: "John Doe", country: "Canada", note: "VIP", price: 100 },
  { id: 2, supplierId: 1, customer: "Alice Smith", country: "UK", note: "", price: 150 },
  { id: 3, supplierId: 2, customer: "Bob Johnson", country: "France", note: "Late arrival", price: 200 },
  { id: 4, supplierId: 3, customer: "Carol White", country: "Germany", note: "", price: 250 },
  { id: 5, supplierId: 2, customer: "David Brown", country: "USA", note: "", price: 120 },
  { id: 6, supplierId: 3, customer: "Emma Green", country: "UK", note: "", price: 180 },
  { id: 7, supplierId: 4, customer: "Frank Black", country: "Australia", note: "Allergic to peanuts", price: 300 },
  { id: 8, supplierId: 5, customer: "Grace Lee", country: "Japan", note: "", price: 220 },
  { id: 9, supplierId: 6, customer: "Hank Kim", country: "South Korea", note: "Requires wheelchair access", price: 210 },
  { id: 10, supplierId: 7, customer: "Ivy Patel", country: "India", note: "Vegetarian", price: 190 },
  { id: 11, supplierId: 8, customer: "Jack Wilson", country: "Brazil", note: "VIP", price: 250 },
  { id: 12, supplierId: 9, customer: "Karen Davis", country: "Mexico", note: "", price: 180 },
  { id: 13, supplierId: 10, customer: "Leo Martinez", country: "Spain", note: "Special seating request", price: 270 },
  { id: 14, supplierId: 4, customer: "Mia Clark", country: "Italy", note: "", price: 230 },
  { id: 15, supplierId: 5, customer: "Nina Lopez", country: "Portugal", note: "", price: 160 },
];

app.get("/suppliers", (req, res) => {
  res.json(suppliers);
});

app.get("/bookings", (req, res) => {
  res.json(bookings);
});

app.put("/bookings/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = bookings.findIndex(b => b.id === id);
  if (index !== -1) {
    bookings[index] = { ...bookings[index], ...req.body };
    return res.json(bookings[index]);
  }
  res.status(404).json({ message: "Booking not found" });
});

app.get("/analytics", (req, res) => {
  const topSuppliers = suppliers
    .map(s => {
      const total = bookings.filter(b => b.supplierId === s.id).length;
      return { ...s, total };
    })
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

  const topCountries = Object.entries(
    bookings.reduce((acc, b) => {
      acc[b.country] = (acc[b.country] || 0) + 1;
      return acc;
    }, {})
  )
    .map(([country, total]) => ({ country, total }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

  const avgPricePerCountry = Object.entries(
    bookings.reduce((acc, b) => {
      acc[b.country] = acc[b.country] || { totalPrice: 0, count: 0 };
      acc[b.country].totalPrice += b.price;
      acc[b.country].count += 1;
      return acc;
    }, {})
  ).map(([country, data]) => ({ country, avgPrice: data.totalPrice / data.count }));

  res.json({ topSuppliers, topCountries, avgPricePerCountry });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Mock API running on http://localhost:${PORT}`));