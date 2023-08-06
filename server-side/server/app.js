require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./routes')
const { errorHandler } = require('./middlewares/errorHandler')
const midtransClient = require('midtrans-client');
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.post('/generate-midtrans-token', async (req, res, next) => {
  try {
    const { name, email, phoneNumber, grossAmount } = req.body
    let snap = new midtransClient.Snap({
      // Set to true if you want Production Environment (accept real transaction).
      isProduction : false,
      serverKey : process.env.MIDTRANS_SERVER_KEY
    });

    let parameter = {
      "transaction_details": {
          "order_id": "TRANS_DONATION_" + Math.floor(1000000 + Math.random() * 9000000), //unique
          "gross_amount": grossAmount
      },
      "credit_card":{
          "secure" : true
      },
      "customer_details": {
          "name": name,
          "email": email,
          "phone": phoneNumber
      }
    };

    const midtransToken = await snap.createTransaction(parameter)
    res.status(201).json(midtransToken)
  } catch (err) {
    next(err)
  }
})
app.use(router)
app.use(errorHandler)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app