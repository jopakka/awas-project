(async () => {
  const createLink = (href, text) => {
    const a = document.createElement('a');
    a.href = href;
    a.innerText = text;
    return a;
  };

  const logoutAction = (evt) => {
    evt.preventDefault();
    if (confirm('Do you want to logout?')) {
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      window.open('http://localhost:3000/', '_self');
    }
  };

  const getCookie = (name) => {
    try {
      return document.cookie.split('; ').
          find(row => row.startsWith(`${name}=`)).
          split('=')[1];
    } catch (e) {
      return null;
    }
  };

  const anonLinks = [
    {
      href: './index.html',
      text: 'Main Page',
    },
    {
      href: './login.html',
      text: 'Login',
    },
    {
      href: './register.html',
      text: 'Register',
    },
  ];

  const userLinks = [
    {
      href: './index.html',
      text: 'Main Page',
    },
    {
      href: './index.html',
      text: 'Logout',
    },
  ];

  const linkDiv = document.querySelector('#header-button-container');
  const cookieValue = getCookie('token');
  if (cookieValue) {
    userLinks.forEach(l => {
      const a = createLink(l.href, l.text);
      if (l.text === 'Logout') {
        a.addEventListener('click', logoutAction);
      }
      linkDiv.appendChild(a);
    });
  } else {
    anonLinks.forEach(l => {
      const a = createLink(l.href, l.text);
      linkDiv.appendChild(a);
    });
  }
})();