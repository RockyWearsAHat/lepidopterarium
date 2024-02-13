const registerFormEl = document.getElementById("register_formWrapper");
const usernameEl = document.getElementById("register_usernameInput");
const emailEl = document.getElementById("register_emailInput");
const firstNameEl = document.getElementById("register_firstName");
const lastNameEl = document.getElementById("register_lastName");
const passwordEl = document.getElementById("register_passwordInput");
const rptPasswordEl = document.getElementById("register_rptPasswordInput");

const errorDisplay = document.getElementById("register_error");
const submitBtn = document.getElementById("register_submitBtn");

const handleSubmit = async (e) => {
  await e.preventDefault();
  try {
    if (!usernameEl || usernameEl.value == "")
      throw new Error("Username cannot be blank");
    if (!firstNameEl || firstNameEl.value == "")
      throw new Error("First name cannot be blank");
    if (!lastNameEl || lastNameEl.value == "")
      throw new Error("Last name cannot be blank");
    if (!passwordEl || passwordEl.value == "")
      throw new Error("Password cannot be blank");
    if (!rptPasswordEl || rptPasswordEl.value == "")
      throw new Error("Repeat password cannot be blank");
    if (emailEl.value != "" && !isEmail(emailEl.value))
      throw new Error("Please enter a valid email address");

    if (rptPasswordEl.value != passwordEl.value)
      throw new Error("Passwords do not match!");

    let body = {};

    body.username = usernameEl.value;
    if (emailEl.value) body.email = emailEl.value;
    body.firstName = firstNameEl.value;
    body.lastName = lastNameEl.value;
    body.password = passwordEl.value;

    const res = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const jsonRes = await res.json();

    if (jsonRes.err) {
      throw new Error(
        `${jsonRes.err.substring(0, 1).toUpperCase()}${jsonRes.err.substring(
          1
        )}`
      );
    }

    const loginRes = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: usernameEl.value,
        password: passwordEl.value,
      }),
    });

    console.log(loginRes);

    const loginJson = await loginRes.json();

    if (loginJson.err) throw new Error(loginJson.err);

    errorDisplay.setAttribute("active", "false");
    errorDisplay.innerHTML = "";

    window.location.href = "/";
  } catch (err) {
    errorDisplay.setAttribute("active", "true");
    errorDisplay.innerHTML = err.message;
  }
};

const passwordsMatchEl = document.getElementById("register_passwordsMatch");
const updatePasswordsMatchIcon = () => {
  if (rptPasswordEl.value.length == 0) return (passwordsMatchEl.innerHTML = "");
  if (passwordEl.value == rptPasswordEl.value)
    passwordsMatchEl.innerHTML = "done";
  else passwordsMatchEl.innerHTML = "close";
};

const toggleAssosciatedPasswordInput = (e) => {
  const assPass = e.target.getAttribute("associatedpwd");
  if (assPass) {
    const elOfAocPass = document.getElementById(assPass);

    if (elOfAocPass) {
      elOfAocPass.getAttribute("type") == "password"
        ? elOfAocPass.setAttribute("type", "text")
        : elOfAocPass.setAttribute("type", "password");

      elOfAocPass.getAttribute("type") == "password"
        ? (e.target.innerHTML = "visibility_off")
        : (e.target.innerHTML = "visibility");
    }
  }
};

//CHECK IF USERNAME / EMAIL EXISTS IN DB, TIMER IMPLEMENTED SO REQUEST ISN'T MADE EVERY TO THE SERVER ON EVERY KEYSTROKE
const maxTypeTimeout = 500;
let typingTimerUsername, typingTimerEmail;

const startUsernameTimeout = async (type, e) => {
  e.target.parentNode.children[1].innerHTML = "";
  if (e.target.value == "") return;
  clearTimeout(typingTimerUsername);
  typingTimerUsername = setTimeout(
    async () => await checkIfExistsInDb(type, e),
    maxTypeTimeout
  );
};

const stopUsernameTimeout = () => {
  clearTimeout(typingTimerUsername);
};

const startEmailTimeout = async (type, e) => {
  e.target.parentNode.children[1].innerHTML = "";
  if (e.target.value == "") return;
  clearTimeout(typingTimerEmail);
  typingTimerEmail = setTimeout(
    async () => await checkIfExistsInDb(type, e),
    maxTypeTimeout
  );
};

const stopEmailTimeout = (timerVar) => {
  clearTimeout(timerVar);
};

const checkIfExistsInDb = async (type, e) => {
  const res = await fetch(`/api/user/check?type=${type}&val=${e.target.value}`);
  const json = await res.json();

  console.log(json);

  if (type == "email" && !isEmail(e.target.value)) {
    e.target.parentNode.children[1].innerHTML = "close";
    return;
  }

  if (json == "Valid") {
    e.target.parentNode.children[1].innerHTML = "done";
    return;
  } else {
    e.target.parentNode.children[1].innerHTML = "close";
    return;
  }
};

registerFormEl.addEventListener("submit", handleSubmit);

passwordEl.addEventListener("input", updatePasswordsMatchIcon);
rptPasswordEl.addEventListener("input", updatePasswordsMatchIcon);

const showPassword = document.getElementById("register_showPassword");
const rptShowPassword = document.getElementById("register_showRptPassword");

showPassword.addEventListener("click", toggleAssosciatedPasswordInput);
rptShowPassword.addEventListener("click", toggleAssosciatedPasswordInput);

usernameEl.addEventListener("keyup", (e) =>
  startUsernameTimeout("username", e)
);
emailEl.addEventListener("keyup", (e) => startEmailTimeout("email", e));
usernameEl.addEventListener("keydown", () => stopUsernameTimeout);
emailEl.addEventListener("keydown", () => stopEmailTimeout);
