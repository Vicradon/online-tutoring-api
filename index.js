const express = require("express");
const mongoose = require("mongoose");
const app = express();
const authRouter = require("./routes/auth");
const categoryRouter = require("./routes/categories");
const subjectRouter = require("./routes/subjects");
const tutorRouter = require("./routes/tutors");
const tokenHasExpired = require("./middleware/tokenHasExpired")
const allowIfLoggedIn = require("./middleware/allowIfLoggedIn")
const hasAccessTo = require("./middleware/hasAccessTo")
require("dotenv").config()

mongoose.connect("mongodb://localhost/aye-learn", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("connected to mongo");
});



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * The order of these middleswares are important
 * The auth route is public
 */
app.use("/auth", authRouter);

app.use(allowIfLoggedIn)
app.use(hasAccessTo)

app.use("/categories", categoryRouter);
app.use("/subjects", subjectRouter);
app.use("/tutors", tutorRouter);

// app.error(function (err, req, res, next) {
//   if (err instanceof NotFound) {
//     res.send('404.jade');
//   } else {
//     next(err);
//   }
// });

// app.use(function (err, req, res, next) {
//   console.error(err.stack)
//   res.status(500).send('Something broke!')
// })

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
