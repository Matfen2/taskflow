import swaggerJsdoc from 'swagger-jsdoc'

export default swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: { title: 'TaskFlow API', version: '1.0.0', description: 'API REST de gestion de tâches' },
    servers: [{ url: 'http://localhost:3000' }],
    components: {
      securitySchemes: { bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' } }
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./routes/*.js'],
})