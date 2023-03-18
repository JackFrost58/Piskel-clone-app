import './login.scss';


const buttonLogin = document.getElementById('login');

buttonLogin.addEventListener('click', () => {
  window.netlifyIdentity.open();
  
  window.netlifyIdentity.on('logout', () => {
    buttonLogin.textContent = 'Login';
  });

  window.netlifyIdentity.on('login', () => {
    buttonLogin.textContent = 'Logout';
  });
});

function initNetlify() {
  const script = document.createElement('script');
  script.src = 'https://identity.netlify.com/v1/netlify-identity-widget.js';
  script.async = true;

  document.body.append(script); 
}


export default initNetlify;