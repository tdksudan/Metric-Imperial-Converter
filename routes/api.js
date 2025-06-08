'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.get('/api/convert',(req, res)=>{
    let input = req.query.input; //Example: "3.1mi"
    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);

    if (!initNum || !initUnit){
      return res.status(400).json({error: "Invalid number or unit"});

    }

    let returnNum = convertHandler.convert(initNum, initUnit);
    let returnUnit = convertHandler.getReturnUnit(initUnit);
      
    if (!returnNum || !returnUnit){
      return res.status(400).json ({ error: "Invalid conversion"});
    }

    let responseString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    res.json({
      initNum, 
      initUnit,
      returnNum, 
      returnUnit,
      string: responseString 
    });
  });

};
