const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const csrf = require('csurf')
const flash = require('connect-flash')
const exphbs = require('express-handlebars')
const homeRoutes = require('./routes/home')
const cardRoutes = require('./routes/card')
const addRoutes = require('./routes/add')
const coursesRoutes = require('./routes/courses')
const authRoutes = require('./routes/auth')
const profileRoutes = require('./routes/profile')
const ordersRoutes = require('./routes/orders')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session);
const userMiddleware = require('./middleware/user');
const keys = require('./keys')
const errorHandler = require('./middleware/error')
const fileMiddleware = require('./middleware/file')
const varMiddleware = require('./middleware/variables');
 

const app = express()

const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
  helpers: require('./utils/hbs-helpers')
});

const store = new MongoStore({
  collection: 'sessions',
  uri: keys.MONGODB_URI

})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')


app.use(express.static(path.join(__dirname, 'public')))
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use(express.urlencoded({extended: true}))
app.use(session({
  secret: keys.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store
}))
app.use(fileMiddleware.single('avatar'))
app.use(csrf())
app.use(flash())
app.use(varMiddleware)
app.use(userMiddleware)

app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/courses', coursesRoutes)
app.use('/card', cardRoutes)
app.use('/orders', ordersRoutes)
app.use('/profile', profileRoutes)
app.use('/auth', authRoutes)

app.use(errorHandler)

const PORT = process.env.PORT || 3000

async function start() {
  try {
   
    await mongoose.connect(keys.MONGODB_URI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    })
   
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()


