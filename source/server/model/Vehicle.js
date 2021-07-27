const Parser = require("../util/Parser");

class Vehicle {
    constructor(firstName, lastName, email, type, name, length) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.type = type;
        this.name = name;
        this.length = Parser.parseLengthStringToInt(length);
    }
}

module.exports = Vehicle;
