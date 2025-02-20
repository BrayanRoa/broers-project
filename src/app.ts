import { Server } from "./presentation/server";

const server = new Server();
const app = server.app; // Exporta la instancia de Express para los tests

export { app, server };
