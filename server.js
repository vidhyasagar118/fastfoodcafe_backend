const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB =
require("./config/db");

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  "/api/auth",
  require("./routes/authRoutes")
);

app.use(
  "/api/products",
  require("./routes/productRoutes")
);

app.use(
  "/api/categories",
  require("./routes/categoryRoutes")
);

app.use(
  "/api/orders",
  require("./routes/orderRoutes")
);

app.use(
  "/api/contact",
  require("./routes/contactRoutes")
);
app.use(
  "/api/address",
  require("./routes/addressRoutes")
);

app.use(
  "/api/dashboard",
  require("./routes/dashboardRoutes")
);
app.listen(
  process.env.PORT,
  () =>
    console.log(
      `Server Running ${process.env.PORT}`
    )
);