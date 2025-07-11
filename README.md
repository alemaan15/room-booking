# 🏨 Backend del Gestor de Reservas de Hoteles

Este proyecto es un backend RESTful desarrollado con **NestJS + MongoDB** para gestionar usuarios, habitaciones y reservas de forma centralizada, usando autenticación JWT.

---

## 🧱 Arquitectura

- **NestJS + MongoDB** (Monolito)
  - Autenticación de usuarios con JWT
  - Control de roles (`admin`, `user`)
  - CRUD de usuarios, habitaciones y reservas
  - Validación de disponibilidad de habitaciones
  - Gestión centralizada de lógica y datos

---

## ⚒️ Tecnologías Utilizadas

- **Backend**: Node.js, NestJS, TypeScript
- **Base de datos**: MongoDB (Mongoose ODM)
- **Autenticación**: JSON Web Tokens (JWT)
- **Docker**: Para desarrollo local de MongoDB
- **Validación de datos**: class-validator + DTOs
- **Gestión de entorno**: ConfigModule (env variables por entorno)

---

## ✅ Requisitos Previos

Antes de ejecutar la aplicación, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (v18 o superior)
- [Docker](https://www.docker.com/) → Para correr MongoDB localmente (opcional)
- [MongoDB Compass](https://www.mongodb.com/try/download/compass) (opcional, GUI visual)

---

## 🐳 Comando para levantar MongoDB con Docker

```bash
docker run --name mongo-container -d -p 27017:27017 mongo:latest
```


## 🚀 Endpoints principales



### **🔐 Autentificacion**

| Método  | Ruta            | Descripción                        |
|:-------:|:--------------:|:----------------------------------:|
| **POST**   | `/auth/register` | Registro de usuario              |
| **POST**   | `/auth/login`    | Inicio de sesión (JWT)           |


### 👤 Usuarios

| Método  | Ruta                 | Descripción                  |
|:-------:|:--------------:|:----------------------------------:|
| **GET**   | `/users`           |   Obtener todos los usuarios|
| **GET**   | `/users/:id`     | Obtener un usuario por ID       |
| **PUT**   | `/users/:id`     | Actualizar un usuario por ID       |
| **DELETE**   | `/users/:id`     | Eliminar un usuario por ID       |

### **🏨 Gestión de Habitaciones y Reservas**

| Método  | Ruta               | Descripción                                |
|:-------:|:------------------:|:-----------------------------------------:|
| **GET**    | `/rooms`             | Listar todas las habitaciones           |
| **POST**   | `/rooms`             | Crear una nueva habitación              |
| **GET**    | `/rooms/:id`         | Obtener detalles de una habitación      |
| **PUT**    | `/rooms/:id`         | Actualizar información de una habitación |
| **DELETE** | `/rooms/:id`         | Eliminar una habitación                 |

### **📅 Reservas**

| **POST**   | `/reservations`      | Crear una nueva reserva                 |
| **GET**    | `/reservations`      | Listar todas las reservas               |
| **GET**    | `/reservations/:id`  | Obtener detalles de una reserva         |
| **PUT**    | `/reservations/:id`  | Modificar una reserva                   |
| **DELETE** | `/reservations/:id`  | Cancelar una reserva                    |


### 📌 **Diagrama de Arquitectura**  

```mermaid
graph TD;
    Usuario["🧑 Usuario"] -->|Login/Register| AuthController["🔐 AuthController"];
    AuthController -->|JWT Token| Usuario;

    Usuario -->|Accede con token| RoomController["🏨 Rooms"];
    Usuario -->|Reserva habitaciones| ReservationController["📅 Reservations"];
