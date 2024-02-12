const seedUser = async () => {
  const User = require("../models").User;

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


  //Added for loop to individually await creation of each user so the passwords get hashed, bulkCreate assigns all tasks at once and cannot await the hook properly for each
  for (let i = 0; i < userData.length; i++) 
  { 
    await User.create(userData[i]);
  }
};

module.exports = seedUser;