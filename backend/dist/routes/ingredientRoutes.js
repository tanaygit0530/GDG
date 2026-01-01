"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ingredientController_1 = require("../controllers/ingredientController");
const router = (0, express_1.Router)();
router.get('/:name', ingredientController_1.getIngredientDetails);
exports.default = router;
//# sourceMappingURL=ingredientRoutes.js.map