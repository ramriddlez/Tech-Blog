const loginFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#new-username').value.trim();
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
      alert('Failed to log in! Please check your inputs again.');
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#new-username').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#new-pswd').value.trim();

  if (username && password && email) {
    const response = await fetch('/api/users/', {
      method: 'POST',
      body: JSON.stringify({ username, password, email }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
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
