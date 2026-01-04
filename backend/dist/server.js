"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const ingredientRoutes_1 = __importDefault(require("./routes/ingredientRoutes"));
const scanRoutes_1 = __importDefault(require("./routes/scanRoutes"));
const db_1 = __importDefault(require("./config/db"));
const errorHandler_1 = require("./middleware/errorHandler");
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", (_req, res) => {
    res.send("API running (TypeScript)");
});
app.use('/api/ingredients', ingredientRoutes_1.default);
app.use('/api/scan', scanRoutes_1.default);
app.use(errorHandler_1.errorHandler);
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is running' });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=server.js.map