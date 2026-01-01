"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const scanController_1 = require("../controllers/scanController");
const upload_1 = require("../middleware/upload");
const router = (0, express_1.Router)();
router.post('/ocr', upload_1.upload.single('image'), scanController_1.processImageForIngredients);
exports.default = router;
//# sourceMappingURL=scanRoutes.js.map