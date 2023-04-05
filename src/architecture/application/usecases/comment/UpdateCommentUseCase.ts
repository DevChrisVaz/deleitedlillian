import Comment from "@/architecture/domain/entities/Comment";
import Response from "@/architecture/domain/entities/Response";
import ICommentRepo from "@/architecture/domain/repositories/ICommentRepo";

class UpdateCommentUseCase {
    private readonly commentRepo: ICommentRepo;

    constructor(commentRepo: ICommentRepo) {
        this.commentRepo = commentRepo;
    }

    async run(id: string, comment: Comment): Promise<Response<Comment>> {
        const response: Response<Comment> = await this.commentRepo.update(id, comment);
        return response;
    }
}

export default UpdateCommentUseCase;