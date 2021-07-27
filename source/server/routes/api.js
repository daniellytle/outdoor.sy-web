const express = require("express");
const api = express.Router();
const AppConfig = require("../util/AppConfig");
const Parser = require("../util/Parser");
const Vehicle = require("../model/Vehicle");

// Store vehicle data in memory
let vehicles = [];

api.get("/vehicles", function(req, res, next) {
    res.json(vehicles);
});

api.post("/vehicles", function(req, res) {
    try {
        const textBlob = req.body.data;
        const parsedVehicles = Parser.parseBlob(Vehicle, textBlob);
        vehicles = vehicles.concat(parsedVehicles);
        res.sendStatus(200);
    } catch (error) {
        switch (error.message) {
            case Parser.INVALID_INPUT_ERROR_MESSAGE:
            res.status(400).send(error.message);
            break;
            default:
            throw error;
        }
    }
});

module.exports = api;
