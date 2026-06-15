import express from "express"
import {
  createThinkingBlock,
  getThinkingBlockById,
  updateThinkingBlock,
  archiveThinkingBlock,
  duplicateThinkingBlock,
} from "../controllers/thinkingBlock.controller.js"
import validateRequest from "../middlewares/validateRequest.js"
import {
  createThinkingBlockSchema,
  updateThinkingBlockSchema,
} from "../validators/thinkingBlock.validator.js"

const thinkingBlockRouter = express.Router()

/**
 * @swagger
 * /thinking-blocks:
 *   post:
 *     summary: Crear un nuevo ThinkingBlock
 *     description: Crea un nuevo bloque de pensamiento dentro de un SpaceBlock existente
 *     tags:
 *       - ThinkingBlocks
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - icon
 *               - spaceBlockId
 *             properties:
 *               title:
 *                 type: string
 *                 maxLength: 80
 *                 description: Título del ThinkingBlock
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
 *               spaceBlockId:
 *                 type: string
 *                 description: ID del SpaceBlock padre
 *     responses:
 *       201:
 *         description: ThinkingBlock creado exitosamente
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
 *         description: El SpaceBlock asignado no existe o datos inválidos
 */
thinkingBlockRouter.post(
  "/",
  validateRequest(createThinkingBlockSchema),
  createThinkingBlock,
)

/**
 * @swagger
 * /thinking-blocks/{id}:
 *   get:
 *     summary: Obtener un ThinkingBlock por ID
 *     description: Obtiene los detalles de un ThinkingBlock específico
 *     tags:
 *       - ThinkingBlocks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del ThinkingBlock
 *     responses:
 *       200:
 *         description: ThinkingBlock obtenido exitosamente
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
 *         description: ThinkingBlock no encontrado
 */
thinkingBlockRouter.get("/:id", getThinkingBlockById)

/**
 * @swagger
 * /thinking-blocks/{id}:
 *   patch:
 *     summary: Actualizar un ThinkingBlock
 *     description: Actualiza la información de un ThinkingBlock existente
 *     tags:
 *       - ThinkingBlocks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del ThinkingBlock a actualizar
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
 *     responses:
 *       200:
 *         description: ThinkingBlock actualizado exitosamente
 *       404:
 *         description: ThinkingBlock no encontrado
 */
thinkingBlockRouter.patch(
  "/:id",
  validateRequest(updateThinkingBlockSchema),
  updateThinkingBlock,
)

/**
 * @swagger
 * /thinking-blocks/{id}:
 *   delete:
 *     summary: Archivar un ThinkingBlock
 *     description: Marca un ThinkingBlock como archivado (soft delete)
 *     tags:
 *       - ThinkingBlocks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del ThinkingBlock a archivar
 *     responses:
 *       200:
 *         description: ThinkingBlock archivado exitosamente
 *       404:
 *         description: ThinkingBlock no encontrado
 */
thinkingBlockRouter.delete("/:id", archiveThinkingBlock)

/**
 * @swagger
 * /thinking-blocks/{id}/duplicate:
 *   post:
 *     summary: Duplicar un ThinkingBlock
 *     description: Crea una copia de un ThinkingBlock existente incluyendo todos sus elementos (CanvasElements)
 *     tags:
 *       - ThinkingBlocks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del ThinkingBlock a duplicar
 *     responses:
 *       201:
 *         description: ThinkingBlock duplicado exitosamente
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
 *         description: ThinkingBlock no encontrado
 */
thinkingBlockRouter.post("/:id/duplicate", duplicateThinkingBlock)

export default thinkingBlockRouter
