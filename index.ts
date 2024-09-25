import http from "http"; // Importa el módulo HTTP para crear el servidor.
import fs from "fs"; // Importa el módulo del sistema de archivos para leer archivos.

const userText = (request: http.IncomingMessage, response: http.ServerResponse) => {
  // Devuelve un texto plano como respuesta.
  response.writeHead(200, { "content-type": "text/plain" });
  response.write("Prueba de usuarios");
  response.end();
};

const userHtml = (request: http.IncomingMessage, response: http.ServerResponse) => {
  // Devuelve un contenido HTML como respuesta.
  response.writeHead(200, { "content-type": "text/html" });
  response.write("<h1>Hola H1</h1>");
  response.end();
};

const userPdf = (request: http.IncomingMessage, response: http.ServerResponse) => {
  // Devuelve un archivo PDF leído del sistema de archivos.
  const file = fs.readFileSync(__dirname + "/public/pdf.pdf");
  response.writeHead(200, { "content-type": "application/pdf" });
  response.write(file);
  response.end();
};

const userJson = (request: http.IncomingMessage, response: http.ServerResponse) => {
  // Devuelve un objeto JSON como respuesta.
  response.writeHead(200, { "content-type": "application/json" });
  response.write("{msg: 'hola mundo'}");
  response.end();
};

const notfound = (request: http.IncomingMessage, response: http.ServerResponse) => {
  // Devuelve un mensaje de "not found" cuando la ruta no existe.
  response.writeHead(200, { "content-type": "text/plain" });
  response.write("Not Found");
  response.end();
};

// Define las rutas con sus métodos HTTP y callbacks.
interface Path {
  url: string;
  method: string;
  callback: (request: http.IncomingMessage, response: http.ServerResponse) => void;
}

// Array que mapea las rutas a sus callbacks.
const paths: Array<Path> = [
  { url: "/user/text", method: "GET", callback: userText },
  { url: "/user/html", method: "GET", callback: userHtml },
  { url: "/user/pdf", method: "GET", callback: userPdf },
  { url: "/user/json", method: "GET", callback: userJson },
  { url: "/*", method: "GET", callback: notfound }, // Ruta por defecto para 404.
];

// Crea el servidor HTTP y maneja las solicitudes según las rutas definidas.
const server = http.createServer((request, response) => {
  const path = paths.find((obj) => obj.url === request.url && obj.method === request.method);
  if (path) path.callback(request, response); // Ejecuta el callback correspondiente.
});

server.listen(3009, () => {
  console.log("Server running on port 3009");
});
