let assert = require("assert");
const Parser = require("../../../source/server/util/Parser");
const Vehicle = require("../../../source/server/model/Vehicle");

describe("Parser", function() {
  describe("parseLine", function() {
    it("parses well formed Vehicle text line with comma separator", function() {
      let testVehicleLine = "Mr, Toyota, toyota, car, The main event, 34 ft";
      let expectedVehicle = new Vehicle("Mr", "Toyota", "toyota", "car", "The main event", "34 ft")
      assert.deepEqual(Parser.parseLine(Vehicle, testVehicleLine), expectedVehicle);
    });

    it("parses well formed Vehicle text line with pipe separator", function() {
      let testVehicleLine = "Mr| Toyota| toyota| car | The main event  | 34 ft";
      let expectedVehicle = new Vehicle("Mr", "Toyota", "toyota", "car", "The main event", "34 ft")
      assert.deepEqual(Parser.parseLine(Vehicle, testVehicleLine), expectedVehicle);
    });
  });

  describe("parseBlob", function() {
    it("parses well formed Vehicle text blob", function() {
      let testVehicleBlob = "Mr, Toyota, testEmail, toyota, testRide, 34 ft\n Bobby, Smith, testEmail, ford, testRide, 12'\n Erica, johnson, testEmail, testType, erica's ride, 22'";
      let vehicle1 = new Vehicle("Mr", "Toyota", "testEmail", "toyota", "testRide", "34");
      let vehicle2 = new Vehicle("Bobby", "Smith", "testEmail", "ford", "testRide", "12'");
      let vehicle3 = new Vehicle("Erica", "johnson", "testEmail", "testType", "erica's ride", "22");
      let expectedVehicleList = [vehicle1, vehicle2, vehicle3];
      assert.deepEqual(Parser.parseBlob(Vehicle, testVehicleBlob), expectedVehicleList);
    });

    it("throws exception when parsing invalid text blob", function() {
        let invalidVehicleBlob = "Mr, Toyota, testEmail, toyota, testRide, 34 ft\n Bobby, Smith, testEmail, ford| testRide, 12'";
        assert.throws(() => { Parser.parseBlob(invalidVehicleBlob); }, new Error(Parser.INVALID_INPUT_ERROR_MESSAGE));
    });
  });

  describe("getSeparator", function() {
    it("finds correct separator in text line", function() {
        assert.equal(",", Parser.getSeparator("This, is, separated,"));
        assert.equal("|", Parser.getSeparator("This| is| separated"));
    });
  });

  describe("parseLengthStringToInt", function() {
    it("parses valid length strings", function() {
        assert.equal(32, Parser.parseLengthStringToInt("32'"));
        assert.equal(43, Parser.parseLengthStringToInt("43 feet"));
        assert.equal(17, Parser.parseLengthStringToInt("17 ft"));
        assert.equal(9, Parser.parseLengthStringToInt("9"));
    });

    it("throws error when length string is invalid", function() {
        assert.throws(() => { Parser.parseLengthStringToInt("32m") }, new Error(Parser.INVALID_INPUT_ERROR_MESSAGE));
        assert.throws(() => { Parser.parseLengthStringToInt("32 inches") }, new Error(Parser.INVALID_INPUT_ERROR_MESSAGE));
    });
  });
});
