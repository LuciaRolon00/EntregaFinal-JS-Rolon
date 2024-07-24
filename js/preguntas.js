// PREGUNTAS e IMAGENES
export const preguntas = [
    {
        image: "img/alakazam.jpg",
        opcion_correcta: "Alakazam",
    },
    {
        image: "img/arcanine.jpg",
        opcion_correcta: "Arcanine",
    },
    {
        image: "img/bulbasaur.png",
        opcion_correcta: "Bulbasaur",
    },
    {
        image: "img/cubone.jpg",
        opcion_correcta: "Cubone",
    },
    {
        image: "img/ditto.jpg",
        opcion_correcta: "Ditto",
    },
    {
        image: "img/gloom.png",
        opcion_correcta: "Gloom",
    },
    {
        image: "img/gyarados.jpg",
        opcion_correcta: "Gyarados",
    },
    {
        image: "img/hitmonlee.jpg",
        opcion_correcta: "Hitmonlee",
    },
    {
        image: "img/horsea.jpg",
        opcion_correcta: "Horsea",
    },
    {
        image: "img/koffing.jpg",
        opcion_correcta: "Koffing",
    },
    {
        image: "img/mewtwo.jpg",
        opcion_correcta: "Mewtwo",
    },
    {
        image: "img/pikachu.jpg",
        opcion_correcta: "Pikachu",
    },
    {
        image: "img/seaking.jpg",
        opcion_correcta: "Seaking",
    },
    {
        image: "img/tauros.jpg",
        opcion_correcta: "Tauros",
    },
    {
        image: "img/venonat.jpg",
        opcion_correcta: "Venonat",
    },
    {
        image: "img/victreebel.jpg",
        opcion_correcta: "Victreebel",
    },
    {
        image: "img/eevee.png",
        opcion_correcta: "Eevee",
    },
    {
        image: "img/charmander.jpg",
        opcion_correcta: "Charmander",
    },
    {
        image: "img/charizard.png",
        opcion_correcta: "Charizard",
    },
    {
        image: "img/butterfree.png",
        opcion_correcta: "Butterfree",
    },
    {
        image: "img/metapod.jpg",
        opcion_correcta: "Metapod",
    },
    {
        image: "img/caterpie.png",
        opcion_correcta: "Caterpie",
    },
    {
        image: "img/weedle.jpg",
        opcion_correcta: "Weedle",
    },
    {
        image: "img/squirtle.jpg",
        opcion_correcta: "Squirtle",
    },
];

// OPCIONES 
export const opcionesArray = [
    "Alakazam",
    "Arcanine",
    "Bulbasaur",
    "Cubone",
    "Ditto",
    "Gloom",
    "Gyarados",
    "Hitmonlee",
    "Horsea",
    "Koffing",
    "Mewtwo",
    "Pikachu",
    "Seaking",
    "Tauros",
    "Venonat",
    "Victreebel",
    "Eevee",
    "Ivysaur",
    "Venusaur",
    "Charmander",
    "Charmeleon",
    "Charizard",
    "Squirtle",
    "Wartortle",
    "Blastoise",
    "Caterpie",
    "Metapod",
    "Butterfree",
    "Weedle",
    "Kakuna",
    "Beedrill",
    "Pidgey",
    "Pidgeotto",
    "Pidgeot",
    "Rattata",
    "Raticate",
    "Spearow",
    "Fearow",
    "Ekans",
    "Arbok",
];

// Opciones aleatorias del array
export const generadorValorAleatorio = (array) => array[Math.floor(Math.random() * array.length)];
export const mezclaAleatoria = (array) => array.sort(() => 0.5 - Math.random());

// Preguntas Aleatorias
export const llenarPreguntas = () => {
    let preguntasCuenta = 0;
    let objetosElegidos = [];
    let lotePreguntas = [];
    //5 preguntas
    while (preguntasCuenta < 5) {
        let valorAleatorio = generadorValorAleatorio(preguntas);
        let index = preguntas.indexOf(valorAleatorio);
        if (!objetosElegidos.includes(index)) {
            lotePreguntas.push(valorAleatorio);
            objetosElegidos.push(index);
            preguntasCuenta += 1;
        }
    }
    return lotePreguntas;
};