import Ingredient from "@/architecture/domain/entities/Ingredient";
import Response from "@/architecture/domain/entities/Response";
import IIngredientRepo from "@/architecture/domain/repositories/IIngredientRepo";

class GetAllIngredientsUseCase {
    private readonly ingredientRepo: IIngredientRepo;

    constructor(ingredientRepo: IIngredientRepo) {
        this.ingredientRepo = ingredientRepo;
    }

    async run(): Promise<Response<Ingredient[]>> {
        let response: Response<Ingredient[]> = await this.ingredientRepo.getAll();
        return response;
    }
}

export default GetAllIngredientsUseCase;