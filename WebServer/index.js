const express = require("express");
const cors = require("cors");

const stuffRoutes = require("./routes");

const app = express();

const PORT = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Allow all origins for demonstration purposes.
app.use(cors());

// Adding router
app.use("/api", stuffRoutes);

app.listen(PORT, () => {
  console.log("Server started ! http://localhost:3001");
  console.log(`Server now listening on ${PORT}`);
});
