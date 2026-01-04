export interface IStaticIngredient {
    name: string;
    primary_name?: string;
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
    functional_class?: string;
    why_used?: string;
    codex_status?: string;
    adi_status?: string;
}
export declare const ingredientDatabase: IStaticIngredient[];
//# sourceMappingURL=ingredientDatabase.d.ts.map