const loginFormEl = document.getElementById("login_form");

const usernameInput = document.getElementById("login_usernameInput");
const passwordInput = document.getElementById("login_passwordInput");

const errorDisplay = document.getElementById("login_error");

const submitBtn = document.getElementById("login_submitBtn");

const handleSubmit = async (e) => {
  try {
    await e.preventDefault();

    const username = usernameInput.value || "";
    const password = passwordInput.value || "";

    //Username or password is blank
    if (!username || username == "" || !password || password == "")
      throw new Error("Please enter a valid username and password");

    const res = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    let jsonRes = await res.json();

    switch (jsonRes) {
      case "Logged in user!":
        window.location.href = "/";
        break;
      default:
        if (isEmail(username)) jsonRes = jsonRes.replace("username", "email");
        errorDisplay.innerHTML = jsonRes;
        break;
    }
  } catch (err) {
    console.log(err.message);
  }
};

loginFormEl.addEventListener("submit", handleSubmit);
submitBtn.addEventListener("click", handleSubmit);
