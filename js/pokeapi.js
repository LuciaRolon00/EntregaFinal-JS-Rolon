// API para obtener info de los Pokémon
// Una vez seleccionada la opción correcta figura la imagen del Pokémon y el tipo correspondiente

export const obtenerDatosPokemon = async (nombrePokemon) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${nombrePokemon.toLowerCase()}/`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error en la API');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener datos del Pokémon:', error);
        return null;
    }
};

export const mostrarInfoPokemon = (datosPokemon) => {
    const infoContainer = document.querySelector(".info-container");

    if (!infoContainer) {
        console.error("Información del Pokémon no encontrada.");
        return;
    }

    const { name, sprites, types } = datosPokemon;

    infoContainer.innerHTML = `
      <h2>${name.charAt(0).toUpperCase() + name.slice(1)}</h2>
      <img src="${sprites.front_default}" alt="${name}">
      <p>Tipo(s): ${types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
    `;
};