const fastify = require('fastify')
const mongoose = require('mongoose');
const jsonwebtoken = require('jsonwebtoken');
const app = fastify();

const config = require('./config');
const routes = require('./routes/index');

const mongo_url = "mongodb://localhost:27017/fastify";

app.register(require('fastify-url-data'), (err) => {
    if (err) throw err
})

app.addHook('preHandler', (request, reply, next) => {
    const urlData = request.urlData();
    
    if (urlData.path === '/api/auth/signup' || urlData.path === '/api/auth/login') {
        // No checking for token if auth routes
        next();
    } else {
        console.log("Checking for token");
        let token = request.headers['authorization'];

        if (token) {
            token = token.split(" ")[1];
            jsonwebtoken.verify(token, config.secret, (err, decoded) => {
                if (err) {
                    reply.code(401)
                    next(new Error("Authentication failed"));
                } else {
                    request.decoded = decoded;
                    console.log("Login successful");
                    next();
                }
            });
        } else {
            reply.code(401)
            next(new Error("Authentication failed"));
        }
    }
})

// Registering the routes
app.get('/', async (request, res) => {
    return {
        hello: 'world'
    }
});

routes.forEach(route => app.route(route));

mongoose.connect(mongo_url, {useNewUrlParser: true})
    .then(
        () => {
            console.log("Connected to DB")
            app.listen(3000, function(err, address) {
                if (err) {
                    fastify.log.error(err);
                    process.exit(1);
                }
                console.log(`Server listening on ${address}`);
            });
        }
    )
    .catch(err => console.log(err.message));
