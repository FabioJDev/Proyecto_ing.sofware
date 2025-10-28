# Camaleon Bodega – Sistema de gestión de stock

Este proyecto proporciona un sistema básico de gestión de inventario para una bodega o pequeño comercio.  Incluye un backend en Java (Spring Boot) y un frontend en React.  La base de datos se modela en MySQL y se entrega un script independiente (`base_datos.sql`) para crear todas las tablas y cargar datos de ejemplo.

## Contenido del repositorio

La estructura de carpetas del archivo ZIP queda de la siguiente manera:

- `backend/` – código fuente del API REST en Java (Spring Boot).
- `frontend/` – código fuente de la aplicación web en React.
- `base_datos.sql` – script SQL para crear las tablas y datos de ejemplo en MySQL.
- `README.md` – este documento, con instrucciones de instalación y uso.

## Requisitos

- **Java 17** o superior y Maven 3.8+ para compilar y ejecutar el backend.
- **Node.js 18** o superior y npm para instalar las dependencias y ejecutar el frontend.
- **MySQL 8** para la base de datos (u otra versión compatible con los scripts SQL proporcionados).

## Instalación de la base de datos

1. Cree una nueva base de datos en MySQL, por ejemplo `camaleon_db`.
2. Ejecute el script `base_datos.sql` sobre la base recién creada.  Esto creará las tablas (`usuarios`, `proveedores`, `productos`, `ventas`, `pagos`, `alertas`) y cargará algunos datos de ejemplo.
3. Configure las credenciales de la base de datos en el archivo `backend/src/main/resources/application.properties` antes de ejecutar el backend.

## Compilación y ejecución del backend

```sh
cd backend
mvn clean package
mvn spring-boot:run
```

El backend arrancará en `http://localhost:8080` y expondrá distintos endpoints bajo el prefijo `/api` (véase más abajo).  La capa de persistencia utiliza Spring Data JPA y se conecta a MySQL mediante las propiedades definidas en `application.properties`.  La aplicación no implementa autenticación; todos los endpoints están abiertos para simplificar la puesta en marcha.

### Endpoints principales

| Recurso            | Método HTTP | Ruta                    | Descripción                                                                 |
|--------------------|-------------|-------------------------|------------------------------------------------------------------------------|
| Productos          | `GET`       | `/api/productos`        | Lista todos los productos.                                                   |
|                    | `GET`       | `/api/productos/{id}`    | Obtiene un producto por id.                                                  |
|                    | `POST`      | `/api/productos`        | Crea un nuevo producto.                                                      |
|                    | `PUT`       | `/api/productos/{id}`    | Actualiza un producto existente.                                             |
|                    | `DELETE`    | `/api/productos/{id}`    | Elimina un producto.                                                         |
| Proveedores        | `GET`       | `/api/proveedores`      | Lista todos los proveedores.                                                 |
|                    | `POST`      | `/api/proveedores`      | Crea un proveedor nuevo.                                                     |
| Ventas             | `GET`       | `/api/ventas`           | Lista todas las ventas.                                                      |
|                    | `POST`      | `/api/ventas`           | Registra una venta.                                                          |
| Pagos              | `GET`       | `/api/pagos`            | Lista todos los pagos de ventas.                                             |
|                    | `POST`      | `/api/pagos`            | Registra un pago asociado a una venta.                                       |
| Alertas            | `GET`       | `/api/alertas`          | Obtiene las alertas de bajo stock generadas automáticamente.                 |

Al registrar o modificar productos, el backend evalúa si la cantidad existente es menor al umbral definido en cada producto (`stockThreshold`) y, en ese caso, crea una alerta en la tabla `alertas`.

## Instalación y ejecución del frontend

```sh
cd frontend
npm install
npm start
```

La aplicación se abrirá en `http://localhost:3000`.  El frontend ofrece distintos módulos para vendedores, cajeros, administradores y proveedores.  No hay autenticación; simplemente haga clic en el módulo deseado desde la pantalla principal.

### Módulos principales

- **Vendedor:** muestra el listado de productos y permite registrar ventas.  Cuando se selecciona un producto para la venta, se registra una salida del inventario y se actualiza el stock.
- **Cajero:** permite registrar pagos asociados a ventas ya realizadas.
- **Administrador:** brinda acceso a la gestión de productos y proveedores, así como a reportes básicos de inventario y ventas.
- **Proveedor:** muestra las solicitudes de abastecimiento generadas automáticamente cuando el stock es bajo.  Los proveedores pueden registrar que un pedido fue atendido (esto incrementa el stock del producto correspondiente).
- **Notificaciones:** una sección separada muestra alertas de bajo stock generadas por el backend.

## Estilos y accesibilidad

La aplicación utiliza una paleta de colores claros y legibles para garantizar una buena experiencia de usuario.  Todos los formularios validan datos de manera básica desde el frontend (por ejemplo, campos obligatorios y números positivos).  La interfaz ha sido concebida para ser intuitiva y navegable incluso para usuarios con poca experiencia técnica.

## Notas

- Este proyecto es una implementación de referencia con propósito educativo.  De acuerdo con los requisitos proporcionados, **no** se implementa autenticación ni autorización real; los roles se simulan únicamente a nivel de interfaz.
- Para desplegar en un entorno de producción se recomienda añadir un sistema de seguridad (Spring Security / JWT), manejo más robusto de errores, validaciones exhaustivas y pruebas automatizadas.
- El script SQL (`base_datos.sql`) contiene claves foráneas que garantizan la integridad referencial entre las tablas.