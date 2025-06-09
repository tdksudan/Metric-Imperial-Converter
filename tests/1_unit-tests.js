const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
     suite('Function getNum(input)', function() {
    
    test('should correctly read a whole number input', function() {
      assert.strictEqual(convertHandler.getNum("10km"), 10);
      assert.strictEqual(convertHandler.getNum("5lbs"), 5);
      assert.strictEqual(convertHandler.getNum("123gal"), 123);
    });

    test('should correctly read a decimal number input', function(){
        assert.strictEqual(convertHandler.getNum("10.1km"),10.1);
        assert.strictEqual(convertHandler.getNum("1.1lbs"),1.1);
        assert.strictEqual(convertHandler.getNum("101.1gal"),101.1);
    });

    test('should correctly read a fractional input',function (){
        assert.strictEqual(convertHandler.getNum("1/2km"),1/2);
        assert.strictEqual(convertHandler.getNum("1/2lbs"),1/2);
        assert.strictEqual(convertHandler.getNum("101/2gal"),101/2);
    });

    test('should correctly read a fractional input with decimal ',function (){
      assert.strictEqual(convertHandler.getNum("10.2/2km"),10.2/2);
      assert.strictEqual(convertHandler.getNum("1.25/2lbs"),1.25/2);
      assert.strictEqual(convertHandler.getNum("101.2/2gal"),101.2/2);
      
    });
    
    test('should correctly return error on the double fraction',function(){
      assert.strictEqual(convertHandler.getNum("3/3/3km"),"invalid number");
      assert.strictEqual(convertHandler.getNum("3/2/3lbs"),"invalid number");
      assert.strictEqual(convertHandler.getNum("3/1/3gal"),"invalid number");

    });

    test('should correctly defaultto a numerical input of 1 when no numerical input is provided',function(){
      assert.strictEqual(convertHandler.getNum("km"),1);
      assert.strictEqual(convertHandler.getNum("lbs"),1);
      assert.strictEqual(convertHandler.getNum("gal"),1);
    });
  });
  suite('Function getUnit(input)',function(){
     test('should correctly read each valid input unit.',function(){
      assert.strictEqual(convertHandler.getUnit("1km"),"km");
      assert.strictEqual(convertHandler.getUnit("2lbs"),"lbs");
      assert.strictEqual(convertHandler.getUnit("50gal"),"gal");
    });
    test('should correctly return an error for an invalid input unit', function() {
      assert.strictEqual(convertHandler.getUnit("10xyz"), 'invalid unit'); // Invalid unit
      assert.strictEqual(convertHandler.getUnit("5abc"), 'invalid unit');  // Invalid unit
      assert.strictEqual(convertHandler.getUnit("123wrong"), 'invalid unit'); // Invalid unit
      assert.strictEqual(convertHandler.getUnit("xyz"), 'invalid unit'); 
    });
  });
  suite('Function getReturnUnit(input)',function(){
    test('should return the correct return unit for each valid input unit.',function(){
      assert.strictEqual(convertHandler.getReturnUnit("gal"), "L");  // Gallons → Liters
      assert.strictEqual(convertHandler.getReturnUnit("lbs"), "kg");  // Pounds → Kilograms
      assert.strictEqual(convertHandler.getReturnUnit("mi"), "km");   // Miles → Kilometers
      assert.strictEqual(convertHandler.getReturnUnit("L"), "gal");   // Liters → Gallons
      assert.strictEqual(convertHandler.getReturnUnit("kg"), "lbs");  // Kilograms → Pounds
      assert.strictEqual(convertHandler.getReturnUnit("km"), "mi"); 
      assert.strictEqual(convertHandler.getReturnUnit("xyz"), null);  // Invalid unit
      assert.strictEqual(convertHandler.getReturnUnit("abc"), null);  // Invalid unit
      assert.strictEqual(convertHandler.getReturnUnit("123"), null);  // Invalid unit
    });
    test('should convert gal to L',function(){
      assert.strictEqual(convertHandler.getReturnUnit("gal"),"L");
    });
    test('should convert L to gal',function(){
      assert.strictEqual(convertHandler.getReturnUnit("L"),"gal");
    });
    test('should convert mi to km',function(){
      assert.strictEqual(convertHandler.getReturnUnit("mi"),"km");
    });
    test('should convert km to mi',function(){
      assert.strictEqual(convertHandler.getReturnUnit("km"),"mi");
    });
    test('should convert lbs to kg',function(){
      assert.strictEqual(convertHandler.getReturnUnit("lbs"),"kg");
    });
    test('should convert kg to lbs',function(){
      assert.strictEqual(convertHandler.getReturnUnit("kg"),"lbs");
    });
  });
  suite('Function spellOutUnit',function(){
    test('should correctly return the spelled-out string unit for each valid input unit',function(){
      assert.strictEqual(convertHandler.spellOutUnit("gal"),"gallons");
      assert.strictEqual(convertHandler.spellOutUnit("lbs"),"pounds");
      assert.strictEqual(convertHandler.spellOutUnit("mi"),"miles");
      assert.strictEqual(convertHandler.spellOutUnit("L"),"liters");
      assert.strictEqual(convertHandler.spellOutUnit("kg"),"kilograms");
      assert.strictEqual(convertHandler.spellOutUnit("km"),"kilometers");
      assert.strictEqual(convertHandler.spellOutUnit("xyz"),null);
    });
  });


});