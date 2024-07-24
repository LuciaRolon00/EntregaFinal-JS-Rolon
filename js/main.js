// IMPORTS
// Import relacionado a las preguntas
import { preguntas, opcionesArray, generadorValorAleatorio, mezclaAleatoria, llenarPreguntas } from "./preguntas.js";
// Import relacionado a los puntos almacenados en local storage
import { guardarPuntosEnLS, obtenerPuntosDesdeLS, guardarPuntos } from "./puntos.js";

// Selección de elementos del DOM
const container = document.querySelector(".container");
const juegoContainer = document.querySelector(".juego-container");
const startButton = document.getElementById("start");
const puntosContainer = document.querySelector(".puntos-container");
const puntosUsuario = document.getElementById("puntos-usuario");

// Declaración de variables 
let timer = document.getElementsByClassName("timer")[0];
let botonSgte;
let puntos, preguntaActual, preguntasFinal;
let cuentaRegresiva, contar = 11;

// Función de orden superior para temporizador
const crearTimer = (duracion, onTiempoTerminado) => {
  let contador = duracion;
  cuentaRegresiva = setInterval(() => {
    contador -= 1;
    timer.innerHTML = `<span>Tiempo: </span>${contador}s`;
    if (contador == 0) {
      clearInterval(cuentaRegresiva);
      onTiempoTerminado();
    }
  }, 1000);
};

const mostrarTimer = () => {
  crearTimer(11, siguientePregunta);
};

// Función de orden superior para llenar opciones
const llenarOpcionesConFiltro = (opcion_correcta, filtro) => {
  let arr = [opcion_correcta];
  while (arr.length < 4) {
    let valorAleatorio = generadorValorAleatorio(opcionesArray);
    if (!arr.includes(valorAleatorio) && filtro(valorAleatorio)) {
      arr.push(valorAleatorio);
    }
  }
  return arr;
};

const llenarOpciones = (opcion_correcta) => {
  return llenarOpcionesConFiltro(opcion_correcta, () => true);
};

// Empezar juego
const iniciarJuego = () => {
  puntosContainer.classList.add("hide");
  juegoContainer.classList.remove("hide");
  preguntasFinal = llenarPreguntas();
  puntos = 0;
  preguntaActual = 0;
  // Que salga la primera pregunta
  genTarjeta(preguntasFinal[preguntaActual]);

  // Recuperar puntos del localStorage
  puntos = obtenerPuntosDesdeLS();
  preguntasFinal = llenarPreguntas();
  preguntaActual = 0;

  // Mostrar la primera pregunta
  genTarjeta(preguntasFinal[preguntaActual]);
};

// Comprobar respuesta seleccionada
const comprobar = (e) => {
  let solucionUsuario = e.target.innerText;
  let opciones = document.querySelectorAll(".opcion");
  if (solucionUsuario === preguntasFinal[preguntaActual].opcion_correcta) {
    e.target.classList.add("correcto");
    puntos++;
  } else {
    e.target.classList.add("incorrecto");
    opciones.forEach((element) => {
      if (element.innerText == preguntasFinal[preguntaActual].opcion_correcta) {
        element.classList.add("correcto");
      }
    });
  }

  clearInterval(cuentaRegresiva);
  // Deshabilitar todas las opciones
  opciones.forEach((element) => {
    element.disabled = true;
  });

  guardarPuntos();
};

// Siguiente pregunta
const siguientePregunta = (e) => {
  preguntaActual += 1;
  if (preguntaActual == preguntasFinal.length) {
    juegoContainer.classList.add("hide");
    puntosContainer.classList.remove("hide");
    startButton.innerText = `RESTART`;
    puntosUsuario.innerHTML = "Tus puntos acumulados son " + puntos;
    clearInterval(cuentaRegresiva);
  } else {
    genTarjeta(preguntasFinal[preguntaActual]);
  }

  guardarPuntos();
};

// Función de orden superior para crear tarjetas de preguntas
const crearTarjeta = (objetoTarjeta, generarOpciones) => {
  const { image, opcion_correcta } = objetoTarjeta;
  let opciones = mezclaAleatoria(generarOpciones(opcion_correcta));
  container.innerHTML = `<div class="quiz">
      <p class="num">${preguntaActual + 1}/5</p>
      <div class="preguntas">
        <img class="pokemon-image" src="${image}"/>
      </div>
      <div class="opciones">
        <button class="opcion" onclick="comprobar(event)">${opciones[0]}</button>
        <button class="opcion" onclick="comprobar(event)">${opciones[1]}</button>
        <button class="opcion" onclick="comprobar(event)">${opciones[2]}</button>
        <button class="opcion" onclick="comprobar(event)">${opciones[3]}</button>
      </div>
      <div class="div-btn-sgte">
        <button class="botonSgte" onclick="siguientePregunta(event)">Next</button>
      </div>
    </div>`;

  contar = 11;
  clearInterval(cuentaRegresiva);
  mostrarTimer();

  // Evento para los botones comprobar y siguiente pregunta
  const opcionButtons = document.querySelectorAll(".opcion");
  opcionButtons.forEach(button => {
    button.addEventListener("click", comprobar);
  });

  const nextButton = document.querySelector(".botonSgte");
  nextButton.addEventListener("click", siguientePregunta);
};

const genTarjeta = (objetoTarjeta) => {
  crearTarjeta(objetoTarjeta, llenarOpciones);
};

// Evento para comenzar
startButton.addEventListener("click", iniciarJuego);

// MENSAJES DE BIENVENIDA
Toastify({
  text: "BIENVENIDO! (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧",
  duration: 3000,
  newWindow: true,
  gravity: "top",
  position: "left",
  stopOnFocus: true, //se mantiene el msj en pantalla haciendo hover
  style: {
    background: "#DA8031",
  },
  onClick: function () { }
}).showToast();

Toastify({
  text: "PRESIONA START PARA COMENZAR",
  duration: 5000,
  newWindow: true,
  close: true,
  gravity: "top",
  position: "left",
  stopOnFocus: true, //se mantiene el msj en pantalla haciendo hover
  style: {
    background: "#E17749",
  },
  onClick: function () { }
}).showToast();