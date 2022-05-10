const form = document.querySelector('#loginForm');
const elements = form.elements;
const errorField = document.querySelector('#loginError');

// Login action
form.addEventListener('submit', async evt => {
  evt.preventDefault();
  try {
    const body = {
      username: elements.username.value,
      password: elements.password.value,
    };
    const response = await fetch('http://localhost:3000/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });
    const json = await response.json();
    if (response.status !== 200) {
      errorField.className = '';
      errorField.innerHTML = `Error: ${json.message}`;
    } else {
      // TODO: save userinfo to somewhere and redirect somewhere
      errorField.className = 'hidden';
      document.cookie = `token=${json.token}`;
      window.open('http://localhost:3000/secret', '_self');
    }
  } catch (e) {
    console.error('login error', e.message);
  }
});