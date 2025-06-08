function ConvertHandler() {
  
  this.getNum = function(input) {
    let match = input.match(/^([\d./]+)?[a-zA-Z]+$/);
    if (!match) return null; // Invalid format

    let numStr = match[1] || "1"; // Default to 1 if no number is provided

    // Check for multiple fractions (more than one '/')
    if ((numStr.match(/\//g) || []).length > 1) {
        return new Error("Invalid number format: multiple fractions");
    }

    // Handle fraction safely without eval()
    if (numStr.includes("/")) {
        let parts = numStr.split("/");
        if (parts.length === 2 && parts[0] && parts[1]) {
            return parseFloat(parts[0]) / parseFloat(parts[1]);
        } else {
            return new Error("Invalid fraction format");
        }
    }

    return parseFloat(numStr); // Convert to number safely
  };

  this.getUnit = function(input) {
    let match = input.match(/[a-zA-Z]+$/);
    if (!match) return null;

    let unit = match[0];

    // Valid units list
    const validUnits = ["gal", "lbs", "mi", "L", "kg", "km"];

    return validUnits.includes(unit) ? unit : null;
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
      gal: "gallon",
      lbs: "pound",
      mi: "mile",
      L: "liter", // Preserve uppercase "L"
      kg: "kilogram",
      km: "kilometer"
    };
    return unitNames[unit] || null;
  };

  this.convert = function(initNum, initUnit) {
    const conversionRates = {
      gal: 3.78541,  // Gallons to Liters
      lbs: 0.453592, // Pounds to Kilograms
      mi: 1.60934,   // Miles to Kilometers
      L: 1 / 3.78541, // Liters to Gallons
      kg: 1 / 0.453592, // Kilograms to Pounds
      km: 1 / 1.60934  // Kilometers to Miles
    };
    return conversionRates[initUnit] ? initNum * conversionRates[initUnit] : null;
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let initUnitName = this.spellOutUnit(initUnit);
    let returnUnitName = this.spellOutUnit(returnUnit);

    // Handle singular/plural correctly
    if (initNum === 1) {
      initUnitName = initUnitName.replace(/s$/, ""); // Remove plural "s"
    }
    if (returnNum === 1) {
      returnUnitName = returnUnitName.replace(/s$/, ""); // Remove plural "s"
    }

    return `${initNum} ${initUnitName} converts to ${returnNum.toFixed(5)} ${returnUnitName}`;
  };

}

module.exports = ConvertHandler;