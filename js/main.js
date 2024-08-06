// IMPORTS
import { opcionesArray, generadorValorAleatorio, mezclaAleatoria, llenarPreguntas } from "./preguntas.js";
import { guardarPuntosEnLS, obtenerPuntosDesdeLS, guardarPuntos } from "./puntos.js";
import { obtenerDatosPokemon, mostrarInfoPokemon } from "./pokeapi.js";

// Selección de elementos del DOM
const container = document.querySelector(".container");
const juegoContainer = document.querySelector(".juego-container");
const startButton = document.getElementById("start");
const puntosContainer = document.querySelector(".puntos-container");
const puntosUsuario = document.getElementById("puntos-usuario");

// Declaración de variables 
let timer = document.getElementsByClassName("timer")[0];
let botonSgte;
let puntos = 0;
let preguntaActual;
let cuentaRegresiva, contar = 11;
let preguntasFinal = [];

// Función para cargar preguntas desde un archivo JSON
const cargarPreguntasDesdeJSON = async () => {
  try {
    const response = await fetch("db/pokemon.json");
    if (!response.ok) {
      throw new Error("Error al cargar el JSON: ${response.statusText}");
    }
    const data = await response.json();
    preguntasFinal = llenarPreguntas(data.pokemons);
  } catch (error) {
    console.error("Error cargando el JSON:", error);
  }
};

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
  if (!preguntasFinal || preguntasFinal.length === 0) {
    console.error("No se cargaron preguntas");
    return;
  }

  puntosContainer.classList.add("hide");
  juegoContainer.classList.remove("hide");

  puntos = obtenerPuntosDesdeLS(); // Recupera puntos desde Local Storage
  preguntaActual = 0;
  genTarjeta(preguntasFinal[preguntaActual]);

  guardarPuntos();
};

// Comprobar respuesta seleccionada
const comprobar = async (e) => {
  let solucionUsuario = e.target.innerText;
  let opciones = document.querySelectorAll(".opcion");
  let opcionCorrecta = preguntasFinal[preguntaActual].opcion_correcta;
  if (solucionUsuario === opcionCorrecta) {
      e.target.classList.add("correcto");
      puntos++;
      const datosPokemon = await obtenerDatosPokemon(opcionCorrecta);
      if (datosPokemon) {
          mostrarInfoPokemon(datosPokemon);
      }
  } else {
      e.target.classList.add("incorrecto");
      opciones.forEach((element) => {
          if (element.innerText == opcionCorrecta) {
              element.classList.add("correcto");
          }
      });
  }

  clearInterval(cuentaRegresiva);
  // Deshabilitar todas las opciones
  opciones.forEach((element) => {
      element.disabled = true;
  });

  guardarPuntos(puntos, puntosUsuario);
};

// Siguiente pregunta
const siguientePregunta = (e) => {
  preguntaActual += 1;
  // Oculta la info del Pokémon
  const infoContainer = document.querySelector(".info-container");
  if (infoContainer) {
      infoContainer.innerHTML = "";
  }
  if (preguntaActual == preguntasFinal.length) {
      juegoContainer.classList.add("hide");
      puntosContainer.classList.remove("hide");
      startButton.innerText = `RESTART`;
      puntosUsuario.innerHTML = "Tus puntos acumulados son " + puntos;
      clearInterval(cuentaRegresiva);
  } else {
      genTarjeta(preguntasFinal[preguntaActual]);
  }

  guardarPuntos(puntos, puntosUsuario);
};

// Función de orden superior para crear tarjetas de preguntas
const crearTarjeta = (objetoTarjeta, generarOpciones) => {
  const { image, opcion_correcta } = objetoTarjeta;
  let opciones = mezclaAleatoria(generarOpciones(opcion_correcta));
  
  // Oculta la info del Pokémon
  const infoContainer = document.querySelector(".info-container");
  if (infoContainer) {
    infoContainer.innerHTML = "";
  }
  
  container.innerHTML = `<div class="quiz">
        <p class="num">${preguntaActual + 1}/5</p>
        <div class="preguntas">
            <img class="pokemon-image" src="${image}"/>
        </div>
        <div class="opciones">
            <button class="opcion">${opciones[0]}</button>
            <button class="opcion">${opciones[1]}</button>
            <button class="opcion">${opciones[2]}</button>
            <button class="opcion">${opciones[3]}</button>
        </div>
        <div class="div-btn-sgte">
            <button class="botonSgte">Next</button>
        </div>
    </div>`;

  contar = 11;
  clearInterval(cuentaRegresiva);
  mostrarTimer();

  // Eventos a los botones de opciones
  const opcionButtons = document.querySelectorAll(".opcion");
  opcionButtons.forEach(button => {
    button.addEventListener("click", comprobar);
  });

  // Eventos a los botones de siguiente
  const nextButton = document.querySelector(".botonSgte");
  nextButton.addEventListener("click", siguientePregunta);
};

const genTarjeta = (objetoTarjeta) => {
  crearTarjeta(objetoTarjeta, llenarOpciones);
};

// Cargar preguntas desde el JSON
cargarPreguntasDesdeJSON().then(() => {
  // Evento para comenzar
  startButton.addEventListener("click", iniciarJuego);
});

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