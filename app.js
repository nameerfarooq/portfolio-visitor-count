var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cors = require("cors");
require("dotenv").config();
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGODBSTRING, {
    ssl: true,
 
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const visitorSchema = new mongoose.Schema({
  count: {
    type: Number,
    default: 0,
  },
});

const Visitor = mongoose.model("Visitor", visitorSchema);
app.get("/", (req, res) => {
  res.send("Welcome to Nameer's portfolio count server");
});
app.get("/api/visitor", async (req, res) => {
  try {
    let visitor = await Visitor.findOne();
    if (!visitor) {
      visitor = new Visitor();
    }
    visitor.count += 1;
    await visitor.save();
    res.json({ count: visitor.count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
