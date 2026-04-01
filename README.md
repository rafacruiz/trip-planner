# TripPlanner

TripPlanner es una aplicación web para planificar viajes y organizar todo lo relacionado con ellos en un solo lugar. Permite a los usuarios crear viajes, guardar lugares que desean visitar y gestionar actividades o tareas asociadas a cada viaje.

La aplicación está pensada como una herramienta sencilla de organización personal para viajeros. Cada usuario puede crear múltiples viajes, añadir lugares dentro de cada viaje y mantener una lista de actividades o checklist para planificar mejor su experiencia.

Invitar a otros usuarios registrados a un viaje y crear viajes sorpresa, donde el destino permanece oculto hasta una fecha y hora específicas.

Url: https://trip-planner-project.fly.dev

## Tecnologías Utilizadas

### Backend (API)
- **Node.js** con **Express.js** para el servidor
- **MongoDB** con **Mongoose** para la base de datos
- **bcrypt** para encriptación de contraseñas
- **Cloudinary** para gestión de imágenes
- **Multer** para subida de archivos
- **Morgan** para logging
- **JWT/Cookies** para autenticación de sesiones

### Frontend (Web)
- **React** con **Vite** para el bundler
- **TailwindCSS** para estilos
- **Axios** para llamadas a la API
- **React Router** para navegación
- **React Hook Form** para formularios
- **React Leaflet** para mapas
- **React Confetti** para animaciones

### Herramientas Adicionales
- **Postman** para testing de API (colección incluida: `TripPlannerAPI.postman_collection.json`)
- **ESLint** para linting
- **Faker.js** para seeding de datos

## Instalación y Configuración

### Prerrequisitos
- Node.js (versión 18 o superior)
- MongoDB (local o en la nube, ej. MongoDB Atlas)
- Cuenta en Cloudinary (para gestión de imágenes)

### Instalación

1. Clona el repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd trip-planner
   ```

2. Instala dependencias del backend:
   ```bash
   cd api
   npm install
   ```

3. Instala dependencias del frontend:
   ```bash
   cd ../web
   npm install
   ```

4. Configura las variables de entorno:
   Crea un archivo `.env` en la carpeta `api` con:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/trip-planner
   SECRET_KEY=tu-clave-secreta
   CLOUDINARY_CLOUD_NAME=tu-cloud-name
   CLOUDINARY_API_KEY=tu-api-key
   CLOUDINARY_API_SECRET=tu-api-secret
   ```

5. Inicia MongoDB localmente o configura la URI para una base de datos en la nube.

### Ejecución

1. Ejecuta el backend:
   ```bash
   cd api
   npm run dev
   ```
   El servidor estará disponible en `http://localhost:3000`

2. Ejecuta el frontend:
   ```bash
   cd web
   npm run dev
   ```
   La aplicación estará disponible en `http://localhost:5173`

### Seeding de Datos
Para poblar la base de datos con datos de ejemplo:
```bash
cd api
npm run seed  # Para usuarios y países
npm run seedT # Para viajes de ejemplo
```

## Uso

- Regístrate o inicia sesión en la aplicación.
- Crea un nuevo viaje desde el dashboard.
- Añade lugares y actividades a tus viajes.
- Invita a otros usuarios a unirse a tus viajes.
- Crea viajes sorpresa para revelar el destino en una fecha específica.
- Gestiona tu perfil y sube un avatar.

Para testing de la API, importa la colección de Postman incluida.

## Objetivo del proyecto

El objetivo de TripPlanner es ofrecer una forma simple y estructurada de organizar viajes. Los usuarios pueden registrar destinos, anotar detalles importantes y seguir el progreso de su planificación mediante actividades marcadas como completadas.

La aplicación centraliza tres elementos clave de la planificación:

- **Viajes**: representan una experiencia o plan de viaje concreto.
- **Viajes Sorpresa**: cuando llegue la fecha, el destino se mostrará automáticamente a los viajeros invitados.
- **Lugares**: sitios que el usuario desea visitar dentro de un viaje.
- **Actividades**: tareas o cosas que hacer relacionadas con el viaje.

