# Aplicación Musical: Backend con Node.js y Frontend Dinámico

Este proyecto es una plataforma interactiva donde los usuarios pueden recomendar y cargar canciones favoritas. Utiliza un backend robusto con Node.js y Express, junto con una interfaz dinámica desarrollada en HTML, CSS y JavaScript. Los datos de las canciones se gestionan con una base de datos MongoDB.

## Descripción General

El sistema está diseñado siguiendo el patrón de arquitectura MVC (Modelo-Vista-Controlador), separando claramente la lógica de negocio del diseño y las interacciones de usuario.

### Características
- **Backend:** 
  - Construido con Node.js y Express para gestionar las solicitudes y respuestas.
  - Conexión a MongoDB para almacenar información de las canciones.
  - Configuración de CORS para facilitar la interacción con el frontend.
- **Frontend:**
  - Desarrollado con HTML para la estructura, CSS para los estilos y JavaScript para la lógica interactiva.

---

## Guía de Configuración

### Requisitos Previos
- **Node.js** y **npm** instalados en tu máquina.
- Una instancia de **MongoDB** en funcionamiento, ya sea local o en la nube.

### Pasos de Instalación

#### Configuración del Backend
1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/usuario/repo-musica.git
   cd repo-musica/backend
   ```
2. **Instala las dependencias:**
   ```bash
   npm install
   ```
3. **Conecta la base de datos:**
   - Asegúrate de tener acceso a MongoDB.
   - Ajusta la cadena de conexión en `server.js` según tus credenciales y entorno.
4. **Inicia el servidor:**
   ```bash
   node server.js
   ```
   - Por defecto, el servidor estará disponible en `http://localhost:3000`.

#### Configuración del Frontend
1. Navega a la carpeta del frontend:
   ```bash
   cd ../frontend
   ```
2. **Inicia el servidor local:**
   - Utiliza extensiones como **Live Server** en Visual Studio Code para abrir el archivo `index.html`.
   - Esto generalmente inicia el frontend en `http://127.0.0.1:5501`.

3. **Permite las solicitudes entre puertos:**
   - Configura el backend para aceptar conexiones desde el puerto del frontend. Añade esta configuración en el backend:
     ```javascript
     const corsOptions = {
         origin: 'http://127.0.0.1:5501',
         optionsSuccessStatus: 200
     };
     app.use(cors(corsOptions));
     ```

---

## Organización del Proyecto

La estructura de directorios garantiza una clara separación de responsabilidades:

```
/app_musical
│
├── backend/
│   ├── server.js          # Configuración del servidor
│   ├── models/            # Modelos de datos
│   ├── controllers/       # Lógica del negocio
│   └── views/             # Plantillas para respuestas (opcional)
│
├── frontend/
│   ├── index.html         # Página principal
│   ├── styles.css         # Estilos personalizados
│   └── script.js          # Lógica del cliente
│
└── README.md              # Documentación del proyecto
```

---

## Consideraciones Finales

- **Puertos predeterminados:** El backend usa el puerto 3000 y el frontend el 5501. Modifícalos si es necesario en tu configuración.
- **Compatibilidad:** Esta aplicación funciona en navegadores modernos y requiere Node.js v14 o superior.
- **Contribuciones:** ¡Sugerencias y mejoras son bienvenidas! Realiza un fork del repositorio y envía tu pull request.

--- 

Mantente atento para futuras actualizaciones y nuevas funcionalidades. ¡Gracias por explorar este proyecto musical! 🎵
