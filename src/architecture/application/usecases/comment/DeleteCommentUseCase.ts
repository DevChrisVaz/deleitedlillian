import Comment from "@/architecture/domain/entities/Comment";
import Response from "@/architecture/domain/entities/Response";
import ICommentRepo from "@/architecture/domain/repositories/ICommentRepo";

class DeleteCommentUseCase {
    private readonly commentRepo: ICommentRepo;

    constructor(commentRepo: ICommentRepo) {
        this.commentRepo = commentRepo;
    }

    async run(id: string): Promise<Response<Comment>> {
        const response: Response<Comment> = await this.commentRepo.delete(id);
        return response;
    }
}

export default DeleteCommentUseCase;