/* global process */
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware to parse JSON bodies
app.use(express.json());

// Logger middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// API endpoint for contact submissions
app.post("/api/contact", (req, res) => {
  const { name, email, company, service, budget, message } = req.body;

  // Simple server-side validation
  if (!name || name.trim().length < 2) {
    return res.status(400).json({ error: "Name must be at least 2 characters." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  if (!service || service.trim().length === 0) {
    return res.status(400).json({ error: "Please select a service interest." });
  }

  if (!budget || budget.trim().length === 0) {
    return res.status(400).json({ error: "Please select a budget range." });
  }

  if (!message || message.trim().length < 20) {
    return res.status(400).json({ error: "Message must be at least 20 characters." });
  }

  // Force error simulation if name is "Trigger Error" (consistent with client stub logic)
  if (name.toLowerCase() === "trigger error") {
    console.warn("Contact submission failed: Triggered Error simulated");
    return res.status(500).json({ error: "Simulated internal server error." });
  }

  console.log("Contact form submission received successfully:");
  console.log({ name, email, company, service, budget, message });

  return res.status(200).json({
    success: true,
    message: "Thank you for getting in touch! We will contact you within 24 hours."
  });
});

// Serve static assets from Vite build output directory (dist)
app.use(express.static(path.join(__dirname, "frontend", "dist")));

// Catch-all route to serve the Single Page App (index.html) for client-side routing
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// Start Express server
app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`Snortweb Production Express Server is running!`);
  console.log(`Listening on http://localhost:${PORT}`);
  console.log(`Serving built files from: ${path.join(__dirname, "frontend", "dist")}`);
  console.log(`==================================================`);
});
