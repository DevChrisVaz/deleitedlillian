import Ingredient from "@/architecture/domain/entities/Ingredient";
import Response from "@/architecture/domain/entities/Response";
import IIngredientRepo from "@/architecture/domain/repositories/IIngredientRepo";

class DeleteIngredientUseCase {
    private readonly ingredientRepo: IIngredientRepo;

    constructor(ingredientRepo: IIngredientRepo) {
        this.ingredientRepo = ingredientRepo;
    }

    async run(id: string): Promise<Response<Ingredient>> {
        const response: Response<Ingredient> = await this.ingredientRepo.delete(id);
        return response;
    }
}

export default DeleteIngredientUseCase;