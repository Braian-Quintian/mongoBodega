## Estructura del proyecto

El proyecto se organiza de la siguiente manera:
- `server`
  - `server.js`: Este archivo contiene el código para que el servidor se ejecute.
    - Toma las variables de entorno (.env) desde la carpeta `src/connection/credentials.js`.
    - Utiliza el hostname y el puerto para inicializar el servidor.

- `app.js`: Este archivo se encarga de gestionar todos los routes. Es el archivo principal cuando el servidor ya está en ejecución.
  - Toma los routes desde la carpeta `src/routes`.

- `src`
  - `connection`: Esta carpeta contiene dos archivos que contienen las respectivas configuraciones de conexión:
    - `connection.js`: Este archivo contiene el código para establecer la conexión con la base de datos.
    - `credentials.js`: Este archivo obtiene las variables de entorno (.env) y las ajusta para que tanto el archivo `connection.js` como `server.js` puedan utilizarlas.

  - `routes`: Esta carpeta contiene los archivos que manejan las peticiones a la base de datos. Hay 4 archivos en total:
    - `bodegas.routes.js`
    - `inventarios.routes.js`
    - `productos.routes.js`
    - `trasladar.routes.js`

  - `middleware`: Esta carpeta contiene archivos con validaciones necesarias de la información enviada a través del router.

  - `db`: Esta carpeta contiene 2 archivos:
    - `dataConnection.sql`: Contiene el código para crear la base de datos y las tablas.
    - `data.sql`: Contiene el código para insertar información en las tablas.

Esta es la estructura del proyecto. Asegúrate de seguir este esquema para que el servidor y las rutas funcionen correctamente.


ejemplo para enviar la data en bodega:
{
  "nombre" : 1,
  "id_responsable" : 11,
  "estado" : 1,
  "created_by": 1,
  "update_by": 1
}

Peticion para bodegas:
METHOD: GET, url: http://127.127.127.127:6000/bodegas
Pedicion para añadir una bodega:
METHOD: POST, url:http://127.127.127.127:6000/bodegas
Peticion para consultar todos los productos por el nombre:
http://127.127.127.127:6000/productos
Peticion para consultar todos los productos por el total:
http://127.127.127.127:6000/productos/total