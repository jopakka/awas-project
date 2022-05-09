const form = document.querySelector('#loginForm');
const elements = form.elements;

// Login action
form.addEventListener('submit', evt => {
  evt.preventDefault();
  console.log('Login', elements);
});