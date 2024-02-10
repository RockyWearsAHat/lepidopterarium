const { User } = require("../models");

const userData = [
  {
    username: "dj_khaled",
    email: "djkhaled1@hotmail.com",
    firstName: "Dj",
    lastName: "Khaled",
    password: "password1!",
  },
  {
    username: "theRealJohnDoe",
    email: "example@gmail.com",
    firstName: "John",
    lastName: "Doe",
    password: "password1!",
  },
  {
    username: "KingJames",
    email: "lebron@yahoo.com",
    firstName: "Lebron",
    lastName: "James",
    password: "mikesthegoat1!",
  },
  {
    username: "bestTester",
    email: "test@gmail.com",
    firstName: "Ima",
    lastName: "Tester",
    password: "password123",
  },
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;