## Características principales

- Registro y autenticación de usuarios.
- Creación y gestión de múltiples viajes.
- Añadir lugares a visitar dentro de cada viaje.
- Registrar notas o información sobre cada lugar.
- Marcar lugares como visitados.
- Crear listas de actividades o checklist para cada viaje.
- Marcar actividades como completadas.
- Panel de usuario para visualizar todos los viajes.
- Invitar usuarios registrados a un viaje.
- Crear viajes sorpresa donde el destino está oculto

## Modelo de datos

La aplicación se basa en cuatro entidades principales:

### User
Representa a un usuario registrado en la plataforma.

Un usuario puede tener múltiples viajes creados.
Un usuario puede tener múltiples viajes como invitado.

### Trip
Representa un viaje creado por un usuario. Contiene información básica como el país, fechas y descripción.

Cada viaje pertenece a un usuario y puede contener múltiples lugares y actividades.

### Place
Representa un lugar que el usuario desea visitar durante un viaje.

Cada lugar está asociado a un viaje y puede marcarse como visitado.

### Activity
Representa una actividad o tarea relacionada con un viaje.

Funciona como una checklist que permite marcar actividades como completadas.

## Relaciones entre modelos

Las relaciones principales entre entidades son:

- **User → Trips** (uno a muchos)  
- **Trip → Places** (uno a muchos)  
- **Trip → Activities** (uno a muchos)

Esto permite estructurar cada viaje como un contenedor de lugares y actividades.

## API REST

El backend expone una API REST que permite:

- Autenticación de usuarios mediante **Session Cookies**
- Gestión completa de viajes (CRUD)
- Gestión de lugares dentro de un viaje
- Gestión de actividades asociadas a un viaje

Los endpoints están organizados en los siguientes módulos:

- **Auth** – registro, login y verificación de token.
- **Trips** – creación y gestión de viajes.
- **Places** – gestión de lugares dentro de un viaje.
- **Activities** – gestión de actividades del viaje.

------------------------------------------------------------------------

## Funcionalidades

-   Registrarse / Login
-   Crear viajes / Crear viajes sorpresa
-   Añadir viajeros al viaje
-   Añadir lugares a cada viaje
-   Añadir actividades o checklist
-   Marcar actividades como completadas

------------------------------------------------------------------------

## Modelos

### User

``` js
{
  username: String,
  email: String,
  password: String,
  bio: String,
  avatar: String,
}
```

Relación:

-   **User → muchos Trips**

------------------------------------------------------------------------

### Trip

``` js
{
  title: String,
  country: { name: String, code: String },
  city: String,
  startDate: Date,
  endDate: Date,
  description: String,
  userOwner: ObjectId (User),
  travelers: [{ObjectId (User), role(Enum)}],
  isSurprise: Boolean,
  revealDate: Date
}
```

Relaciones:

-   **User → muchos Trips**

------------------------------------------------------------------------

### Place

``` js
{
  name: String,
  location: String,
  notes: String,
  visited: Boolean,
  trip: ObjectId (Trip),
  author: ObjectId (User)
}
```

Relación:

-   **Trip → muchos Places**

------------------------------------------------------------------------

### Activity

``` js
{
  title: String,
  completed: Boolean,
  trip: ObjectId (Trip),
  author: ObjectId (User)
}
```

Relación:

-   **Trip → muchas Activities**

------------------------------------------------------------------------

## Documentación de los modelos

### User

| Campo    | Tipo   | Requerido | Notas                             |
|----------|--------|-----------|-----------------------------------|
| username | String | Sí        | Único, minLength: 3               |
| email    | String | Sí        | Único, formato email              |
| password | String | Sí        | MinLength: 6, almacenado con hash |
| bio      | String | No        | MaxLength: 500                    |
| avatar   | String | No        | minLength: 1                      |

