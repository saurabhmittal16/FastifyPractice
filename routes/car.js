const carController = require('../controllers/car')

const routes = [
    {
        method: 'GET',
        url: '/api/cars',
        handler: carController.getCars
    },
    {
        method: 'GET',
        url: '/api/cars/:id',
        handler: carController.getSingleCar
    },
    {
        method: 'POST',
        url: '/api/cars',
        handler: carController.addCar,
        schema: {
            body: {
                type: 'object',
                properties: {
                    title: {type: 'string'},
                    brand: {type: 'string'},
                    price: {type: 'string'},
                    age: {type: 'number'}
                },
                required: ['title', 'brand', 'price', 'age']
            }
        }
    },
    {
        method: 'PUT',
        url: '/api/cars/:id',
        handler: carController.updateCar
    },
    {
        method: 'DELETE',
        url: '/api/cars/:id',
        handler: carController.deleteCar
    }
]

module.exports = routes