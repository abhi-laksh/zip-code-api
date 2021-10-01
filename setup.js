

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const session = require('express-session');
const rateLimit = require('express-rate-limit');
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS

// const swaggerUi = require('swagger-ui-express');
const config = require('./config/index');

const router = require('./api/v1/routes');
const models = require('./api/v1/models');

// models.sequelize.sync({ alter: true });

// vN, N=1,2,3...
const apiPrefix = `/api/${process.env.API_VERSION}`
console.log(apiPrefix)
const cors = require('cors');

require('dotenv').config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('combined', { stream: config.winston.stream }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Images, etc
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors(config.corsOptions));

app.use(redirectToHTTPS([/localhost:(\d{4})/], [/\/insecure/], 301));

app.use(helmet());

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        name: process.env.SESSION_NAME,
        resave: true,
        saveUninitialized: true,
        cookie: {
            httpOnly: true, // minimize risk of XSS attacks
            secure: true, // only send cookie over https
            maxAge: 60000 * 60 * 24, // set cookie expiry length in ms
        },
    }),
);

const limiter = rateLimit({
    windowMs: 10 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});

app.use(limiter);

app.use(apiPrefix, router.countryRoute);
app.use(apiPrefix, router.stateRoute);
app.use(apiPrefix, router.cityRoute);

app.use('/test', (req, res) => {
    res.status(200).send({
        a: 1,
    });
});

// Start: swagger
// TODO: Implement Swagger
// if (process.env.NODE_ENV !== 'production') {
//     app.get('/swagger.json', (req, res) => {
//         res.setHeader('Content-Type', 'application/json');
//         res.send(config.swaggerSpec);
//     });
//     app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(config.swaggerSpec));
// }

// catch 404 and forward to error handler
// app.use((req, res) => {
//     res.status(404);
//     res.send('404');
// });

// error handler
// app.use((err, req, res) => {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};

//     config.winston.error(
//         `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
//     );

//     // render the error page
//     res.status(err.status || 500);
//     res.send('500');
// });

module.exports = app