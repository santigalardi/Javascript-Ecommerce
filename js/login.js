// BACKGROUND

const imgbg = document.querySelector('.bg-box');

const backgrounds = ['img/bg/bg1.jpg', 'img/bg/bg2.jpeg', 'img/bg/bg3.jpg', 'img/bg/bg4.jpg', 'img/bg/bg5.jpg'];

let random = Math.floor(Math.random() * backgrounds.length);

window.onload = function () {
  imgbg.style.backgroundImage = 'url(' + backgrounds[random] + ')';
};

//

const formIngresar = document.querySelector('#login'),
  userInput = document.querySelector('#user'),
  passInput = document.querySelector('#pass'),
  p = document.querySelector('#mensaje');

// Funciones

function inicioSesion(usuarios) {
  // codigo inicio sesion
  let userNameFound = usuarios.find((usuario) => {
    return usuario.usuario == userInput.value;
  });

  let passFound = usuarios.find((usuario) => {
    return usuario.pass == passInput.value;
  });

  if (userInput.value === '') {
    document.querySelector('#mensaje').innerText = 'Ingrese su usuario.';
  } else if (userNameFound == undefined) {
    document.querySelector('#mensaje').innerText = 'Usuario no encontrado.';
  } else if (passInput.value === '') {
    document.querySelector('#mensaje').innerText = 'Ingrese su constraseña.';
  } else if (passFound == undefined) {
    document.querySelector('#mensaje').innerText = 'Contraseña incorrecta.';
  } else if (userNameFound && passFound) {
    window.location.href = './html/products.html';
  } else {
    document.querySelector('#mensaje').innerText = 'Usuario no encontrado.';
  }
}
// Si userFound redireccionar

function recuperarLS() {
  return JSON.parse(localStorage.getItem('usuarios'));
}

// ejecucion de funciones

let usuariosLS = recuperarLS();

// listeners

formIngresar.addEventListener('submit', (e) => {
  e.preventDefault();
  inicioSesion(usuariosLS);
});
