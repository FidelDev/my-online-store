//---archivo para test 
const bcrypt = require('bcrypt');

const testPassword = "F1234"; // Contraseña que quieres verificar
const storedHash = "$2b$10$NkSEmeN6QX75BN9R9UQ/uuw8jQNqs4l7z07o/tHcw.Vr7LzSKIjN6"; // Hash recuperado de la base de datos

(async () => {
    try {
        const isValid = await bcrypt.compare(testPassword, storedHash);
        console.log("¿La contraseña es válida?", isValid); // Debe imprimir true o false
    } catch (error) {
        console.error("Error al comparar las contraseñas:", error);
    }
})();

//esto valida lo que se genera manualmente
/* const bcrypt = require('bcrypt');

const password = "F1234";

(async () => {
    const hash = await bcrypt.hash(password, 10);
    console.log("Hash generado manualmente:", hash);
})(); */
