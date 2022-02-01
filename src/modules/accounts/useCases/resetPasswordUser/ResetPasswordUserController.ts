import { Request, Response } from "express";
import { container } from "tsyringe";

import { ResetPasswordUserUseCase } from "./ResetPasswordUserUseCase";

class ResetPasswordUserController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { token } = req.query;
        const { password } = req.body;
        const resetPasswordUseCase = container.resolve(
            ResetPasswordUserUseCase
        );
        await resetPasswordUseCase.execute({
            token: token as string,
            password,
        });
        return res.send();
    }
}

export { ResetPasswordUserController };
