// node modules import
require("dotenv").config({path: "./config.env"});
require('winston-mongodb');
const express = require("express");
const cors = require("cors");
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const helmet = require("helmet");
const hpp = require("hpp");
const winston = require("winston")

// constom modules import
const connectDB = require("./config/database");
const errorHandler = require("./middleware/error");
const logger = require("./utils/logger")


// runing/initialization of the imported
const app = express()


// initializing database
connectDB()


// initializing api limiter
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
	message: 'Too many requests from this IP, please try again in 15 minutes!',
})


// express middlewares
app.disable('x-powered-by');
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(hpp());
app.use(limiter);
app.use(mongoSanitize());
app.use(xss());
app.use("/api/user", require("./routes/user"));

app.use("/api/storage", require("./routes/storage"));
app.use("/api/shipping", require("./routes/shipping"));

app.use("/api/quotation", require("./routes/quotation"));
app.use("/api/storagequotation", require("./routes/storagequotation"));
app.use("/api/shipmentquotation", require("./routes/shipmentquotation"));
app.use("/api/productquotation", require("./routes/productquotation"));

app.use("/api/email", require("./routes/email"));
app.use("/api/contact", require("./routes/contact"));

app.use("/api/blogs", require("./routes/blogs"));
app.use("/api/news", require("./routes/news"));

app.use("/api/faq", require("./routes/faq"));

// error middle ware
app.use(errorHandler);

// port connection
const PORT = process.env.PORT || 5000
app.listen(PORT, () => logger.info(`Connected to port ${PORT}`))

// throw new Error("SOMEFDVSDFVS")

// process termination after unhandles promise rejection
process.on("unhandledRejection", (error, promise) => {
	if(error){
		logger.error("Unhandled Promise Rejection Error :", error)
		process.exit(1)
	} else {
		logger.info("Unhandled Promise :", promise)
	}
})
