# ⚙️ API Gestión de Tareas (Backend)

Servidor backend desarrollado en Node.js y Express 5 bajo estándar ECMAScript Modules (ESM), con autenticación mediante tokens JWT, hashing seguro de contraseñas con Bcrypt, manejo centralizado de errores y persistencia en MariaDB a través de un pool asíncrono con `mysql2/promise`.

---

## 🏗️ Arquitectura de Archivos (`src/`)

```text
src/
├── config/
│   └── config.js              # Carga y exporta variables desde .env
├── controller/
│   ├── login.controller.js    # Controla la autenticación y emisión de tokens
│   ├── Tarea.controller.js    # CRUD de tareas (crear, listar, obtener, editar, completar, borrar)
│   └── Usurios.controller.js  # Registro de usuarios y emisión de JWT inicial
├── db/
│   ├── db.js                  # Pool de conexiones a MariaDB y proyección de columnas
│   ├── schema.sql             # Definición de tablas SQL (Usuario y Tarea con clave foránea)
│   └── seed.js                # Inicialización y poblado con usuarios y tareas de prueba
├── middleware/
│   ├── auth.middleware.js     # Validación de JWT (Bearer Token) y extracción de identidad
│   └── errores.middleware.js  # Middleware centralizado para captura y formato de errores
├── models/
│   ├── tareas.js              # Modelo y consultas SQL para la tabla Tarea
│   └── usuarios.js            # Modelo y consultas SQL para la tabla Usuario
├── routes/
│   ├── index.js               # Router principal con prefijo (/api)
│   ├── login.route.js         # Rutas de autenticación (/api/login)
│   ├── tarea.route.js         # Rutas protegidas para tareas (/api/tareas)
│   └── usuario.route.js       # Rutas de usuarios (/api/usuario)
├── services/
│   ├── encriptar.service.js   # Funciones de hash y comparación con Bcrypt
│   ├── express.service.js     # Clase contenedora de Express, CORS, 404 y error handler
│   └── jwt.service.js         # Generación y verificación de tokens JWT
└── app.js                     # Entry point y arranque del servidor (puerto 3002)
```

---

## 📋 Variables de Entorno (`.env`)

Crea o configura el archivo `.env` en la raíz del directorio `backend/`:

```env
PORT_SERVER=3002
PORT_DB=3307
HOST_DB=localhost
USER_DB=root
PASSWORD_DB=
PALABRA_SECRETA=MIMAMAMAMEMIMA
SALT_ROUNDS=10
```

---

## 🛠️ Comandos Disponibles

Ejecutar desde el directorio `backend/`:

| Comando | Descripción |
| :--- | :--- |
| `pnpm install` | Instala todas las dependencias del servidor. |
| `pnpm run dev` | Inicia el servidor en modo desarrollo utilizando `nodemon`. |
| `node src/db/seed.js` | Limpia las tablas y repuebla la base de datos con usuarios y tareas de prueba (con claves cifradas). |

---

## 📡 Endpoints de la API

La API se encuentra estructurada bajo el prefijo `/api`:

| Método | Endpoint | Autenticación | Descripción |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/` | No | Verificación de estado del servidor (`ok`). |
| `POST` | `/api/login` | No | Inicia sesión y emite token JWT. |
| `POST` | `/api/usuario` | No | Registra un nuevo usuario y retorna token de sesión. |
| `GET` | `/api/tareas` | `Bearer Token` | Lista todas las tareas pertenecientes al usuario autenticado. |
| `GET` | `/api/tareas/:id` | `Bearer Token` | Obtiene una tarea específica si pertenece al usuario. |
| `POST` | `/api/tareas` | `Bearer Token` | Crea una nueva tarea asociada al usuario. |
| `PATCH` | `/api/tareas/:id` | `Bearer Token` | Actualiza título y descripción de una tarea. |
| `POST` | `/api/tareas/completar/:id` | `Bearer Token` | Marca una tarea como completada (`done = 1`). |
| `DELETE` | `/api/tareas/:id` | `Bearer Token` | Elimina la tarea especificada si pertenece al usuario. |

---

## 📝 Detalle y Ejemplos de Petición

### 1. Iniciar Sesión (`POST /api/login`)

**Headers:**
```http
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "correo": "juan@correo.com",
  "contrasenia": "123456"
}
```

**Respuesta Exitosa (200 OK):**
```json
{
  "usuario": "Juan Pérez",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 2. Registrar Usuario (`POST /api/usuario`)

**Headers:**
```http
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "nombre": "Carlos Gómez",
  "correo": "carlos@correo.com",
  "contrasenia": "clave123"
}
```

**Respuesta Exitosa (201 Created):**
```json
{
  "usuario": "ok",
  "mensaje": "Usuario registrado con éxito",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 3. Obtener Todas las Tareas (`GET /api/tareas`)

**Headers:**
```http
Authorization: Bearer <TOKEN_JWT>
```

**Respuesta Exitosa (200 OK):**
```json
{
  "tarea": [
    {
      "id": 1,
      "titulo": "Configurar servidor Express",
      "descripcion": "Instalar cors y mysql2",
      "done": 1,
      "nombre": "Juan Pérez",
      "correo": "juan@correo.com"
    }
  ]
}
```

---

### 4. Crear Tarea (`POST /api/tareas`)

**Headers:**
```http
Authorization: Bearer <TOKEN_JWT>
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "titulo": "Implementar testing unitario",
  "descripcion": "Probar servicios y controladores con Vitest o Jest"
}
```

**Respuesta Exitosa (201 Created):**
```json
{
  "tarea": {
    "fieldCount": 0,
    "affectedRows": 1,
    "insertId": 8,
    "info": "",
    "serverStatus": 2,
    "warningStatus": 0
  }
}
```

---

### 5. Modificar Tarea (`PATCH /api/tareas/:id`)

**Headers:**
```http
Authorization: Bearer <TOKEN_JWT>
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "titulo": "Título actualizado",
  "descripcion": "Descripción actualizada"
}
```

**Respuesta Exitosa (200 OK):**
```json
{
  "tarea": {
    "id": 1
  }
}
```

---

### 6. Marcar Tarea como Completada (`POST /api/tareas/completar/:id`)

**Headers:**
```http
Authorization: Bearer <TOKEN_JWT>
```

**Respuesta Exitosa (200 OK):**
```json
{
  "tarea": {
    "id": 1
  }
}
```

---

### 7. Eliminar Tarea (`DELETE /api/tareas/:id`)

**Headers:**
```http
Authorization: Bearer <TOKEN_JWT>
```

**Respuesta Exitosa (200 OK):**
```json
{
  "tarea": {
    "id": 1
  }
}
```

---

## 🛡️ Manejo Centralizado de Errores

El servidor cuenta con middlewares para control y formato estándar de respuestas ante excepciones:

- **Ruta no encontrada (404):**
  ```json
  {
    "status": "error",
    "message": "Ruta no encontrada"
  }
  ```
- **Falta de autorización / Token inválido (401):**
  ```json
  {
    "status": "error",
    "message": "Token inválido o expirado"
  }
  ```
- **Error interno o de validación (500):**
  ```json
  {
    "status": "error",
    "message": "Mensaje descriptivo del error"
  }
  ```
