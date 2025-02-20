import { UserMiddleware } from "./user.middleware";
import { UserDatasourceImp } from "../../infraestructure/datasource/user.datasource.imp";
import { UserRepositoryImpl } from "../../infraestructure/repositories/user.repository.imp";
import { BaseRouter } from "../../utils/router/base.router";
import { UserController } from "./user.controller";
import { BcryptPasswordHasher } from "../../utils/passwordHasher/bcryptPasswordHasher";


export class UserRoutes extends BaseRouter<UserController, UserMiddleware, UserRepositoryImpl> {

    constructor() {
        super(UserController, UserMiddleware, new UserRepositoryImpl(new UserDatasourceImp(), new BcryptPasswordHasher()));
    }

    routes(): void {
        const prefix = "/users"
        /**
         * @swagger
         * /users:
         *  get:
         *    tags: [Users]
         *    description: get all users
         *    responses:
         *      '200':
         *        description: response successful
         *        content:
         *          application/json:
         *            schema:
         *              type: object
         *              properties:
         *                status:
         *                  type: integer
         *                  example: 200
         *                statusMsg:
         *                  type: string
         *                  example: SUCCESS
         *                data:
         *                  type: array
         *                  items:
         *                    type: object
         *                    properties:
         *                      id:
         *                        type: string
         *                        example: d9df9616-8d10-4992-a20a-8974d30481a8
         *                      created_at:
         *                        type: string
         *                        format: date-time
         *                        example: 2024-04-11T03:44:40.257Z
         *                      updated_at:
         *                        type: string
         *                        format: date-time
         *                        example: 2024-04-11T03:45:02.276Z
         *                      deleted_at:
         *                        type: string
         *                        format: date-time
         *                      name:
         *                        type: string
         *                        example: brayan
         *                      email:
         *                        type: string
         *                        example: brayanandresrl@ufps.edu.co
         *                      email_sent:
         *                        type: boolean
         *                        example: true
         *                      emailValidated:
         *                        type: boolean
         *                        example: true
         */
        this.router.get(`${prefix}`,
            (req, res, next) => this.middleware.validarJwt(req, res, next),
            this.controller.get
        )

        /**
         * @swagger
         * /users/{id}:
         *  get:
         *    tags: [Users]
         *    summary: Obtiene un usuario por su ID
         *    parameters:
         *      - in: path
         *        name: id
         *        schema:
         *          type: string
         *        required: true
         *        description: ID del usuario
         *    responses:
         *      '200':
         *        description: Operación exitosa
         *        content:
         *          application/json:
         *            schema:
         *              type: object
         *              properties:
         *                status:
         *                  type: integer
         *                  example: 200
         *                statusMsg:
         *                  type: string
         *                  example: SUCCESS
         *                data:
         *                  type: object
         *                  properties:
         *                    id:
         *                      type: string
         *                      example: d9df9616-8d10-4992-a20a-8974d30481a8
         *                    created_at:
         *                      type: string
         *                      format: date-time
         *                      example: 2024-04-11T03:44:40.257Z
         *                    updated_at:
         *                      type: string
         *                      format: date-time
         *                      example: 2024-04-11T03:45:02.276Z
         *                    deleted_at:
         *                      type: string
         *                      format: date-time
         *                    name:
         *                      type: string
         *                      example: brayan
         *                    email:
         *                      type: string
         *                      example: brayanandresrl@ufps.edu.co
         *                    email_sent:
         *                      type: boolean
         *                      example: true
         *                    emailValidated:
         *                      type: boolean
         *                      example: true
         */
        this.router.get(`${prefix}/:id`,
            // (req, res, next) => this.middleware.validarJwt(req, res, next), 
            [this.middleware.validarJwt],
            this.controller.getOne
        )

        this.router.post(`${prefix}`,
            (req, res, next) => this.middleware.validarJwt(req, res, next),
            (req, res, next) => this.middleware.validateDto(req, res, next, "create"),
            this.controller.create
        )

        /**
         * @swagger
         * /users/{id}:
         *  put:
         *    tags: [Users]  # Cambia 'Entidad' por el nombre del recurso (ej. Users, Products, etc.)
         *    summary: Actualiza un recurso por su ID
         *    parameters:
         *      - in: path
         *        name: id
         *        schema:
         *          type: string
         *        required: true
         *        description: ID del recurso a actualizar
         *    requestBody:
         *      required: true
         *      content:
         *        application/json:
         *          schema:
         *            type: object
         *            properties:
         *              campo1:
         *                type: string
         *                example: "Nuevo valor"
         *              campo2:
         *                type: integer
         *                example: 123
         *    responses:
         *      '200':
         *        description: Recurso actualizado exitosamente
         *        content:
         *          application/json:
         *            schema:
         *              type: object
         *              properties:
         *                status:
         *                  type: integer
         *                  example: 200
         *                statusMsg:
         *                  type: string
         *                  example: SUCCESS
         *                data:
         *                  type: object
         *                  properties:
         *                    id:
         *                      type: string
         *                      example: d9df9616-8d10-4992-a20a-8974d30481a8
         *                    campo1:
         *                      type: string
         *                      example: "Nuevo valor"
         *                    campo2:
         *                      type: integer
         *                      example: 123
         *      '400':
         *        description: Error en la validación de los datos enviados
         *      '401':
         *        description: No autorizado, token inválido o no enviado
         *      '404':
         *        description: Recurso no encontrado
         */
        this.router.put(`${prefix}/:id`,
            (req, res, next) => this.middleware.validarJwt(req, res, next),
            (req, res, next) => this.middleware.validateDto(req, res, next, "update"),
            this.controller.update
        )

        /**
         * @swagger
         * /users/{id}:
         *  delete:
         *    tags: [Users]  # Cambia 'Entidad' por el nombre del recurso
         *    summary: Elimina un recurso por su ID
         *    parameters:
         *      - in: path
         *        name: id
         *        schema:
         *          type: string
         *        required: true
         *        description: ID del recurso a eliminar
         *    responses:
         *      '200':
         *        description: Recurso eliminado exitosamente
         *        content:
         *          application/json:
         *            schema:
         *              type: object
         *              properties:
         *                status:
         *                  type: integer
         *                  example: 200
         *                statusMsg:
         *                  type: string
         *                  example: SUCCESS
         *      '401':
         *        description: No autorizado, token inválido o no enviado
         *      '404':
         *        description: Recurso no encontrado
         */
        this.router.delete(`${prefix}/:id`,
            (req, res, next) => this.middleware.validarJwt(req, res, next),
            this.controller.delete
        )
    }
}