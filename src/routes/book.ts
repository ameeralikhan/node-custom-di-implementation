import * as express from 'express';
import BookController from '../controllers/book';

const router = express.Router();
const ctrl = new BookController();

/**
 * @swagger
 * /api/v1/books:
 *   get:
 *     tags:
 *     - "Book"
 *     description: Get book list
 *     responses:
 *       200:
 *         description: A successful response.
 *         schema:
 *          type: object
 *          properties:
 *           meta:
 *             type: object
 *             properties:
 *              status:
 *               type: integer
 *              message:
 *               type: string
 *           data:
 *              type: array
 *              items:
 *                  type: object
 *                  properties:
 *                      id:
 *                          type: integer
 *                      name:
 *                          type: string
 *                      author:
 *                          type: string
 *                      description:
 *                          type: string
 *                      publishedDate:
 *                          type: string
 *                      publisher:
 *                          type: string
 */
router.get(`/`, ctrl.get);

/**
 * @swagger
 * /api/v1/books:
 *   post:
 *     tags:
 *     - "Book"
 *     description: Create a new book
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - in: "body"
 *       name: "body"
 *       required: true
 *       schema:
 *         type: object
 *         properties:
 *           name:
 *             type: string
 *             example: Ulysses
 *     responses:
 *       200:
 *         description: A successful response.
 *         schema:
 *          type: object
 *          properties:
 *           meta:
 *             type: object
 *             properties:
 *              status:
 *               type: integer
 *              message:
 *               type: string
 *           data:
 *             type: object
 *             properties:
 *              id:
 *                  type: integer
 *              name:
 *                  type: string
 *              author:
 *                  type: string
 *              description:
 *                  type: string
 *              publishedDate:
 *                  type: string
 *              publisher:
 *                  type: string
 *       404:
 *         description: Book not found on google search.
 *         schema:
 *          type: object
 *          properties:
 *              status:
 *               type: integer
 *              message:
 *               type: string
 *              stack:
 *               type: string
 */
router.post(`/`, ctrl.create);

/**
 * @swagger
 * /api/v1/books/{id}:
 *   delete:
 *     tags:
 *     - "Book"
 *     description: Delete book from list
 *     parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "ID of book that needs to be removed"
 *       required: true
 *       type: "integer"
 *       format: "int64"
 *     responses:
 *       200:
 *         description: A successful response.
 *         schema:
 *          type: object
 *          properties:
 *           meta:
 *             type: object
 *             properties:
 *              status:
 *               type: integer
 *              message:
 *               type: string
 *       404:
 *         description: Book not found.
 *         schema:
 *          type: object
 *          properties:
 *              status:
 *               type: integer
 *              message:
 *               type: string
 *              stack:
 *               type: string
 */
router.delete(`/:id`, ctrl.remove);

export default router;
