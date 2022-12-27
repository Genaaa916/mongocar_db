const express = require('express');
const router = express.Router();
const Car = require('./models/car');

// Fetch all cars
router.get("/cars", async (req, res) => {
  try {
    const cars = await Car.find({ arrayElementName: { $exists: true } });
    res.send(cars)
  } catch(err) {
    return res.status(500).json({ message: err.message });
  }
});

// Delete a car
router.delete("/cars/:id", async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            return res.status(404).json({message: "Car not found"})
        } else {
            await car.remove();
            res.status(200).json({message: "Car removed"})
        }
    } catch (err) {
        res.status(500).json({message: err.message})
    }
});

// Fetch a single car
router.get("/cars/:id", async (req, res) => {
    try {
        const cars = await Car.findById(req.params.id);
        if (!cars) {
            return res.status(404).json({message: "Car not found"})
        } else {
            res.status(200).json(cars)

        }
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
});

// Update a car
router.put("/cars/:id", async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            return res.status(404).json({message: "Car not found"})
        } else {
            car.merkki = req.body.merkki; 
            car.malli = req.body.malli;
            car.väri = req.body.väri;
            car.vuosi = req.body.vuosi;
            const updatedCar = await car.save();
        }
        }
        catch ( err ){
            res.status(500).json({message: err.message})
        }
    });

// Create a new car
router.post("/cars", async (req, res) => {
   try  {
    const car = new Car({
        merkki: req.body.merkki,
        malli: req.body.malli,
        väri: req.body.väri,
        vuosi: req.body.vuosi
    });
    const newCar = await car.save();
    res.status(201).json(newCar);
    } catch (err) {
    res.status(400).json({ message: err.message });
    }
    });

module.exports = router;