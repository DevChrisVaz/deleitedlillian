import Product from "@/architecture/domain/entities/Product";
import Response from "@/architecture/domain/entities/Response";
import IProductRepo from "@/architecture/domain/repositories/IProductRepo";

class UpdateProductUseCase {
    private readonly productRepo: IProductRepo;

    constructor(productRepo: IProductRepo) {
        this.productRepo = productRepo;
    }

    async run(id: string, product: Product): Promise<Response<Product>> {        
        const response: Response<Product> = await this.productRepo.update(id, product);
        return response;
    }
}

export default UpdateProductUseCase;