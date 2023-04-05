import Quote from "@/architecture/domain/entities/Quote";
import Response from "@/architecture/domain/entities/Response";
import IQuoteRepo from "@/architecture/domain/repositories/IQuoteRepo";

class GetAllQuotesUseCase {
    private readonly quoteRepo: IQuoteRepo;

    constructor(quoteRepo: IQuoteRepo) {
        this.quoteRepo = quoteRepo;
    }

    async run(): Promise<Response<Quote[]>> {
        let response: Response<Quote[]> = await this.quoteRepo.getAll();
        return response;
    }
}

export default GetAllQuotesUseCase;