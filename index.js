const express = require("express");
const app = express();
// const { MongoClient } = require('mongodb');
const cors = require("cors");
require("dotenv").config();

//middleware

app.use(cors());
app.use(express.json());
