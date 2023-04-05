import Category from "@/architecture/domain/entities/Category";
import Response from "@/architecture/domain/entities/Response";
import CategoryErrors from "@/architecture/domain/entities/errors/CategoryErrors";
import CreateCategoryException from "@/architecture/domain/exceptions/category-exceptions/CreateCategoryException";
import ICategoryRepo from "@/architecture/domain/repositories/ICategoryRepo";
import ICategoryValidationsRepo from "@/architecture/domain/repositories/validations/ICategoryValidationsRepo";

class CreateCategoryUseCase {
    private readonly categoryRepo: ICategoryRepo;
    private readonly categoryValidationsRepo: ICategoryValidationsRepo;

    constructor(
        categoryRepo: ICategoryRepo,
        categoryValidationRepo: ICategoryValidationsRepo
    ) {
        this.categoryRepo = categoryRepo;
        this.categoryValidationsRepo = categoryValidationRepo;
    }

    async run(category: Category): Promise<Response<Category>> {
        const errors: CategoryErrors | null = await this.categoryValidationsRepo.create(category);
        if (errors) throw new CreateCategoryException(errors);
        const response: Response<Category> | any = await this.categoryRepo.create(category);
        return response;
    }
}

export default CreateCategoryUseCase;