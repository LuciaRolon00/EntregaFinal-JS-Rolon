// Función para guardar puntos en localStorage
export const guardarPuntosEnLS = (puntos) => {
    localStorage.setItem('puntosUsuario', puntos.toString());
};

// Función para obtener puntos desde localStorage
export const obtenerPuntosDesdeLS = () => {
    const puntosGuardados = localStorage.getItem('puntosUsuario');
    return puntosGuardados ? parseInt(puntosGuardados) : 0;
};

// Guardar puntos
export const guardarPuntos = () => {
    guardarPuntosEnLS(puntos);
    puntosUsuario.innerHTML = `Tus puntos acumulados son ${puntos}!`;
};