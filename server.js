require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const bookRoutes = require("./routes/bookRoutes");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/books", bookRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Connected");

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch(err => console.log(err));

app.use(errorHandler);