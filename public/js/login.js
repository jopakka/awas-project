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
      errorField.className = 'hidden';
    }
  } catch (e) {
    console.error('login error', e.message);
  }
});