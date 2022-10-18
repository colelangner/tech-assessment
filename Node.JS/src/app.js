const exp = require('constants');
const { json } = require('express');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const fs = require('fs');
const { allowedNodeEnvironmentFlags } = require('process');
const { runInNewContext } = require('vm');

app.get('/health', (req, res) => {
   res.send('You keep using that word. I do not think it means what you think it means.');
});

app.get('/listCustomers', (req, res) => {
  fs.readFile('customers.json',  (err, data) => {
  console.log(data);
  res.end(data);
  })
});

//Add an order, values are hard coded
app.post('/addOrder', (req, res) => {
  fs.readFile('orders.json', (err, data) => {
    
    var order = {
      "Order1": {
          "orderID" : 1,
          "customerFname" : "Tony"
      },
    }
     
    data = JSON.parse(data);
    data["Order1"] = order["Order1"];

    fs.writeFile('orders.json', JSON.stringify(data), () => {
     res.status(200).send("New Order Added");
  })
})   
});

app.get('/listOrdersByCustomer/:customerName', (req, res) => 
  
  fs.readFile('orders.json', (err, data) => {
    data = JSON.parse(data);
    var arr = [];
    Object.entries(data).forEach((entry) => {
      var keys = Object.keys(entry);
      if(data[entry[keys[0]]].customerFname == req.params.customerName){
        arr.push(entry);
        console.log(entry);
      }
    })
      res.send(arr);
  }));

  //Takes a param request for order number and name on order and change the name on the order
  //No error checking, so it will fail if you put a order number that is not in the json file
  app.put('/updateOrder/:orderNum/:orderName', (req, res) => {
    fs.readFile('orders.json', (err, data) => {
      data = JSON.parse(data);
      data["Order" + req.params.orderNum].customerFname = req.params.orderName;
      fs.writeFile('orders.json', JSON.stringify(data), () => {
        res.status(200).send("Order Updated");
      })
    })
  });

  //Takes a request of the order number and deletes that order from orders.json
  app.delete('/deleteOrder/:orderNum', (req, res) => {
    fs.readFile('orders.json', (err, data) => {
      data = JSON.parse(data);
      delete data["Order" + req.params.orderNum];
      fs.writeFile('orders.json', JSON.stringify(data), () => {
        res.status(200).send("Order Deleted");
     })
    })
  });




app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;