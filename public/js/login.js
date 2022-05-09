const form = document.querySelector('#loginForm');
const elements = form.elements;

// Login action
form.addEventListener('submit', async evt => {
  evt.preventDefault();
  console.log('Login', elements);
  try {
    const response = await fetch('http://localhost:3000/login',
        {method: 'POST'});
    console.log('response', response);
  } catch (e) {
    console.error('login error', e.message);
  }
});