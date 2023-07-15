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

Esta es la estructura del proyecto.
 
ROUTES Y ENDPOINTS
# Router de Bodegas

El router de bodegas es una parte del sistema que se encarga de manejar las peticiones relacionadas con las bodegas. Proporciona endpoints para obtener información sobre las bodegas y agregar nuevas bodegas al sistema.

## Cómo consumir el router de bodegas

### Obtener información de las bodegas

- **Método:** GET
- **URL:** `http://127.127.127.127:6000/bodegas`

Esta solicitud GET se utiliza para obtener información sobre todas las bodegas registradas en el sistema. Al realizar una solicitud a esta URL, recibirás una respuesta JSON que contiene los datos de las bodegas.

### Agregar una nueva bodega

- **Método:** POST
- **URL:** `http://127.127.127.127:6000/bodegas`

Para agregar una nueva bodega al sistema, realiza una solicitud POST a la URL mencionada. En el cuerpo de la solicitud, proporciona los datos de la nueva bodega en formato JSON. La solicitud debe incluir los siguientes campos:

```json
{
  "nombre": "Nombre de la bodega",
  "id_responsable": "ID del responsable de la bodega",
  "estado": "Estado de la bodega",
  "created_by": "ID del usuario que crea la bodega",
  "update_by": "ID del usuario que actualiza la bodega"
}
```
# Router de Productos

El router de productos es una parte del sistema que se encarga de manejar las peticiones relacionadas con los productos. Proporciona endpoints para obtener información sobre los productos, obtener el total de productos y agregar nuevos productos al sistema.

## Cómo consumir el router de productos

### Obtener información de los productos

- **Método:** GET
- **URL:** `http://127.127.127.127:6000/productos`

Esta solicitud GET se utiliza para obtener información sobre todos los productos registrados en el sistema. Al realizar una solicitud a esta URL, recibirás una respuesta JSON que contiene los datos de los productos.

### Obtener el total de productos

- **Método:** GET
- **URL:** `http://127.127.127.127:6000/productos/total`

Esta solicitud GET se utiliza para obtener el total de productos en el sistema. Al realizar una solicitud a esta URL, recibirás una respuesta JSON que contiene los datos de los productos junto con su cantidad total.

### Agregar un nuevo producto

- **Método:** POST
- **URL:** `http://127.127.127.127:6000/productos`

Para agregar un nuevo producto al sistema, realiza una solicitud POST a la URL mencionada. En el cuerpo de la solicitud, proporciona los datos del nuevo producto en formato JSON. La solicitud debe incluir los siguientes campos:

```json
{
  "nombre": "Nombre del producto",
  "descripcion": "Descripción del producto",
  "estado": "Estado del producto",
  "creador": "ID del usuario que crea el producto",
  "actualizador": "ID del usuario que actualiza el producto"
}
```
# Router de Inventarios

El router de inventarios maneja las peticiones relacionadas con los inventarios de productos en el sistema. Proporciona un endpoint para agregar o actualizar inventarios.

## Cómo consumir el router de inventarios

### Agregar o actualizar un inventario

- **Método:** POST
- **URL:** `http://127.127.127.127:6000/inventarios`

Para agregar o actualizar un inventario, realiza una solicitud POST a la URL mencionada. En el cuerpo de la solicitud, proporciona los datos del inventario en formato JSON. La solicitud debe incluir los siguientes campos:

```json
{
  "id_producto": "ID del producto",
  "id_bodega": "ID de la bodega",
  "cantidad": "Cantidad del producto en el inventario"
}
```
El router de inventarios verificará si la combinación de id_producto e id_bodega ya existe en la tabla de inventarios. Si la combinación ya existe, se actualizará la cantidad sumando la cantidad existente con la cantidad nueva. Si es una combinación totalmente nueva, se creará un nuevo registro de inventario con los datos proporcionados.

En caso de éxito, recibirás una respuesta JSON con el mensaje "Inventario actualizado exitosamente" si se actualiza un inventario existente, o "Inventario creado exitosamente" si se crea un nuevo inventario.

# Router de Traslados

El router de traslados maneja las peticiones relacionadas con el traslado de productos entre bodegas en el sistema. Proporciona un endpoint para realizar traslados de productos.

## Cómo consumir el router de traslados

### Realizar un traslado de producto

- **Método:** POST
- **URL:** `http://127.127.127.127:6000/traslados`

Para realizar un traslado de producto, realiza una solicitud POST a la URL mencionada. En el cuerpo de la solicitud, proporciona los datos del traslado en formato JSON. La solicitud debe incluir los siguientes campos:

```json
{
  "id": "ID del producto",
  "cant": "Cantidad a trasladar",
  "origen": "ID de la bodega de origen",
  "destino": "ID de la bodega de destino",
  "id_usuario": "ID del usuario que realiza el traslado"
}
