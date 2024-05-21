const mysql = require('mysql');

// Configuración de la conexión a la base de datos MySQL
const dbConfig = {
  host: 'localhost', // Cambia esto por la dirección de tu servidor MySQL
  user: 'tu_usuario', // Cambia esto por tu nombre de usuario de MySQL
  password: 'tu_contraseña', // Cambia esto por tu contraseña de MySQL
  database: 'nombre_de_tu_base_de_datos' // Cambia esto por el nombre de tu base de datos
};

// Crea la conexión a la base de datos MySQL
const pool = mysql.createPool(dbConfig);

// Manejo de errores de conexión
pool.on('error', err => {
  console.error('Error de conexión a la base de datos:', err);
});

// Exporta el pool de conexiones para que pueda ser utilizado en otros archivos
module.exports = pool;
