import Product from "@/architecture/domain/entities/Product";
import Response from "@/architecture/domain/entities/Response";
import IProductRepo from "@/architecture/domain/repositories/IProductRepo";

class GetAllProductsUseCase {
    private readonly productRepo: IProductRepo;

    constructor(productRepo: IProductRepo) {
        this.productRepo = productRepo;
    }

    async run(): Promise<Response<Product[]>> {
        const response: Response<Product[]> = await this.productRepo.getAll();
        return response;
    }
}

export default GetAllProductsUseCase;