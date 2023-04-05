import Quote from "@/architecture/domain/entities/Quote";
import Response from "@/architecture/domain/entities/Response";
import IQuoteRepo from "@/architecture/domain/repositories/IQuoteRepo";

class GetQuoteByIdUseCase {
    private readonly quoteRepo: IQuoteRepo;

    constructor(quoteRepo: IQuoteRepo) {
        this.quoteRepo = quoteRepo;
    }

    async run(id: string): Promise<Response<Quote>> {
        const response: Response<Quote> = await this.quoteRepo.getOne(id);
        return response;
    }
}

export default GetQuoteByIdUseCase;