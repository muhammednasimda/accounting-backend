const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/acc/test", (req, res) => {
  res.send("working");
});

app.use("/acc/payment", require("./routes/payment"));
app.use("/acc/cash_receipt", require("./routes/cash_receipt"));
app.use("/acc/customer", require("./routes/customer"));
app.use("/acc/exchange", require("./routes/exchange"));
app.use(
  "/acc/exchange_cash_receipt",
  require("./routes/exchange_cash_receipt")
);
app.use("/acc/purchase", require("./routes/purchase"));
app.use("/acc/sale", require("./routes/sale"));

app.listen(PORT);
