const loginFormEl = document.getElementById('login_form');

const usernameInput = document.getElementById('login_usernameInput');
const passwordInput = document.getElementById('login_passwordInput');

const submitBtn = document.getElementById('login_submitBtn');

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const username = usernameInput.value || '';
    const password = passwordInput.value || '';

    //Username or password is blank
    if (!username || username == '' || !password || password == '')
      throw new Error('Please enter a valid username and password');
  } catch (err) {
    console.log(err.message);
  }
};

loginFormEl.addEventListener('submit', handleSubmit);
submitBtn.addEventListener('click', handleSubmit);