**Relación**

User → muchos Trips

### Trip:
| Campo       | Tipo                              | Requerido | Notas                                                |
| ----------- | --------------------------------- | --------- | ---------------------------------------------------- |
| title       | String                            | Sí        | minLength: 2                                         |
| country     | Object {name:String, code:String} | Sí        | nombre del país y código ISO                         |
| city        | String                            | Sí        | nombre del ciudad                                    |
| startDate   | Date                              | Sí        | fecha inicio viaje                                   |
| endDate     | Date                              | Sí        | fecha fin viaje                                      |
| description | String                            | No        | maxLength: 500                                       |
| userOwner   | ObjectId (User)                   | Sí        | referencia al usuario creador                        |
| travelers   | [{ObjectId(User), Role (Enum)}]   | No        | referencia al usuario, role enum (owner, traveler)   |
| isSurprise  | Boolean                           | Sí        | default: false                                       |
| revealDate  | Date                              | No        | fecha de revelación del destino                      |

**Relación**

User → muchos Trips (owner)
User → muchos Trips (traveler)
Trip → pertenece a un User
Trip → muchos Places
Trip → muchas Activities
Trip → muchos Travelers


### Place:
| Campo    | Tipo            | Requerido | Notas                 |
| -------- | --------------- | --------- | --------------------- |
| name     | String          | Sí        | nombre del lugar      |
| location | String          | No        | ciudad o dirección    |
| notes    | String          | No        | notas personales      |
| visited  | Boolean         | Sí        | default: false        |
| trip     | ObjectId (Trip) | Sí        | referencia al viaje   |
| author   | ObjectId (User) | Sí        | referencia al usuario |

**Relación**

Trip → muchos Places
Place → pertenece a un Trip y User

### Activity:
| Campo     | Tipo            | Requerido | Notas                       |
| --------- | --------------- | --------- | --------------------------- |
| title     | String          | Sí        | descripción de la actividad |
| completed | Boolean         | Sí        | default: false              |
| trip      | ObjectId (Trip) | Sí        | referencia al viaje         |
| author    | ObjectId (User) | Sí        | referencia al usuario       |

**Relación**

Trip → muchas Activities
Activity → pertenece a un Trip y User

## API

### Auth

    POST /auth/signup
    POST /auth/login
    DELETE /auth/logout
    GET /auth/verify

### Profile

    GET /profile/:id
    PATCH /profile/me

### Users

    GET /users

### Trips

    GET /trips
    POST /trips
    GET /trips/:tripId
    PATCH /trips/:tripId
    PATCH /trips/:tripId/add-traveler
    PATCH /trips/:tripId/remove-traveler
    POST /trips/:tripId/invite
    POST /trips/invitations/accept
    POST /trips/invitations/decline
    DELETE /trips/:tripId

### Places

    POST /trips/:tripId/places
    PATCH /trips/:tripId/places/:placeId
    DELETE /trips/:tripId/places/:placeId

### Activities

    POST /trips/:tripId/activities
    PATCH /trips/:tripId/activities/:activityId
    DELETE /trips/:tripId/activities/:activityId

### Countries

    GET /countries


## Endpoints (Backend)

### Auth

| Método | Ruta             | Descripción                             | Body                            |
| ------ | ---------------- | --------------------------------------- | ------------------------------- |
| POST   | /api/auth/signup | Registra un nuevo usuario               | `{ username, email, password }` |
| POST   | /api/auth/login  | Autentica usuario y devuelve Cookies    | `{ email, password }`           |
| DELETE | /api/auth/logout | Eliminación de la session activa        |                                 |
| GET    | /api/auth/verify | Verifica que el token Cookies es válido | —                               |


### Profile

| Método | Ruta                         | Descripción                                       | Body                        |
| ------ | ---------------------------- | ------------------------------------------------- | --------------------------- |
| GET    | /api/profile/{:userId o me}  | Devuelve perfil usuario o perfil usuario logueado | -                           |
| PATCH  | /api/profile/me              | Modificamos los datos de user (Bio, pass, avatar) | `{ bio, password, avatar }` |

