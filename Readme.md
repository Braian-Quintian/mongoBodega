# Consultas de la base de datos de mongoDB para el manejo de bodegas

## Instalación
1. Clona este repositorio en tu máquina local.
2. Asegúrate de tener instalado Node.js
3. Crea un archivo .env
4. Copia las variables de entorno del archivo `.env.example` y pegalas en el archivo `.env` que creaste.

  `Nota`: porfavor llena los campos vacios con la informacion correspondiente.

  `Recuerda que la informacion solitada la debes ingresar entre las "" correspondientes`

  ![.env](/assets/img/configuracion-env.png)
5. Abre una terminal

  ![terminal](/assets/img/terminal.png)

  presiona en neva terminal:

  ![nueva-terminal](/assets/img/nueva-terminal.png)

6. Ejecuta el comando `npm run install` para instalar las dependencias del proyecto

  una vez que haya finalizado la instalacion de las dependencias ejecuta el comando `npm run install-dev` para instalar la dependencia de desarrollo.

  ![npm-run-install](/assets/img/npm-run-install.png)

7. Ejecuta el comando `npx tsc --init` para crear el archivo de configuracion de typescript

  ![tsc-init](/assets/img/tsc-init.png)

  cambia todo el contenido del archivo tsconfig.json por este json:

  ![tsconfig.json](/assets/img/tsconfig.png)

```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "ES6",
    "moduleResolution": "node",
    "outDir": "./src/routes/validation/",
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  },
  "include": [
    "./src/typescript/*.ts"
  ],
  "exclude": [
    "src/routes/validation/*.js"
  ]
}
```

`NOTA`:En caso de tener un error como este:
  ![error](/assets/img/error-env.png)

`SOLUCION`: Simplemente borra los espacios sobrantes.

![solucion](/assets/img/solucion.png)

8. Ejecuta el comando `npm run tsc` para compilar el proyecto y se creará una carpeta llamada controller que contendra la validacion de toda la data.
  ![npm-run-tsc](/assets/img/npm-run-tsc.png)

9. Una vez que finalice de compilar los archivos, termina el proceso precionando Ctrl + C
  ![terminar-proceso](/assets/img/terminar-proceso.png)

10. Ejecuta el comando `npm run dev` para iniciar el servidor

​	 ![npm-install](/assets/img/npm-run-dev.png)

1. ¡Felicitaciones!, ya has iniciado el servidor y la base de datos y puedes proceder a  utilizar los endpoints

2. `NOTA`: Para utilizar los endpoints recuerda que debes tener un token que se genera con el endpoint `/autorizacion` (en la siguienta parte se te muestra como puedes pedir el token y utilizarlo)

## Endpoints

### Observacion: Para hacer los endpoints y generar los token debes tener ThunderClient instalado en visual studio code

- **Autorización**

  `NOTA`: Antes de utilizar cualquier endpoint debes pedir primero un token de autorizacion, se recomienda que lo guardes en un archivo de texto.

  *Obeservacion* el token solamente dura `30m`  después de este tiempo tendrás que pedir otro

  Este es el ejemplo para solicitar un token:
  ![token](/assets/img/pedirToken.png)

  - El `:id` es el id del usuario (por el momento puede ser cualquiera)
  - El `nombre_de_la_collection` es el nombre de la collection en la base de datos

  `NOTA`: No olvides reemplazar el `localhost` por la ip de tu servidor y el `5050` por el puerto que hayas definido en las variables de entorno, u/o que se estes utilizando.

```shell
  http://localhost:5050/autorizacion/:id/:nombre?tabla=nombre_de_la_tabla
```

`SPOILER`: se tiene pensado en el futuro reemplazar `:id` por el id de google al momento de generar el token, pero por el momento se queda así.

- Implementación del Token
    ![generar-token](assets/img/generar-token.png)
- Copia el token, ejemplo:
    - `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqc29uIjp7ImlkIjoiMTIzIiwibm9tYnJlIjoidXNlciIsImVuZHBvaW50Ijp7InRhYmxhIjoicm9sZXMifX0sImlhdCI6MTY5MDQ4MzExNywiZXhwIjoxNjkwNDg2NzE3fQ.2Mk17IBYsAmZi-e19E26E1oyObY43OBjBXK52ME8jvM`

- Luego debe colocar en la pestaña Headers de la siguiente manera:
  
- donde dice `header` escribe `Authorization` y pulsa en el recuadro para que se active el envió del token de autorización, así:

    ![implementacion-token](/assets/img/implementacion-token.png)

- y pega el token que habias copiado previamente:

    ![token-implementado](/assets/img/token-implementado.png)

- Una vez que hayas implementado el token puedes proceder a utilizar los endpoints.

**TENER EN CUENTA:**
  `NOTA`: recuerda que el token solamente dura `30m`  después de este tiempo tendrás que pedir otro
  `NOTA`: El token solo servira para la collection que lo solicitaste, si quieres acceder a otra collection deberas solicitar otro token y repetir el mismo proceso para implementarlo.
  `NOTA`: Si presentas algun error al momento de solicitar el token, revisa que hayas ingresado correctamente los datos, si el error persiste, revisa que la collection que estas solicitando exista en la base de datos.

- **LIMITES DE PETICION DE ENPOINTS**
    
  `NOTA`: Los endpoints tienen un limite de peticiones por minuto, si se excede el limite de peticiones por minuto, el servidor respondera con un error 429, si esto sucede, espera un minuto y vuelve a intentarlo.

- Bodegas

  Se pueden utilizar los siguientes endpoints para la collection `bodegas`

## Router de Bodegas

El router de bodegas maneja las peticiones relacionadas con las bodegas. Proporciona endpoints para obtener información sobre las bodegas y agregar nuevas bodegas al sistema.

### Cómo consumir el router de bodegas

#### Obtener información de las bodegas

- Método: GET
- URL: `http://127.127.127.127:6000/bodegas`

Esta solicitud GET se utiliza para obtener información sobre todas las bodegas registradas en el sistema. Al realizar una solicitud a esta URL, recibirás una respuesta JSON que contiene los datos de las bodegas.

#### Agregar una nueva bodega

- Método: POST
- URL: `http://127.127.127.127:6000/bodegas`

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
