import Category from "@/architecture/domain/entities/Category";
import Response from "@/architecture/domain/entities/Response";
import ICategoryRepo from "@/architecture/domain/repositories/ICategoryRepo";

class GetAllCategoriesUseCase {
    private readonly categoryRepo: ICategoryRepo;

    constructor(categoryRepo: ICategoryRepo) {
        this.categoryRepo = categoryRepo;
    }

    async run(): Promise<Response<Category[]>> {
        let response: Response<Category[]> = await this.categoryRepo.getAll();
        return response;
    }
}

export default GetAllCategoriesUseCase;