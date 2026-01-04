import { Document } from "mongoose";
export interface IIngredient extends Document {
    name: string;
    scientificName?: string;
    origin?: string;
    purpose?: string[];
    aliases: string[];
    eNumbers: string[];
    safetyScore?: number;
    safetyExplanation?: string;
    ageConsiderations?: {
        children?: string;
    };
    healthConditions?: {
        diabetes?: string;
        bloodPressure?: string;
        digestive?: string;
    };
    disclaimer?: string;
    primary_name?: string;
    functional_class?: string;
    why_used?: string;
    codex_status?: string;
    adi_status?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
declare const _default: import("mongoose").Model<IIngredient, {}, {}, {}, Document<unknown, {}, IIngredient, {}, import("mongoose").DefaultSchemaOptions> & IIngredient & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IIngredient>;
export default _default;
//# sourceMappingURL=Ingredient.d.ts.map