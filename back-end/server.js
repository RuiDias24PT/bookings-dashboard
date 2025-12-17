const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let suppliers = [
  { id: 1, name: "Supplier A" },
  { id: 2, name: "Supplier B" },
  { id: 3, name: "Supplier C" },
];

let bookings = [
  { id: 1, supplierId: 1, customer: "John Doe", country: "USA", note: "VIP", price: 100 },
  { id: 2, supplierId: 1, customer: "Alice Smith", country: "UK", note: "", price: 150 },
  { id: 3, supplierId: 2, customer: "Bob Johnson", country: "France", note: "Late arrival", price: 200 },
  { id: 4, supplierId: 3, customer: "Carol White", country: "Germany", note: "", price: 250 },
  { id: 5, supplierId: 2, customer: "David Brown", country: "USA", note: "", price: 120 },
  { id: 6, supplierId: 3, customer: "Emma Green", country: "UK", note: "", price: 180 },
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