import express from "express"
import {
  createCanvasElement,
  getCanvasElementById,
  archiveCanvasElement,
  updateCanvasElement,
} from "../controllers/canvasElement.controller.js"
import validateRequest from "../middlewares/validateRequest.js"
import {
  createCanvasElementSchema,
  updateCanvasElementSchema,
} from "../validators/canvasElement.validator.js"

const canvasElementRouter = express.Router()

/**
 * @swagger
 * /canvas-element:
 *   post:
 *     summary: Crear un nuevo CanvasElement
 *     description: Crea un nuevo elemento de lienzo dentro de un ThinkingBlock
 *     tags:
 *       - CanvasElements
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - thinkingBlockId
 *               - type
 *               - bounds
 *             properties:
 *               thinkingBlockId:
 *                 type: string
 *                 description: ID del ThinkingBlock padre
 *               type:
 *                 type: string
 *                 enum: [text, image, video, file, table, drawing, thinking_block_reference]
 *                 default: text
 *                 description: Tipo de elemento del lienzo
 *               bounds:
 *                 type: object
 *                 required:
 *                   - x
 *                   - y
 *                   - width
 *                   - height
 *                 properties:
 *                   x:
 *                     type: number
 *                     description: Posición X del elemento
 *                   y:
 *                     type: number
 *                     description: Posición Y del elemento
 *                   width:
 *                     type: number
 *                     description: Ancho del elemento
 *                   height:
 *                     type: number
 *                     description: Alto del elemento
 *               data:
 *                 type: object
 *                 description: Datos adicionales del elemento (contenido específico según el tipo)
 *     responses:
 *       201:
 *         description: CanvasElement creado exitosamente
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
 *         description: El ThinkingBlock asignado no existe o datos inválidos
 */
canvasElementRouter.post(
  "/",
  validateRequest(createCanvasElementSchema),
  createCanvasElement,
)

/**
 * @swagger
 * /canvas-element/{id}:
 *   get:
 *     summary: Obtener un CanvasElement por ID
 *     description: Obtiene los detalles de un CanvasElement específico
 *     tags:
 *       - CanvasElements
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del CanvasElement
 *     responses:
 *       200:
 *         description: CanvasElement obtenido exitosamente
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
 *         description: CanvasElement no encontrado
 */
canvasElementRouter.get("/:id/", getCanvasElementById)

/**
 * @swagger
 * /canvas-element/{id}:
 *   patch:
 *     summary: Actualizar un CanvasElement
 *     description: Actualiza la información de un CanvasElement existente (posición, tamaño, datos)
 *     tags:
 *       - CanvasElements
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del CanvasElement a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [text, image, video, file, table, drawing, thinking_block_reference]
 *               bounds:
 *                 type: object
 *                 properties:
 *                   x:
 *                     type: number
 *                   y:
 *                     type: number
 *                   width:
 *                     type: number
 *                   height:
 *                     type: number
 *               data:
 *                 type: object
 *     responses:
 *       200:
 *         description: CanvasElement actualizado exitosamente
 *       404:
 *         description: CanvasElement no encontrado
 */
canvasElementRouter.patch(
  "/:id",
  validateRequest(updateCanvasElementSchema),
  updateCanvasElement,
)

/**
 * @swagger
 * /canvas-element/{id}:
 *   delete:
 *     summary: Archivar un CanvasElement
 *     description: Marca un CanvasElement como archivado (soft delete)
 *     tags:
 *       - CanvasElements
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del CanvasElement a archivar
 *     responses:
 *       200:
 *         description: CanvasElement archivado exitosamente
 *       404:
 *         description: CanvasElement no encontrado
 */
canvasElementRouter.delete("/:id", archiveCanvasElement)

export default canvasElementRouter
