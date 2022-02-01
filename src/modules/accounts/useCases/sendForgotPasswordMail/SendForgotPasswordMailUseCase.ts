import { resolve } from "path";
import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";

import { IUsersRepository } from "@modules/accounts/repositories/IUserRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokenRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { AppError } from "@shared/errors/AppError";

@injectable()
class SendForgotPasswordMailUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("EtherealMailProvider")
        private mailProvider: IMailProvider,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) {}
    async execute(email: string) {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError("User does not exists!");
        }

        const templatePath = resolve(
            __dirname,
            "..",
            "..",
            "views",
            "emails",
            "forgotPassword.hbs"
        );

        const token = uuidV4();

        await this.usersTokensRepository.create({
            refresh_token: token,
            user_id: user.id,
            expires_date: this.dateProvider.addHours(3),
        });

        const variables = {
            name: user.name,
            link: `${process.env.FORGOT_MAIL_URL}${token}`, // TODO
        };

        await this.mailProvider.sendMail(
            email,
            "Recuperação de senha",
            variables,
            templatePath
        );
    }
}

export { SendForgotPasswordMailUseCase };
