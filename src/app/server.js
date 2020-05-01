import {model} from "mongoose";

const express = require('express');
const bodyParser = require('body-parser');
const mongo = require('mongoose');

var app = express();

// Set up default mongoose connection
var mongoDB = "mongodb://localhost/my_database";
mongo.connect(mongoDB, { useNewUrlParser: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// Defines the Model used for our Users
const UserModel = mongo.model("user", {
  firstName: String,
  lastName: String,
  email: String,
  birthday: String,
  employment: String,
  favoriteColor: {
    type: String,
    required: false
    }
});

// Allows the admin to create and save an user
app.post("/SaveUser", async(request, response, next) => {
  try {
    var user = new UserModel(request);
    var result = await user.save();
    response.send(result);
  } catch(error) {
    response.status(500).send(error);
  }
});

// Allows the admin to get the users in the db
app.get("/users", async(request, response, next) => {
  try {
    var result = await UserModel.find().exec();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

// Get request to get a specific user based on their ID
app.get("/user/:id", async (request, response, next) => {
  try {
    var user = await UserModel.findById(request.params.id);
    response.send(user);
  } catch (error) {
    response.status(500).send(error);
  }
});

// Allows the admin to update a specific user
app.put("/user/:id", async (request, response, next) => {
  try {
    var user = await UserModel.findById(request.params.id).exec();
    user.set(request.body);
    var result = await user.save();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

// Allows the admin to delete a specific user
app.delete("/user/:id", async (request, response, next) => {
  try {
    var result = await UserModel.deleteOne({_id: request.params.id}).exec();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.listen(4200, () => {
    console.log('Listening at: 4200...')
});
