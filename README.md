# Backend de Gestor de Reservas de Hoteles

## ✨ Arquitectura

 - **Microservicio de Autenticación** (Java + Spring Boot + PostgreSQL)

   - Manejo de usuarios y autenticación con JWT

   - Control de roles: Administrador, Cliente, Staff

   - Validación de credenciales y seguridad

 - **Microservicio de Habitaciones y Reservas** (NestJS + MongoDB)

   - CRUD de hoteles y habitaciones

   - Gestor de reservas con validación de disponibilidad

   - Sincronización de estados de habitaciones

## ⚒️ Tecnologías Utilizadas

 - Backend Autenticación: Java, Spring Boot, Spring Security, PostgreSQL

 - Backend Habitaciones: Node.js, NestJS, MongoDB, Mongoose

 - Autenticación: JWT (JSON Web Tokens)

 - Comunicación: REST API, HTTP Requests

 - Docker: Para despliegue y gestión de servicios

## ✅ Requisitos Previos

Antes de ejecutar la aplicación, asegúrate de tener instalado:

- **Node.js** (v18 o superior) → Para ejecutar el microservicio de reservas
- **MongoDB** (v6 o superior) → Para la base de datos de reservas
- **Java** (v17 o superior) → Para el microservicio de autenticación
- **PostgreSQL** (v14 o superior) → Para la base de datos de autenticación
- **Docker** (Opcional) → Para ejecutar los servicios en contenedores


## 🚀 Endpoints principales

### **🔐 Autentificacion** (Spring Boot)

| Método  | Ruta            | Descripción                        |
|:-------:|:--------------:|:----------------------------------:|
| **POST**   | `/auth/register` | Registro de usuario              |
| **POST**   | `/auth/login`    | Inicio de sesión (JWT)           |
| **GET**    | `/users/profile` | Obtener perfil de usuario        |
| **PUT**    | `/users/update`  | Actualizar información del usuario |
| **DELETE** | `/users/delete`  | Eliminar cuenta de usuario       |

### **🏨 Gestión de Habitaciones y Reservas**  (NestJS)

| Método  | Ruta               | Descripción                                |
|:-------:|:------------------:|:-----------------------------------------:|
| **GET**    | `/rooms`             | Listar todas las habitaciones           |
| **POST**   | `/rooms`             | Crear una nueva habitación              |
| **GET**    | `/rooms/:id`         | Obtener detalles de una habitación      |
| **PUT**    | `/rooms/:id`         | Actualizar información de una habitación |
| **DELETE** | `/rooms/:id`         | Eliminar una habitación                 |
| **POST**   | `/reservations`      | Crear una nueva reserva                 |
| **GET**    | `/reservations`      | Listar todas las reservas               |
| **GET**    | `/reservations/:id`  | Obtener detalles de una reserva         |
| **PUT**    | `/reservations/:id`  | Modificar una reserva                   |
| **DELETE** | `/reservations/:id`  | Cancelar una reserva                    |


### 📌 **Diagrama de Arquitectura**  

```mermaid
graph TD;
    User["🧑 Usuario"] -->|Solicita autenticación| AuthService["🔐 Auth Service (Spring Boot + PostgreSQL)"];
    AuthService -->|Devuelve JWT| User;
    
    User -->|Realiza operaciones de reserva| RoomService["🏨 Room Service (NestJS + MongoDB)"];
    
    RoomService -->|Solicita validación de usuario| AuthService;
    RoomService -->|Guarda información de reservas| MongoDB["🗄️ MongoDB"];
    
    AuthService -->|Guarda usuarios y credenciales| PostgreSQL["🗄️ PostgreSQL"];