### Users

| Método | Ruta          | Descripción              | Body |
| ------ | ------------- | ------------------------ | ---- |
| GET    | /api/users    | Lista de usuarios        | -    |

### Trips

| Método | Ruta                               | Descripción                          | Body                                                  |
| ------ | ---------------------------------- | ------------------------------------ | ----------------------------------------------------- |
| GET    | /api/trips                         | Obtiene todos los viajes del usuario | ( ?userOwner=, ...)                                   |
| POST   | /api/trips                         | Crea un nuevo viaje                  | `{ title, country, startDate, endDate, description }` |
| GET    | /api/trips/:tripId                 | Obtiene los detalles de un viaje     | —                                                     |
| PATCH  | /api/trips/:tripId                 | Edita un viaje                       | `{ title, country, startDate, endDate, description }` |
| DELETE | /api/trips/:tripId                 | Elimina un viaje                     | —                                                     |
| PATCH  | /api/trips/:tripId/add-traveler    | Añade un viajero al viaje            | `{ userId }`                                          |
| PATCH  | /api/trips/:tripId/remove-traveler | Elimina un viajero                   | `{ userId }`                                          |
| POST   | /api/trips/:tripId/invite          | Invita a un viajero                  | `{ email }`                                           |
| POST   | /api/trips/invitations/accept      | Acepta invitación                    | `{ token }`                                           |
| POST   | /api/trips/invitations/decline     | Declina invitación                   | `{ token }`                                           |

### Places

| Método | Ruta                                       | Descripción                      | Body                              |
| ------ | ------------------------------------------ | -------------------------------- | --------------------------------- |
| POST   | /api/trips/:tripId/places                  | Crea un lugar dentro de un viaje | `{ name, location, notes }`       |
| PATCH  | /api/trips/:tripId/places/:placeId         | Marca lugar como visitado        | `{ visited }`                     |
| DELETE | /api/trips/:tripId/places/:placeId         | Elimina un lugar                 |                                   |     

### Activities

| Método | Ruta                                        | Descripción                     | Body              |
| ------ | ------------------------------------------- | ------------------------------- | ----------------- |
| POST   | /api/trips/:tripId/activities               | Crea una actividad del viaje    | `{ title }`       |
| PATCH  | /api/trips/:tripId/activities/:activityId   | Marca actividad como completada | `{ completed }`   |
| DELETE | /api/trips/:tripId/activities/:activityId   | Elimina actividad               |                   |

### Countries

| Método | Ruta                 | Descripción                                     | Body                        |
| ------ | -------------------- | ------------------------------------------------| --------------------------- |
| GET    | /api/countries       | Devuelve un listado de paises {name y codeIso}  | -                           |

## Rutas de la aplicación (Frontend)

| Ruta                | Página             | Descripción                                    | Acceso  |
| ------------------- | ------------------ | ---------------------------------------------- | ------- |
| /signup             | SignupPage         | Registro de usuario                            | Pública |
| /login              | LoginPage          | Inicio de sesión                               | Pública |
| /                   | DashboardPage      | Dashboard principal                            | Auth    |
| /profile            | ProfilePage        | Perfil del usuario                             | Auth    |
| /user/:userId       | UserPage           | Perfil de otro usuario                         | Auth    |
| /trips              | ExploreTripsPage   | Explorar viajes                                | Auth    |
| /trips/:tripId      | TripsPage          | Detalles del viaje                             | Auth    |
| /trips/add          | TripsFormPage      | Crear un nuevo viaje                           | Auth    |
| /trips/:tripId/setup| TripSetupPage      | Configuración del viaje                        | Auth    |
| /invitations        | TripInvitationPage | Página de invitaciones                          | Auth    |
| *                   | NotFoundPage       | Página no encontrada                            | Todas   |
