import mongoose from 'mongoose';

const database = async () => {
  try {
    await mongoose.connect(process.env.DB_URL + process.env.DB_NAME);
    console.log('Conexión a MongoDB establecida');

    // Añadir manejadores de eventos
    mongoose.connection.on('connected', () => {
      console.log('Mongoose conectado a la base de datos: ' + process.env.DB_NAME);
    });

    mongoose.connection.on('error', (err) => {
      console.error(`Error de conexión de Mongoose: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose desconectado de la base de datos');
    });

    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('Conexión de Mongoose cerrada debido a la terminación de la aplicación');
      process.exit(0);
    });
  } catch (error) {
    console.error('Error al conectar con MongoDB:', error.message);
    process.exit(1);
  }
};

export default database;