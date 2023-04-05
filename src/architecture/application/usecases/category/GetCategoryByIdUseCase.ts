import Category from "@/architecture/domain/entities/Category";
import Response from "@/architecture/domain/entities/Response";
import ICategoryRepo from "@/architecture/domain/repositories/ICategoryRepo";

class GetCategoryByIdUseCase {
    private readonly categoryRepo: ICategoryRepo;

    constructor(categoryRepo: ICategoryRepo) {
        this.categoryRepo = categoryRepo;
    }

    async run(id: string): Promise<Response<Category>> {
        const response: Response<Category> = await this.categoryRepo.getOne(id);
        return response;
    }
}

export default GetCategoryByIdUseCase;