const fastify = require('fastify')
const mongoose = require('mongoose');
const app = fastify();

// Requiring Routes
const routes = require('./routes/index');

// MongoDB connection URL
const mongo_url = "mongodb://localhost:27017/fastify";

// Registering the routes
app.get('/', async (req, res) => {
    return {
        hello: 'world'
    }
});

routes.forEach(route => app.route(route));

// Starting app
const start = async () => {
    try {
        mongoose.connect(
            mongo_url, 
            {useNewUrlParser: true}
        )
        .then(() => console.log("Connected to DB"))
        .catch(err => console.log(err.message));
        
        await app.listen(3000);
        console.log(`Server listening on port ${app.server.address().port}`);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
}

start();