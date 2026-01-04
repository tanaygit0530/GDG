"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const IngredientSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: false,
        trim: true,
    },
    scientificName: {
        type: String,
    },
    origin: {
        type: String,
    },
    purpose: [{
            type: String,
        }],
    aliases: [{
            type: String,
        }],
    eNumbers: [{
            type: String,
        }],
    safetyScore: {
        type: Number,
    },
    safetyExplanation: {
        type: String,
    },
    ageConsiderations: {
        children: String,
    },
    healthConditions: {
        diabetes: String,
        bloodPressure: String,
        digestive: String,
    },
    disclaimer: {
        type: String,
    },
    primary_name: {
        type: String,
        required: true,
    },
    functional_class: {
        type: String,
        required: true,
    },
    why_used: {
        type: String,
    },
    codex_status: {
        type: String,
    },
    adi_status: {
        type: String,
    },
}, {
    timestamps: true,
    collection: "ingredients",
});
exports.default = (0, mongoose_1.model)("Ingredient", IngredientSchema);
//# sourceMappingURL=Ingredient.js.map