const express = require('express');
const session = require('express-session');
const routes = require('./routes');
const cors = require('cors');
const path = require('path');

//const cookieParser = require('cookie-parser');
//const path = require('path');
const dotenv = require('dotenv');
const app = express();
app.use(cors({ credentials: true, origin: true }));
app.use(express.urlencoded({ extended: true,
  limit: '50mb',
  parameterLimit: 1000000

 }));
//const bodyParser = require('body-parser');
const sequelize = require('./database.js');
//const morgan = require('morgan');
//app.use(cookieParser());
//app.use(morgan('dev'));
app.use(express.json());
//app use multer
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: `${process.env.SECRET}`,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: false, sameSite: 'lax', maxAge: 60000000 },

}));
dotenv.config();
app.disable('x-powered-by');
sequelize.sync({ force: false }).then(() => {
  console.log('Base de datos conectada');
}).catch(error => {
  console.log('Error al conectar a la base de datos: ' + error.message);
});


// app.use(express.static('public'));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/', routes());
app.listen(process.env.PORT, () => {
  console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
});