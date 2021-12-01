const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const testValidation = require('../../validations/test.validation');
const testController = require('../../controllers/test.controller');

const router = express.Router();

router.route('/').post(auth('manageUsers'), validate(testValidation.createTest), testController.createTest);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Test
 *   description: Test API
 */

/**
 * @swagger
 * /test:
 *   post:
 *     summary: Học viết api
 *     description: Đang học cấm chửi
 *     tags: [Test]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *             example:
 *               name: Được
 *     responses:
 *       "201":
 *         description: Create
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Test'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
