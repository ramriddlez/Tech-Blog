async function loginFormHandler(event) {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'post',
      body: JSON.stringify({
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
}

const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#new-username').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#new-pswd').value.trim();

  if (username && password && email) {
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify({ username, password, email }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      console.log('success');
      document.location.replace('/');
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
