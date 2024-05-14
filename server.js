const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");

const connectDB = require('./config/db'); // Corrected import

connectDB();
dotenv.config();

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);


const PORT = process.env.PORT;
const DEV_MODE = process.env.DEV_MODE;


app.listen(PORT, () => {
    console.log(`Server running in ${DEV_MODE} mode on port ${PORT}`.bgCyan.white)
})