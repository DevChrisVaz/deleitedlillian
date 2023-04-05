import Response from "@/architecture/domain/entities/Response";
import IUserRepo from "@/architecture/domain/repositories/IUserRepo";

class UserLoginUseCase {
    private readonly userRepo: IUserRepo;

    constructor(userRepo: IUserRepo) {
        this.userRepo = userRepo;
    }

    async run(credentials: { userName: string, password: string }): Promise<Response<string>> {
        const response = await this.userRepo.login(credentials);
        return response;
    }
}

export default UserLoginUseCase;