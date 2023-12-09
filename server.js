const express = require("express");
const app = express();
const cors = require("cors");
const connectToMongoDb = require("./dbConnection/connect");
const adminRoutes = require('./routers/admin.route');
const productRoutes = require('./routers/product.route');

// middleawre
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Methods', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

app.use('/',productRoutes)

app.use('/admin' ,adminRoutes )

const runServerApplication = async () => {
  try {
    await connectToMongoDb(process.env.MONGO_URL_KEY);
    app.listen(3000, () => {
      console.log("the server is running on port 3000");
    });
  } catch (error) {
    console.error(error);
  }
};

runServerApplication();
