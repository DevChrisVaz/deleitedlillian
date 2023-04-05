import Comment from "@/architecture/domain/entities/Comment";
import Response from "@/architecture/domain/entities/Response";
import CommentErrors from "@/architecture/domain/entities/errors/CommentErrors";
import CreateCommentException from "@/architecture/domain/exceptions/comment-exceptions/CreateCommentException";
import ICommentRepo from "@/architecture/domain/repositories/ICommentRepo";
import ICommentValidationsRepo from "@/architecture/domain/repositories/validations/ICommentValidationsRepo";

class CreateCommentUseCase {
    private readonly commentRepo: ICommentRepo;
    private readonly commentValidationsRepo: ICommentValidationsRepo;

    constructor(
        commentRepo: ICommentRepo,
        commentValidationRepo: ICommentValidationsRepo
    ) {
        this.commentRepo = commentRepo;
        this.commentValidationsRepo = commentValidationRepo;
    }

    async run(comment: Comment): Promise<Response<Comment>> {
        const errors: CommentErrors | null = await this.commentValidationsRepo.create(comment);
        if (errors) throw new CreateCommentException(errors);
        const response: Response<Comment> | any = await this.commentRepo.create(comment);
        return response;
    }
}

export default CreateCommentUseCase;