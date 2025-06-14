function ConvertHandler() {
this.getNum = function(input) {
    let match = input.match(/^([\d./]+)?[a-zA-Z]+$/);
    if (!match) return "invalid number and unit"; // Handle completely malformed input

    let numStr = match[1] || "1"; // Default to 1 if no number is provided

    // Check for multiple fractions (more than one '/')
    if ((numStr.match(/\//g) || []).length > 1) {
        return 'invalid number';
    }

    // Handle fraction safely
    if (numStr.includes("/")) {
        let parts = numStr.split("/");
        if (parts.length === 2 && parts[0] && parts[1]) {
            return parseFloat(parts[0]) / parseFloat(parts[1]);
        } else {
            return 'invalid number'; // Handle malformed fractions
        }
    }

    return isNaN(parseFloat(numStr)) ? 'invalid number' : parseFloat(numStr);
    };

  this.getUnit = function(input) {
    let match = input.match(/[a-zA-Z]+$/);
    if (!match) return "invalid unit"; // Explicitly return invalid unit

    let unit = match[0].toLowerCase(); // Convert to lowercase
    const validUnits = ["gal", "lbs", "mi", "l", "kg", "km"];
    
    return unit === "l" ? "L" : validUnits.includes(unit) ? unit : "invalid unit"; // Ensure test format matches
  }; 

  this.getReturnUnit = function(initUnit) {
    const unitMap = {
      gal: "L",
      lbs: "kg",
      mi: "km",
      L: "gal", // Preserve uppercase "L"
      kg: "lbs",
      km: "mi"
    };
    return unitMap[initUnit] || null;
  };

  this.spellOutUnit = function(unit) {
    const unitNames = {
      gal: "gallons",
      lbs: "pounds",
      mi: "miles",
      L: "liters",
      kg: "kilograms",
      km: "kilometers"
    };
    return unitNames[unit] || null;
  };

  this.convert = function(initNum, initUnit) {
    const conversionRates = {
      gal: 3.78541,
      lbs: 0.453592,
      mi: 1.60934,
      L: 1 / 3.78541,
      kg: 1 / 0.453592,
      km: 1 / 1.60934
    };
    return conversionRates[initUnit] ? parseFloat((initNum * conversionRates[initUnit]).toFixed(5)) : null;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${parseFloat(returnNum).toFixed(5)} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;