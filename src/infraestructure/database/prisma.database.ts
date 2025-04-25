import { envConfig } from '../config/main.config';

export class Prisma {
  appointment = {
    create: async ({ data }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return data;
    },
  };

  async $connect() {
    console.log(`Conexión a ${envConfig.DB_URL}`);
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log('¡Conexión exitosa!');
  }

  async $disconnect() {
    await new Promise((resolve) => setTimeout(resolve, 300));
    console.log('¡Desconexión exitosa!');
  }
}
