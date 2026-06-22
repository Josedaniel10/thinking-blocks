import express from "express"
import { getHomeData } from "../controllers/home.controller.js"
const homeRouter = express.Router()

/**
 * @swagger
 * /:
 *   get:
 *     summary: Obtener datos de inicio
 *     description: Obtiene la lista de SpaceBlocks y ThinkingBlocks no archivados en el nivel raíz, ordenados por fecha de actualización
 *     tags:
 *       - Home
 *     responses:
 *       200:
 *         description: Datos de inicio obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     items:
 *                       type: array
 *                       description: Lista de SpaceBlocks y ThinkingBlocks ordenados por fecha de actualización
 *                       items:
 *                         oneOf:
 *                           - type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               title:
 *                                 type: string
 *                               entityType:
 *                                 type: string
 *                                 enum: [space_block, thinking_block]
 *                               updatedAt:
 *                                 type: string
 *                                 format: date-time
 */
homeRouter.get("/", getHomeData)

export default homeRouter
