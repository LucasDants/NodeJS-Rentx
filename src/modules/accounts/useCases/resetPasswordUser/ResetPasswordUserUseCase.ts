import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUserRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokenRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    token: string;
    password: string;
}
@injectable()
class ResetPasswordUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) {}

    async execute({ token, password }: IRequest): Promise<void> {
        const userToken = await this.usersTokensRepository.findByRefreshToken(
            token
        );

        if (!userToken) {
            throw new AppError("Invalid Token");
        }

        const tokenExpired = this.dateProvider.compareIfBefore(
            userToken.expires_date,
            this.dateProvider.dateNow()
        );

        if (tokenExpired) {
            throw new AppError("Expired Token");
        }

        const user = await this.usersRepository.findById(userToken.user_id);

        user.password = await hash(password, 8);

        await this.usersRepository.create(user);

        await this.usersTokensRepository.deleteById(userToken.id);
    }
}

export { ResetPasswordUserUseCase };
