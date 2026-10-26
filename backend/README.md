# API GESTION DE TAREAS

Servidor backend desarrollado en Node.js y Express con autenticación JWT, hash de contraseñas con Bcrypt y persistencia en MariaDB mediante `mysql2/promise`.

---

##  Arquitectura de Archivos (`src/`)

```text
src/
├── config/
│   └── config.js            # Carga y exporta variables desde .env
├── controller/
│   ├── login.controller.js  # Controla la autenticación y emisión de tokens
│   ├── Tarea.controller.js  # Controla las operaciones sobre las tareas
│   └── Usurios.controller.ts# Controlador para usuarios (en preparación)
├── db/
│   ├── db.js                # Conexión por Pool a MariaDB y constantes de campos
│   ├── schema.sql           # Definición de tablas SQL (Usuario y Tarea)
│   └── seed.js              # Inicialización y poblado con usuarios y tareas de prueba
├── middleware/
│   └── auth.middleware.js   # Middleware de validación de JWT (Bearer Token)
├── models/
│   ├── tareas.js            # Modelo y consultas SQL para la tabla Tarea
│   └── usuarios.js          # Modelo y consultas SQL para la tabla Usuario
├── routes/
│   ├── index.js             # Router principal (/api)
│   ├── login.route.js       # Rutas de autenticación (/api/login)
│   └── tarea.route.js       # Rutas protegidas para tareas (/api/tareas)
├── services/
│   ├── encriptar.service.js # Funciones de hash y comparación con Bcrypt
│   ├── express.service.js   # Clase contenedora de Express, CORS y parseo
│   └── jwt.service.js       # Generación y verificación de tokens JWT
└── app.js                   # Entry point del servidor
```

---

##  Variables de Entorno (`.env`)

Crea un archivo `.env` en la raíz de `backend/` con el siguiente contenido:

```env
PORT_SERVER=
PORT_DB=
HOST_DB=
USER_DB=
PASSWORD_DB=
PALABRA_SECRETA='TU_SECRETO_JWT'
SALT_ROUNDS=10
```

---

##  Comandos Disponibles

| Comando | Descripción |
| :--- | :--- |
| `pnpm install` | Instala todas las dependencias del proyecto. |
| `pnpm run dev` | Inicia el servidor en modo desarrollo utilizando `nodemon`. |
| `node src/db/seed.js` | Limpia y repuebla la base de datos con usuarios y tareas de ejemplo. |

---

##  Rutas y Ejemplos de Petición

### 1. Iniciar Sesión (`POST /api/login`)
Envía las credenciales para recibir el token de sesión.

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
  "usuario": "ok",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 2. Obtener Todas las Tareas del Usuario (`GET /api/tareas`)
Retorna todas las tareas vinculadas al usuario del token, incluyendo nombre y correo.

**Headers:**
```http
Authorization: Bearer <TOKEN_JWT>
```

---

### 3. Crear una Tarea (`POST /api/tareas`)

**Headers:**
```http
Authorization: Bearer <TOKEN_JWT>
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "titulo": "Implementar testing unitario",
  "nota": "Probar servicios y controladores",
  "completada": false
}
```

---

### 4. Marcar Tarea como Completada (`POST /api/tareas/completar/:id`)

**Headers:**
```http
Authorization: Bearer <TOKEN_JWT>
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
  "titulo": "Nuevo título",
  "nota": "Nueva descripción"
}
```
