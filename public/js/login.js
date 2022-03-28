const loginFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (username && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to log in! Make sure password is atleast 6 characters!');
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#new-username').value.trim();
  
  const password = document.querySelector('#new-pswd').value.trim();

  if (username && password) {
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to sign up. Make sure password is atleast 6 characters!');
    }
  }
};

document
  .querySelector('#sign-in')
  .addEventListener('click', loginFormHandler);
console.log("connected")

document
  .getElementById('signup')
  .addEventListener('click', signupFormHandler);
