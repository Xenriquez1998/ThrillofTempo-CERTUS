function click(){
    var nombre= document.getElementById("nombre").value;
    var email1 = document.getElementById("email1").value;
    var asunto= document.getElementById("asunto").value;
    var mensaje = document.getElementById("mensaje").value;

    var idatos =[nombre,email1,asunto,mensaje];
    console.log(nombre);
    

}

function newsletter(){
    var email2 = document.getElementById("email2").value;

    console.log(email2);
}


const planes =[
    {
        id:1,
        nombre: 'Plan Gratis',
        descripcion: 'Plan completamente gratis',
        precio: 0,
    },
    {
        id:2,
        nombre: 'Plan Básico',
        descripcion: 'Plan básico para eliminar anuncios ',
        precio: 9.99,
    },
    {
        
        id:3,
        nombre: 'Plan Profesional',
        descripcion: 'Plan PRO TEMPO ',
        precio: 19.99,
    }
]


let carrito = [];

const contenedor = document.querySelector("#contenedor");
const carritoContenedor = document.querySelector("#carritoContenedor");
const vaciarCarrito = document.querySelector("#vaciarCarrito");
const precioTotal = document.querySelector("#precioTotal");
const procesarCompra = document.querySelector("#procesarCompra");

let credito = document.getElementById("credito").value;





document.addEventListener("DOMContentLoaded", () => {
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  
    mostrarCarrito(); 
    
  
});

vaciarCarrito.addEventListener("click", () => {
    carrito.length = [];
    mostrarCarrito();
  });

procesarCompra.addEventListener("click", () => {
    if (carrito.length === 0) {
      Swal.fire({
        title: "¡Tu carrito está vacio!",
        text: "Compra algo para continuar con la compra",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    } else {
      
     let esvalido =  valid_credit_card(credito);
      if(esvalido==true){
        alert("Numero válido. Compra procesada");
      }
      else{
        alert("Numero inválido, intente nuevamente");
      }
  
    }
});

function agregarPlanGratis(){
    while(carrito.length > 0)
    carrito.pop();
    let idg = planes[0].id;
    let nomg = planes[0].nombre;
    let descg = planes[0].descripcion;
    let preciog = planes[0].precio;
    
    carrito.push(planes[0]);
    console.log(carrito);
    mostrarCarrito();


  
}

function agregarPlanBasico(){

    while(carrito.length > 0)
    carrito.pop();
    let idg = planes[1].id;
    let nomg = planes[1].nombre;
    let descg = planes[1].descripcion;
    let preciog = planes[1].precio;
    
    carrito.push(planes[1]);
    console.log(carrito);
    mostrarCarrito();


  
}

function agregarPlanPro(){
    while(carrito.length > 0)
    carrito.pop();
    let idg = planes[2].id;
    let nomg = planes[2].nombre;
    let descg = planes[2].descripcion;
    let preciog = planes[2].precio;
    
    carrito.push(planes[2]);
    console.log(carrito);
    mostrarCarrito();



  
}


const mostrarCarrito = () => {
    const modalBody = document.querySelector(".modal .modal-body2");
    modalBody.innerHTML = "";
    carrito.forEach((prod) => {
      const { id, nombre, descripcion, precio, } = prod;
      modalBody.innerHTML += `
      <div class="modal-contenedor">
        <div>
        <p class="p-1">Producto: ${nombre}</p>
        <p class="p-1">Precio: ${precio}</p>
        <p class="p-1">Descripcion :${descripcion}</p>
        <button class="btn btn-danger btn-block" onclick="eliminarProducto(${id})">Eliminar producto</button>
        </div>
      </div>
      
      `;
    });

    if (carrito.length === 0) {
        console.log("Nada");
        modalBody.innerHTML = `
        <p class="text-center text-primary parrafo">¡Aun no agregaste nada!</p>
        `;
      } else {
        console.log("Algo");
      }
      


    guardarStorage();
    
};


  
function eliminarProducto(id) {
    const planId = id;
  carrito = carrito.filter((plan) => plan.id !== planId);
    console.log(carrito);
    mostrarCarrito();
    
  }

  function guardarStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
   
}



function valid_credit_card(value) {
  // accept only digits, dashes or spaces
      if (/[^0-9-\s]+/.test(value)) return false;
  
  // The Luhn Algorithm. It's so pretty.
      var nCheck = 0, nDigit = 0, bEven = false;
      value = value.replace(/\D/g, "");
  
      for (var n = value.length - 1; n >= 0; n--) {
          var cDigit = value.charAt(n),
              nDigit = parseInt(cDigit, 10);
  
          if (bEven) {
              if ((nDigit *= 2) > 9) nDigit -= 9;
          }
  
          nCheck += nDigit;
          bEven = !bEven;
      }
  
      return (nCheck % 10) == 0;
  }