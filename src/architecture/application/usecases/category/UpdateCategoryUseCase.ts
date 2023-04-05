import Category from "@/architecture/domain/entities/Category";
import Response from "@/architecture/domain/entities/Response";
import ICategoryRepo from "@/architecture/domain/repositories/ICategoryRepo";

class UpdateCategoryUseCase {
    private readonly categoryRepo: ICategoryRepo;

    constructor(categoryRepo: ICategoryRepo) {
        this.categoryRepo = categoryRepo;
    }

    async run(id: string, category: Category): Promise<Response<Category>> {
        const response: Response<Category> = await this.categoryRepo.update(id, category);
        return response;
    }
}

export default UpdateCategoryUseCase;