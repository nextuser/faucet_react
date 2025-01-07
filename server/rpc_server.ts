import express from 'express';
import bodyParser from 'body-parser';
import { faucet } from './faucet';

const app = express();

export interface ReqData  {  
  FixedAmountRequest: {
      recipient: string
  }
};

app.use(bodyParser.json());

app.post('/v1/gas', (req, res) => {
  if(req.header('Content-Type')  == 'application/json'){
    console.log('body:' + req.body as unknown as string);
    let data:ReqData = req.body;

    let ret = faucet(data.FixedAmountRequest.recipient)
    ret.then(function(result) {
      console.log(result);
      res.json(result);
    }, function(err) {
      console.log(err);
      res.json(err);
    });
    console.log(data);
  } else{
    console.log("error Content-Type,header:" + req.headers);
  }
    
});


app.get('/v1/gas', (req, res) => {
  if(req.header('Content-Type')  == 'application/json'){
    let recipient = req.query('recipient')
    console.log('recipient=',recipient);

    let ret = faucet(recipient)
    ret.then(function(result) {
      console.log(result);
      res.json(result);
    }, function(err) {
      console.log(err);
      res.json(err);
    });

  } else{
    console.log("error Content-Type,header:" + req.headers);
  }
    
});


let port = 3001;
app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});



/**
curl --location --request POST 'https://faucet.testnet.sui.io/v1/gas' \
--header 'Content-Type: application/json' \
--data-raw '{
    "FixedAmountRequest": {
        "recipient": "0x5e23b1067c479185a2d6f3e358e4c82086032a171916f85dc9783226d7d504de"
    }
}'


curl --location --request POST 'http://localhost:3001/v1/gas' \
--header 'Content-Type: application/json' \
--data-raw '{
    "FixedAmountRequest": {
        "recipient": "0xafe36044ef56d22494bfe6231e78dd128f097693f2d974761ee4d649e61f5fa2"
    }
}'

curl --location --request POST 'http://localhost:3001/v1/gas' \
--header 'Content-Type: application/json' \
--data-raw '{
    "FixedAmountRequest": {
        "recipient": "0x540105a7d2f5f54a812c630f2996f1790ed0e60d1f9a870ce397f03e4cec9b38"
    }
}'


 */
