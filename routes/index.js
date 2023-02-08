var express = require("express");
var router = express.Router();
var User = require("../models/signUp");
var Jobs = require("../models/Jobs");

var app = express();
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
// router.get('/', function (req, res, next) {
// 	return res.render('index.ejs');
// });

// creating registration api for user
router.post("/signup", function (req, res, next) {
  // console.log(req.body);
  var userInfo = req.body;

  if (userInfo.password == userInfo.passwordConf) {
    User.findOne({ email: userInfo.email }, function (err, data) {
      if (!data) {
        User.findOne({}, function (err, data) {
          var newUser = new User({
            // unique_id: c,
            email: userInfo.email,
            password: userInfo.password,
            passwordConf: userInfo.passwordConf,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            niche: userInfo.niche,
          });

          newUser.save(function (err, Person) {
            if (err) console.log(err);
            else console.log("Success");
          });
        })
          .sort({ _id: -1 })
          .limit(1);
        res.send({ Success: "Registration successful." });
      } else {
        res.send({ Error: "Email is already used." });
      }
    });
  } else {
    res.send({ Error: "password is not matched" });
  }
});

// creating login api for user
router.post("/login", function (req, res, next) {
  User.findOne({ email: req.body.email }, function (err, data) {
    if (data) {
      if (data.password == req.body.password) {
        //console.log("Done Login");
        // req.session.userId = data.unique_id;
        // console.log(">>>>>>>", req.session.userId);
        res.send({ Success: data });
      } else {
        res.send({ Error: "Wrong password!" });
      }
    } else {
      res.send({ Error: "This Email Is not regestered!" });
    }
  });
});

// creating add job api
router.post("/addJob", function (req, res, next) {
  console.log(req.body);
  var jobInfo = req.body;

  // if (jobInfo.password == jobInfo.passwordConf) {

  // Jobs.findOne({ email: jobInfo.email }, function (err, data) {
  // if (!data) {
  Jobs.findOne({}, function (err, data) {
    var newJob = new Jobs({
      title: jobInfo.title,
      notes: jobInfo.notes,
      images: jobInfo.images,
      details: jobInfo.details,
      completed: false,
    });

    newJob.save(function (err, Person) {
      if (err) console.log(err);
      else console.log("Success");
    });
  })
    .sort({ _id: -1 })
    .limit(1);
  res.send({ Success: "Registration successful." });
  // } else {
  // 	res.send({ "Success": "Email is already used." });
  // }

  // });
  // } else {
  // 	res.send({ "Success": "password is not matched" });
  // }
});
//updating compelte status api
router.put("/updateStatus/:id", function (req, res) {
  // console.log(req.body);
  var jobInfo = req.body;

  Jobs.findByIdAndUpdate(req?.params?.id, jobInfo, {
    // var newJob = new Jobs({
    completed: jobInfo.completed,
    // })
  })
    .then((res) => {
      res.send({ Success: "Update successful." });
    })
    .catch((error) => {
      res.send({ Error: "error updating doc", error });
    });
});
//update All values of job
router.put("/updateJobDetails/:id", function (req, res) {
  // console.log(req.body);
  var jobInfo = req.body;

  Jobs.findByIdAndUpdate(req?.params?.id, jobInfo, {
    // var newJob = new Jobs({
      title: jobInfo.title,
      notes: jobInfo.notes,
      images: jobInfo.images,
      details: jobInfo.details,
      userNotes:jobInfo.userNotes,
    // })
  })
    .then((res) => {
      res.send({ Success: "Update successful." });
    })
    .catch((error) => {
      res.send({ Error: "error updating doc", error });
    });
});

// creating getting all school list
router.get("/getJobs", function (req, res, next) {
  //console.log(req.body);
  Jobs.find({}, function (err, schoools) {
    if (schoools) {
      res.send(schoools);
    } else {
      res.send({ Error: "This Email Is not regestered!" });
    }
  });
});

router.get("/getJobById/:id", function (req, res, next) {
  //console.log(req.body);
  Jobs.findById(req?.params?.id, function (err, schoool) {
    if (schoool) {
      res.send(schoool);
    } else {
      res.send({ Error: "This Email Is not regestered!" });
    }
  });
});
// creating profile api to view any loggedin user data
router.get("/profile", function (req, res, next) {
  // console.log("profile");
  User.findOne({ unique_id: req }, function (err, data) {
    // console.log("data");
    console.log(data);
    if (!data) {
      // res.send('/');
      return res.send("Date not found");
    } else {
      console.log("found");
      return res.send(data);
    }
  });
});

// creating logout api
router.get("/logout", function (req, res, next) {
  console.log("logout");
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.send("Logged out success");
      }
    });
  }
});

router.post("/forgetpass", function (req, res, next) {
  //console.log('req.body');
  //console.log(req.body);
  User.findOne({ email: req.body.email }, function (err, data) {
    console.log(data);
    if (!data) {
      res.send({ Success: "This Email Is not regestered!" });
    } else {
      // res.send({"Success":"Success!"});
      if (req.body.password == req.body.passwordConf) {
        data.password = req.body.password;
        data.passwordConf = req.body.passwordConf;

        data.save(function (err, Person) {
          if (err) console.log(err);
          else console.log("Success");
          res.send({ Success: "Password changed!" });
        });
      } else {
        res.send({
          Success: "Password does not matched! Both Password should be same.",
        });
      }
    }
  });
});

module.exports = router;
