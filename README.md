# TripPlanner

TripPlanner es una aplicación web para planificar viajes y organizar todo lo relacionado con ellos en un solo lugar. Permite a los usuarios crear viajes, guardar lugares que desean visitar y gestionar actividades o tareas asociadas a cada viaje.

La aplicación está pensada como una herramienta sencilla de organización personal para viajeros. Cada usuario puede crear múltiples viajes, añadir lugares dentro de cada viaje y mantener una lista de actividades o checklist para planificar mejor su experiencia.

Invitar a otros usuarios registrados a un viaje y crear viajes sorpresa, donde el destino permanece oculto hasta una fecha y hora específicas.

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
  password: String
}
```

Relación:

-   **User → muchos Trips**

------------------------------------------------------------------------

### Trip

``` js
{
  title: String,
  country: String,
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
  trip: ObjectId (Trip)
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
  trip: ObjectId (Trip)
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

**Relación**

User → muchos Trips

### Trip:
| Campo       | Tipo                           | Requerido | Notas                                                |
| ----------- | ------------------------------ | --------- | ---------------------------------------------------- |
| title       | String                         | Sí        | minLength: 2                                         |
| country     | String                         | Sí        | nombre del país                                      |
| startDate   | Date                           | Sí        | fecha inicio viaje                                   |
| endDate     | Date                           | Sí        | fecha fin viaje                                      |
| description | String                         | No        | maxLength: 500                                       |
| userOwner   | ObjectId (User)                | Sí        | referencia al usuario creador                        |
| travelers   | [{ObjectId(User), Role (Enum)}]| No        | referencia al usuario, role enum (owner, traveler)   |
| isSurprise  | Boolean                        | Sí        | default: false                                       |
| revealDate  | Date                           | No        | fecha de revelación del destino                      |

**Relación**

User → muchos Trips
User → muchos Trips (traveler)
Trip → pertenece a un User
Trip → muchos Places
Trip → muchas Activities
Trip → muchos Travelers


### Place:
| Campo    | Tipo            | Requerido | Notas               |
| -------- | --------------- | --------- | ------------------- |
| name     | String          | Sí        | nombre del lugar    |
| location | String          | No        | ciudad o dirección  |
| notes    | String          | No        | notas personales    |
| visited  | Boolean         | Sí        | default: false      |
| trip     | ObjectId (Trip) | Sí        | referencia al viaje |

**Relación**

Trip → muchos Places
Place → pertenece a un Trip

### Activity:
| Campo     | Tipo            | Requerido | Notas                       |
| --------- | --------------- | --------- | --------------------------- |
| title     | String          | Sí        | descripción de la actividad |
| completed | Boolean         | Sí        | default: false              |
| trip      | ObjectId (Trip) | Sí        | referencia al viaje         |

**Relación**

Trip → muchas Activities
Activity → pertenece a un Trip

## API

### Auth

    POST /auth/signup
    POST /auth/login
    GET /auth/verify

### Trips

    GET /trips
    POST /trips
    GET /trips/:id
    PATCH /trips/:id
    DELETE /trips/:id

### Places

    POST /places
    GET /trips/:tripId/places
    PATCH /places/:id
    DELETE /places/:id

### Activities

    POST /activities
    GET /trips/:tripId/activities
    PATCH /activities/:id
    DELETE /activities/:id

## Endpoints (Backend)

### Auth

| Método | Ruta             | Descripción                             | Body                            |
| ------ | ---------------- | --------------------------------------- | ------------------------------- |
| POST   | /api/auth/signup | Registra un nuevo usuario               | `{ username, email, password }` |
| POST   | /api/auth/login  | Autentica usuario y devuelve Cookies    | `{ email, password }`           |
| GET    | /api/auth/verify | Verifica que el token Cookies es válido | —                               |

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

### Places

| Método | Ruta                         | Descripción                      | Body                              |
| ------ | ---------------------------- | -------------------------------- | --------------------------------- |
| POST   | /api/places                  | Crea un lugar dentro de un viaje | `{ name, location, notes, trip }` |
| GET    | /api/trips/:tripId/places    | Obtiene los lugares de un viaje  | —                                 |
| PATCH  | /api/places/:placeId         | Edita un lugar                   | `{ name, location, notes }`       |
| PATCH  | /api/places/:placeId/visited | Marca lugar como visitado        | `{ visited }`                     |
| DELETE | /api/places/:placeId         | Elimina un lugar                 | —                                 |

### Activities

| Método | Ruta                          | Descripción                     | Body              |
| ------ | ----------------------------- | ------------------------------- | ----------------- |
| POST   | /api/activities               | Crea una actividad del viaje    | `{ title, trip }` |
| GET    | /api/trips/:tripId/activities | Obtiene actividades del viaje   | —                 |
| PATCH  | /api/activities/:activityId   | Marca actividad como completada | `{ completed }`   |
| DELETE | /api/activities/:activityId   | Elimina actividad               | —                 |

## Rutas de la aplicación (Frontend)

| Ruta                | Página          | Descripción                                    | Acceso  |
| ------------------- | --------------- | ---------------------------------------------- | ------- |
| /signup             | SignupPage      | Registro de usuario                            | Pública |
| /login              | LoginPage       | Inicio de sesión                               | Pública |
| /                   | Dashboard       | Lista de viajes de usuarios                    | Auth    |
| /profile            | Profile         | Lista de viajes del usuario y su perfil        | Auth    |
| /trips/create       | CreateTripPage  | Crear un nuevo viaje                           | Auth    |
| /trips/:tripId      | TripDetailsPage | Ver detalles del viaje (lugares y actividades) | Auth    |
| /trips/:tripId/edit | EditTripPage    | Editar un viaje                                | Auth    |