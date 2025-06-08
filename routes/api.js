'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    let input = req.query.input; // Example: "3.1mi"
    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);

    // Proper error handling to match test requirements
    if (initNum === "invalid number" && initUnit === null) {
      return res.status(400).json({ error: "invalid number and unit" });
    }
    if (initNum === "invalid number") {
      return res.status(400).json({ error: "invalid number" });
    }
    if (initUnit === null) {
      return res.status(400).json({ error: "invalid unit" });
    }

    let returnNum = convertHandler.convert(initNum, initUnit);
    let returnUnit = convertHandler.getReturnUnit(initUnit);
      
    if (returnNum === null || returnUnit === null) {
      return res.status(400).json({ error: "Invalid conversion" });
    }

    let responseString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    res.json({
      initNum,
      initUnit,
      returnNum: parseFloat(returnNum), // Ensure numeric response
      returnUnit,
      string: responseString 
    });
  });
};