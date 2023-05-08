const express = require("express");

const app = express();

const cors = require("cors");

const mongoose = require("mongoose");

const dotenv = require("dotenv");
const userRouter = require("./routes/user");


dotenv.config();


mongoose.connect(process.env.MONGO)
.then(() => console.log(`mongodb is connected`))
.catch((err) => console.log(err));

app.use(express.json());
app.use(cors());

app.use(userRouter)

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`port at ${PORT}`)
});

