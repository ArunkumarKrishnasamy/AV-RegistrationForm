const express = require("express");
const app = express();

const PORT = process.env.PORT || 3001;
app.use(express.json());

const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
// const URL =
//   "mongodb+srv://Arun:Admin123>@cluster0.1ycybl6.mongodb.net/?retryWrites=true&w=majority";
const url = "mongodb://localhost:27017";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
  // check for tokenin headers
  if (req.headers.authorization) {
    let decode = jwt.verify(req.headers.authorization, "thisisasecretkey");
    if (decode) {
      next();
    } else {
      res.status(500).json({ message: "unauthorized token" });
    }
  } else {
    res.status(500).json({ message: "token is not available" });
  }
}

const CLIENT_ID =
  "647724450623-kddudgv0vsu0p3ee4hj7u67anps5i2s5.apps.googleusercontent.com";
const { OAuth2Client } = require("google-auth-library");

async function verify(client, token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  return ticket.getPayload();
  // const userid = payload["sub"];
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
}

app.get("/registration", async (req, res) => {
  try {
    var token = req.query.id_token;
    const client = new OAuth2Client(CLIENT_ID);
    var data = await verify(client, token);
    res.send(data);
    if (data.email_verified) {
      // open the connection
      let connection = await mongoClient.connect(url);
      // select the db
      let db = connection.db("registration");
      // fetch user data from collection
      let user = await db.collection("users").find({ Email: data.email });
      if (user) {
        // Generate jwt
        let token = jwt.sign(
          { id: user._id, name: user.name },
          "thisisasecretkey"
        );
        res.json({ token });
      } else {
        await db.collection("users").insertOne(data);
        let token = jwt.sign(
          { id: data._id, name: data.name },
          "thisisasecretkey"
        );
        res.json({ token });
      }
    } else {
      res.json({ message: "Unauthorized", auth: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.post("/registration", async (req, res) => {
  try {
    //   open the connection
    let connection = await mongoClient.connect(url);

    // select the db
    let db = await connection.db("registration");

    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(req.body.Password, salt);
    req.body.Password = hash;
    req.body.ConfirmPassword = req.body.Password;
    //   select the collections
    console.log(req.body);
    await db.collection("users").insertOne(req.body);

    await connection.close();

    res.json({ message: "new user added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.get("/registration", authenticate, async (req, res) => {
  try {
    let connection = await mongoClient.connect(url);
    let db = await connection.db("registration");
    let users = await db.collection("users").find().toArray();

    await connection.close();

    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.post("/signin", async (req, res) => {
  try {
    // open the connection
    let connection = await mongoClient.connect(url);
    // select the db
    let db = connection.db("registration");
    // fetch user data from collection
    let user = await db.collection("users").findOne({ Email: req.body.email });
    // check user email is present
    if (user) {
      // check whether  the password is matching
      let compare = bcrypt.compareSync(req.body.password, user.Password);
      if (compare) {
        // Generate JWT taken
        let token = jwt.sign(
          { id: user._id, name: user.name },
          "thisisasecretkey"
        );
        res.json({ token });
      } else {
        res.status(500).json({ message: "Password not matched" });
      }
    } else {
      res.status(401).json({ message: "user not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "signin failed",
    });
  }
});

app.listen(PORT, () => {
  console.log("web Server started");
});
