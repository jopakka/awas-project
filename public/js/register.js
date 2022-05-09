const form = document.querySelector('#registerForm');
const elements = form.elements;

// Registering action
form.addEventListener('submit', evt => {
  evt.preventDefault();
  console.log('Register', elements);
});