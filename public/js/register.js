const form = document.querySelector('#registerForm');
const elements = form.elements;
const errorField = document.querySelector('#registerError');

// Registering action
form.addEventListener('submit', async evt => {
  evt.preventDefault();
  errorField.className = 'hidden';
  try {
    const body = {
      username: elements.username.value,
      password: elements.password.value,
      confirmPassword: elements.confirmPassword.value,
      admin: elements.admin.checked,
    };
    const response = await fetch('http://localhost:3000/auth/register',
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
      errorField.className = '';
      errorField.innerHTML = 'User created successfully';
    }
  } catch (e) {
    console.error('login error', e.message);
  }
});