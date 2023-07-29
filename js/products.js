const microphones = [
  { id: 1, nombre: 'AKG C414', precio: 1999, cantidad: 1, img: '414.jpg' },
  { id: 2, nombre: 'Neumann U87', precio: 4499, cantidad: 1, img: 'u87.jpg' },
  { id: 3, nombre: 'Neumann TLM 103', precio: 1799, cantidad: 1, img: 'tlm.jpg' },
  { id: 4, nombre: 'Shure SM58', precio: 179, cantidad: 1, img: 'sm58.jpg' },
  { id: 5, nombre: 'Rode NT1', precio: 499, cantidad: 1, img: 'nt1.jpg' },
  { id: 6, nombre: 'Shure Ksm44a', precio: 1899, cantidad: 1, img: 'shure.jpg' },
  { id: 7, nombre: 'AT2020', precio: 199, cantidad: 1, img: 'at2020.jpg' },
  { id: 8, nombre: 'Shure SM57', precio: 159, cantidad: 1, img: 'sm57.jpg' },
  { id: 9, nombre: 'Shure SM7b', precio: 699, cantidad: 1, img: 'sm7b.jpg' },
];

let carrito = [];

const contenedor = document.querySelector('.container-items'),
  btnCart = document.querySelector('.container-cart-icon'),
  containerCartProducts = document.querySelector('.container-cart-products'),
  rowProduct = document.querySelector('.row-product'),
  cartInfo = document.querySelector('.cart-product'),
  vaciarCarrito = document.querySelector('#vaciar-carrito'),
  valorTotal = document.querySelector('.total-pagar'),
  countProducts = document.querySelector('#contador-productos'),
  procesarCompra = document.querySelector('#procesar-compra'),
  refresh = document.querySelector('h1');

refresh.addEventListener('click', () => {
  location.reload();
});

btnCart.addEventListener('click', () => {
  containerCartProducts.classList.toggle('hidden-cart');
  mostrarCarrito();
});

// NO ELIMINAR EL STORAGE EN RELOAD

document.addEventListener('DOMContentLoaded', () => {
  carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  mostrarCarrito();
});

// PINTAR HTML CARDS

const renderServicios = (arr) => {
  arr.forEach((prod) => {
    const { id, nombre, precio, img } = prod;
    contenedor.innerHTML += `
      <div class="card mb-3" style="width: 20rem;">
        <figure>
          <img class="card-img-top mt-2 h-300" src="../img/mic/${img}" alt="card image cap">
        </figure>
        <div class="card-body">
          <h5 class="card-title">${nombre}</h5>
          <p class="card-text">$${precio}</p>
        </div>
          <button onclick="agregarProducto(${id})" class="btn btn-dark m-2">Agregar al carrito</button>
      </div>
    `;
  });
};

// MOSTRAR CARRITO

const mostrarCarrito = () => {
  // limpiar carrito
  rowProduct.innerHTML = '';

  let total = 0;

  let totalOfProducts = 0;

  carrito.forEach((prod) => {
    const containerProduct = document.createElement('div');
    containerProduct.classList.add('cart-product');
    const { id, nombre, precio, cantidad } = prod;
    containerProduct.innerHTML += `
      <div class="info-cart-product">
          <span class="cantidad-producto-carrito">${cantidad}</span>
          <p class="titulo-producto-carrito">${nombre}</p>
          <span class="precio-producto-carrito">$${precio * cantidad}</span>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" onclick="eliminarProducto(${id})" class="icon-close">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
      `;

    rowProduct.append(containerProduct);

    total = total + parseInt(cantidad * precio);

    totalOfProducts = totalOfProducts + cantidad;
  });

  if (carrito.length == 0) {
    rowProduct.innerHTML = `
          <p class= "cart-empty">¡El carrito está vacío!</p>
      `;
  }

  valorTotal.innerText = `$${total}`;
  countProducts.innerText = totalOfProducts;

  guardarStorage();
};

// AÑADIR ITEM AL CARRITO

function agregarProducto(id) {
  const existe = carrito.some((e) => e.id === id);

  if (existe) {
    carrito.map((prod) => {
      if (prod.id === id) {
        prod.cantidad++;
      }
    });
  } else {
    const item = microphones.find((prod) => prod.id === id);
    item.cantidad = 1;
    carrito.push(item);
  }
  mostrarCarrito();

  Swal.fire({
    icon: 'success',
    title: 'Producto añadido al carrito',
    text: '¡El producto ha sido agregado al carrito exitosamente!',
    timer: 2000, // Tiempo en milisegundos que se mostrará el Sweet Alert
    showConfirmButton: false,
  });
}

// ELIMINAR ITEM DE CARRITO

function eliminarProducto(id) {
  const micID = id;
  carrito = carrito.filter((mic) => mic.id !== micID);
  mostrarCarrito();
}

// VACIAR CARRITO

function emptyCart() {
  carrito.length = [];
  mostrarCarrito();
}

vaciarCarrito.addEventListener('click', () => {
  emptyCart();
});

//PROCESAR COMPRA (BTN COMPRAR)

procesarCompra.addEventListener('click', async () => {
  if (carrito.length === 0) {
    Swal.fire({
      icon: 'error',
      title: '¡Tu carrito esta vacío!',
      text: 'Agrega productos para continuar.',
    });
  } else {
    const { value: email } = await Swal.fire({
      title: '¡Gracias por visitarnos!',
      input: 'email',
      inputLabel: 'Introduzca su e-mail para continuar con su compra.',
      inputPlaceholder: 'e-mail',
    });
    if (email) {
      Swal.fire({
        title: '¡Gracias por su compra!',
        text: 'Enviamos la factura y medios de pago a su correo electrónico.',
        icon: 'success',
      });
      emptyCart();
      localStorage.clear();
    }
  }
});

// GUARDAR STORAGE

function guardarStorage() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// FETCH => RENDER CARDS

fetch('../data/data.json')
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    renderServicios(data);
  });
