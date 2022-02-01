import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";

import { IUsersTokensRepository } from "../IUsersTokenRepository";

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
    usersTokens: UserTokens[] = [];

    async create({
        user_id,
        refresh_token,
        expires_date,
    }: ICreateUserTokenDTO): Promise<UserTokens> {
        const userToken = new UserTokens();

        Object.assign(userToken, {
            expires_date,
            refresh_token,
            user_id,
        });

        this.usersTokens.push(userToken);
        return userToken;
    }

    async findByUserIdAndRefreshToken(
        user_id: string,
        refresh_token: string
    ): Promise<UserTokens> {
        return this.usersTokens.find(
            (ut) => ut.user_id === user_id && ut.refresh_token === refresh_token
        );
    }

    async deleteById(id: string): Promise<void> {
        const userTokenIndex = this.usersTokens.findIndex((ut) => ut.id === id);
        this.usersTokens.splice(userTokenIndex, 1);
    }

    async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
        return this.usersTokens.find(
            (ut) => ut.refresh_token === refresh_token
        );
    }
}

export { UsersTokensRepositoryInMemory };
