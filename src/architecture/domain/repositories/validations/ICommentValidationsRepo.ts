import Comment from "../../entities/Comment";
import CommentErrors from "../../entities/errors/CommentErrors";


interface ICommentValidationsRepo {
    create(comment: Comment): Promise<CommentErrors | null>;
}

export default ICommentValidationsRepo;