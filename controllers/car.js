const boom = require('boom');
const Car = require('../models/car');

// Get all cars
exports.getCars = (req, res) => {
    return Car.find().exec()
    .then(
        data => {
            // console.log(data);
            console.log(req.decoded);
            return data;
        }
    )
    .catch(
        err => console.log(err)   
    )
}

// Get single car by ID
exports.getSingleCar = async (req, reply) => {
    try {
        const id = req.params.id
        const car = await Car.findById(id)
        return car
    } catch (err) {
        throw boom.boomify(err)
    }
}

// Add a new car
exports.addCar = async (req, reply) => {
    try {
        const car = new Car(req.body)
        return car.save()
    } catch (err) {
        throw boom.boomify(err)
    }
}

// Update an existing car
exports.updateCar = async (req, reply) => {
    try {
        const id = req.params.id
        const car = req.body
        const { ...updateData } = car
        const update = await Car.findByIdAndUpdate(id, updateData, {
            new: true
        })
        return update
    } catch (err) {
        throw boom.boomify(err)
    }
}

// Delete a car
exports.deleteCar = async (req, reply) => {
    try {
        const id = req.params.id
        const car = await Car.findByIdAndRemove(id)
        return car
    } catch (err) {
        throw boom.boomify(err)
    }
}