const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const morgan = require("morgan");
const cors = require("cors");

const PORT = process.env.PORT || 3000;

const openaiRoutes = require('./routes/openaiRoutes');

// Using middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
    res.send("<h1>Welcome to OpenAI Node.JS API!</h1>");
});

// Calling Routes
app.use('/openai', openaiRoutes);

// Listening to server
app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});  