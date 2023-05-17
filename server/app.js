import express from 'express';
import cors from 'cors';
import session from 'express-session';


import * as dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}));

app.get("/test", (req, res) => {
    res.send({data: "test"});
    console.log("test");
});

app.listen(process.env.PORT, ()=> console.log("server running on port: " + process.env.PORT))