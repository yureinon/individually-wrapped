import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import auth from "./routes/auth.js";
import user from "./routes/user.js";

const PORT = process.env.PORT || 5050;
const app = express();

// swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'MERN API Docs',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    }
  },
  apis: ['./routes/*.js'], // Path to route files with Swagger comments
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api/v0/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors());
app.use(express.json());
app.use("/api/v0/login", auth);
app.use("/api/v0/user", user);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}\nLink: http://localhost:5050/api/v0/docs`);
  console.log(`Server listening on port ${PORT}\nLink: http://localhost:5050/api/v0/docs`);
});