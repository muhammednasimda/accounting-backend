const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/test", (req, res) => {
  res.send("working");
});

app.use("/payment", require("./routes/payment"));
app.use("/cash-reciept", require("./routes/cash_reciept"));
app.use("/customer", require("./routes/customer"));
app.use("/exchange", require("./routes/exchange"));
app.use("/exchange-cash-reciept", require("./routes/exchange_cash_reciept"));
app.use("/purchase", require("./routes/purchase"));
app.use("/sale", require("./routes/sale"));

app.listen(PORT);
