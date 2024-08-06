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

// Funciones para generar opciones aleatorias
export const generadorValorAleatorio = (array) => array[Math.floor(Math.random() * array.length)];
export const mezclaAleatoria = (array) => array.sort(() => 0.5 - Math.random());

// Función para llenar preguntas aleatorias
export const llenarPreguntas = (preguntasFinal) => {
    const preguntasMezcladas = mezclaAleatoria(preguntasFinal);
    return preguntasMezcladas.slice(0, 5);
};