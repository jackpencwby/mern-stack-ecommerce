const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDatabase = require("./config/database");
const authRouter = require("./routes/auth");
const categoryRouter = require("./routes/category");
const productRouter = require("./routes/product");

const app = express();
const port = 8080;

// Security
app.use(cors({
    credentials: true,
    origin: ['http://localhost:5173']
}));
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);

app.listen(port, async () => {
    await connectDatabase();
    console.log(`Listening at http://localhost:${port}`);
});