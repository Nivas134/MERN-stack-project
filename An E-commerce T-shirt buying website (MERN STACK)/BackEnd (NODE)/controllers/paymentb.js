const braintree = require("braintree");

var gateway = braintree.connect({
    environment:  braintree.Environment.Sandbox,
    merchantId:   '5r2r9dy2q43nd395',
    publicKey:    'tffcy6mhyyfpbd64',
    privateKey:   '883ff99219522ce2459e4359d241ff33'
});

exports.getToken  = (req, res) => {

    gateway.clientToken.generate({
      }, (err, response) => {
        
        if (err) {
            res.status(500).send(err)
        }
        else{
            res.send(response)
        }
      });
} 


exports.processPayment = (req, res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce
    let amountFromTheClient = req.body.amount 
    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        deviceData: deviceDataFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, (err, result) => {
          if (err){
              res.status(500).json(error)
          }else{
              res.json(result)
          }
      });
}