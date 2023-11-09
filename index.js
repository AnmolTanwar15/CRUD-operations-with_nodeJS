import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const app = express();
import http from "http";

// Database Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/test")
  .then(() => {
    console.log("Connected Successfully");
  })
  .catch((e) => {
    console.log(e);
  });

// Body Structure
const userSchema = mongoose.Schema({
  fName: {
    type: String,
  },
  lName: {
    type: String,
  },
  email: {
    type: String,
    // unique:true
  },
  mob: {
    type: Number,
    // unique:true
  },
  salary: {
    type: String,
  },
});

const userModel = mongoose.model("user", userSchema); //Connection b/w Schema and Database

app.use(express.json()); //Uses for post data to apis
app.use(express.urlencoded({ extended: true })); //Uses for post data
app.use(cors()); //To refuse CORS error

// CRUD APIs

// For Add User
app.post("/add_user", async (req, res) => {
  try {
    let user = await userModel.findOne({
      $or: [{ mob: req.body.mob }, { email: req.body.email }],
    });
    if (user) {
      return res.status(400).send({
        status: true,
        message: "User Already exist.",
        data: req.body,
      });
    }
    console.log("User Added");
    await userModel.create(req.body);
    res.status(200).send({
      status: true,
      message: "User Added Successfully",
      data: req.body,
    });
  } catch (err) {
    console.log(err);
  }
});

// For Gel All User
app.get("/get_user", async (req, res) => {
  try {
    console.log("Get All User");
    let data = await userModel.find();
    res.status(200).send({
      status: true,
      message: "All user",
      data: data,
    });
  } catch (err) {
    console.log(err);
  }
});

// For Delete User
app.delete("/delete_user/:id", async (req, res) => {
  try {
    console.log("User Deleted");
    await userModel.deleteOne({ _id: req.params.id });
    // let data = await userModel.find();
    res.status(200).send({
      status: true,
      message: "User deleted Successfully",
      // data:data
    });
  } catch (err) {
    console.log(err);
  }
});

// For Update User
app.put("/update_user", async (req, res) => {
  try {
    console.log("User Updated");
    let data = await userModel.updateOne({ _id: req.body.id }, req.body);
    res.status(200).send({
      status: true,
      message: "User Updated Successfully",
      data: data,
    });
  } catch (err) {
    console.log(err);
  }
});

// Server Connection
app.listen(4100, () => console.log("listining to server at port 4100"));
