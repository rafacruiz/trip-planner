
- TripPlanner

Idea: Planificador de viajes donde guardas lugares a visitar.

Funcionalidades:

  Registrarse / login

  Crear viajes

  Añadir lugares a cada viaje

  Añadir actividades o checklist

  Marcar actividades como completadas

Modelos:

User
  {
    username: String,
    email: String,
    password: String
  }

Trip
  {
    title: String,
    country: String,
    startDate: Date,
    endDate: Date,
    description: String,
    owner: ObjectId (User)
  }

  User → muchos Trips

Place 
  {
    name: String,
    location: String,
    notes: String,
    visited: Boolean,
    trip: ObjectId (Trip)
  }

  Trip → muchos Places

Activity
  {
    title: String,
    completed: Boolean,
    trip: ObjectId (Trip)
  }

  Trip → muchas Activities

Documentacion de los modelos:

User: 
| Campo    | Tipo   | Requerido | Notas                             |
| -------- | ------ | --------- | --------------------------------- |
| username | String | Sí        | Único, minLength: 3               |
| email    | String | Sí        | Único, formato email              |
| password | String | Sí        | MinLength: 6, almacenado con hash |

User → muchos Trips

Trip:
| Campo       | Tipo            | Requerido | Notas                         |
| ----------- | --------------- | --------- | ----------------------------- |
| title       | String          | Sí        | minLength: 2                  |
| country     | String          | Sí        | nombre del país               |
| startDate   | Date            | Sí        | fecha inicio viaje            |
| endDate     | Date            | Sí        | fecha fin viaje               |
| description | String          | No        | maxLength: 500                |
| owner       | ObjectId (User) | Sí        | referencia al usuario creador |

User → muchos Trips
Trip → pertenece a un User

Place:
| Campo    | Tipo            | Requerido | Notas               |
| -------- | --------------- | --------- | ------------------- |
| name     | String          | Sí        | nombre del lugar    |
| location | String          | No        | ciudad o dirección  |
| notes    | String          | No        | notas personales    |
| visited  | Boolean         | Sí        | default: false      |
| trip     | ObjectId (Trip) | Sí        | referencia al viaje |

Trip → muchos Places
Place → pertenece a un Trip

Activity:
| Campo     | Tipo            | Requerido | Notas                       |
| --------- | --------------- | --------- | --------------------------- |
| title     | String          | Sí        | descripción de la actividad |
| completed | Boolean         | Sí        | default: false              |
| trip      | ObjectId (Trip) | Sí        | referencia al viaje         |

Trip → muchas Activities
Activity → pertenece a un Trip


Api:

Auth

  POST /auth/signup
  POST /auth/login
  GET /auth/verify

Trips

  GET /trips
  POST /trips
  GET /trips/:id
  PATCH /trips/:id
  DELETE /trips/:id

Places

  POST /places
  GET /trips/:tripId/places
  PATCH /places/:id
  DELETE /places/:id

Activities

  POST /activities
  GET /trips/:tripId/activities
  PATCH /activities/:id
  DELETE /activities/:id

Endpoints (Backend)

| Método | Ruta             | Descripción                         | Body                            |
| ------ | ---------------- | ----------------------------------- | ------------------------------- |
| POST   | /api/auth/signup | Registra un nuevo usuario           | `{ username, email, password }` |
| POST   | /api/auth/login  | Autentica usuario y devuelve JWT    | `{ email, password }`           |
| GET    | /api/auth/verify | Verifica que el token JWT es válido | —                               |

| Método | Ruta               | Descripción                          | Body                                                  |
| ------ | ------------------ | ------------------------------------ | ----------------------------------------------------- |
| GET    | /api/trips         | Obtiene todos los viajes del usuario | —                                                     |
| POST   | /api/trips         | Crea un nuevo viaje                  | `{ title, country, startDate, endDate, description }` |
| GET    | /api/trips/:tripId | Obtiene los detalles de un viaje     | —                                                     |
| PATCH  | /api/trips/:tripId | Edita un viaje                       | `{ title, country, startDate, endDate, description }` |
| DELETE | /api/trips/:tripId | Elimina un viaje                     | —                                                     |

| Método | Ruta                         | Descripción                      | Body                              |
| ------ | ---------------------------- | -------------------------------- | --------------------------------- |
| POST   | /api/places                  | Crea un lugar dentro de un viaje | `{ name, location, notes, trip }` |
| GET    | /api/trips/:tripId/places    | Obtiene los lugares de un viaje  | —                                 |
| PATCH  | /api/places/:placeId         | Edita un lugar                   | `{ name, location, notes }`       |
| PATCH  | /api/places/:placeId/visited | Marca lugar como visitado        | `{ visited }`                     |
| DELETE | /api/places/:placeId         | Elimina un lugar                 | —                                 |

| Método | Ruta                          | Descripción                     | Body              |
| ------ | ----------------------------- | ------------------------------- | ----------------- |
| POST   | /api/activities               | Crea una actividad del viaje    | `{ title, trip }` |
| GET    | /api/trips/:tripId/activities | Obtiene actividades del viaje   | —                 |
| PATCH  | /api/activities/:activityId   | Marca actividad como completada | `{ completed }`   |
| DELETE | /api/activities/:activityId   | Elimina actividad               | —                 |


Rutas de la aplicación (Frontend)

| Ruta                | Página          | Descripción                                    | Acceso  |
| ------------------- | --------------- | ---------------------------------------------- | ------- |
| /                   | Home            | Redirige al dashboard o login                  | Pública |
| /signup             | SignupPage      | Registro de usuario                            | Pública |
| /login              | LoginPage       | Inicio de sesión                               | Pública |
| /dashboard          | Dashboard       | Lista de viajes del usuario                    | Auth    |
| /trips/create       | CreateTripPage  | Crear un nuevo viaje                           | Auth    |
| /trips/:tripId      | TripDetailsPage | Ver detalles del viaje (lugares y actividades) | Auth    |
| /trips/:tripId/edit | EditTripPage    | Editar un viaje                                | Auth    |
