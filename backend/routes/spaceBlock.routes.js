import express from "express"
import {
  createSpaceBlock,
  getSpaceBlocks,
  getSpaceBlockById,
  updateSpaceBlock,
  archiveSpaceBlock,
} from "../controllers/spaceBlock.controller.js"
import validateRequest from "../middlewares/validateRequest.js"
import {
  createSpaceBlockSchema,
  updateSpaceBlockSchema,
} from "../validators/spaceBlock.validator.js"

const spaceBlockRouter = express.Router()

/**
 * @swagger
 * /space-blocks:
 *   post:
 *     summary: Crear un nuevo SpaceBlock
 *     description: Crea un nuevo espacio (SpaceBlock) con título, icono y color. Opcionalmente puede asignarse a otro SpaceBlock como padre.
 *     tags:
 *       - SpaceBlocks
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - icon
 *             properties:
 *               title:
 *                 type: string
 *                 maxLength: 80
 *                 description: Título del SpaceBlock
 *               icon:
 *                 type: object
 *                 required:
 *                   - type
 *                   - value
 *                 properties:
 *                   type:
 *                     type: string
 *                     enum: [emoji, lucide, image]
 *                     description: Tipo de icono
 *                   value:
 *                     type: string
 *                     description: Valor del icono
 *               color:
 *                 type: string
 *                 default: "#7C3AED"
 *                 description: Color del SpaceBlock en formato hexadecimal
 *               parentSpaceBlockId:
 *                 type: string
 *                 description: ID del SpaceBlock padre (opcional). Debe existir si se proporciona.
 *     responses:
 *       201:
 *         description: SpaceBlock creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *       400:
 *         description: Datos inválidos o el SpaceBlock padre asignado no existe
 */
spaceBlockRouter.post(
  "/",
  validateRequest(createSpaceBlockSchema),
  createSpaceBlock,
)

/**
 * @swagger
 * /space-blocks:
 *   get:
 *     summary: Obtener todos los SpaceBlocks
 *     description: Obtiene una lista de todos los SpaceBlocks no archivados, ordenados por fecha de actualización
 *     tags:
 *       - SpaceBlocks
 *     responses:
 *       200:
 *         description: Lista de SpaceBlocks obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: number
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */
spaceBlockRouter.get("/", getSpaceBlocks)

/**
 * @swagger
 * /space-blocks/{id}:
 *   get:
 *     summary: Obtener un SpaceBlock por ID
 *     description: Obtiene los detalles de un SpaceBlock específico por su identificador
 *     tags:
 *       - SpaceBlocks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del SpaceBlock
 *     responses:
 *       200:
 *         description: SpaceBlock obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *       404:
 *         description: SpaceBlock no encontrado
 */
spaceBlockRouter.get("/:id", getSpaceBlockById)

/**
 * @swagger
 * /space-blocks/{id}:
 *   patch:
 *     summary: Actualizar un SpaceBlock
 *     description: Actualiza la información de un SpaceBlock existente
 *     tags:
 *       - SpaceBlocks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del SpaceBlock a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 maxLength: 80
 *               icon:
 *                 type: object
 *                 properties:
 *                   type:
 *                     type: string
 *                     enum: [emoji, lucide, image]
 *                   value:
 *                     type: string
 *               color:
 *                 type: string
 *               parentSpaceBlockId:
 *                 type: string
 *                 description: ID del SpaceBlock padre (opcional). Debe existir si se proporciona.
 *     responses:
 *       200:
 *         description: SpaceBlock actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *       400:
 *         description: El SpaceBlock padre asignado no existe
 *       404:
 *         description: SpaceBlock no encontrado
 */
spaceBlockRouter.patch(
  "/:id",
  validateRequest(updateSpaceBlockSchema),
  updateSpaceBlock,
)

/**
 * @swagger
 * /space-blocks/{id}:
 *   delete:
 *     summary: Archivar un SpaceBlock
 *     description: Marca un SpaceBlock como archivado (soft delete)
 *     tags:
 *       - SpaceBlocks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del SpaceBlock a archivar
 *     responses:
 *       200:
 *         description: SpaceBlock archivado exitosamente
 *       404:
 *         description: SpaceBlock no encontrado
 */
spaceBlockRouter.delete("/:id", archiveSpaceBlock)

export default spaceBlockRouter
