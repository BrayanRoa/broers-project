import { Request, Response } from "express";
import { AuthRepository } from "../../domain/repositories/auth.repository";
import { RegisterUser } from "../../domain/use-cases/auth/register-user";
import { BcryptPasswordHasher } from "../../utils/passwordHasher/bcryptPasswordHasher";
import { CustomResponse } from "../../utils/response/custom.response";
import { LoginUser } from "../../domain/use-cases/auth/login-user";
import { EmailService } from "../../utils/emails/email.service";
import { envs } from "../../config/envs";
import { ValidateEmail } from "../../domain/use-cases/auth/validate-email";
import { PasswordRecovery } from "../../domain/use-cases/auth/recovery-password";
import { container } from "../../infraestructure/dependencies/container";
import { ChangePassword } from "../../domain/use-cases/auth/change-password";
import { RefreshTokenUser } from "../../domain/use-cases/auth/refresh-token";

export class AuthController {
    constructor(
        private readonly authRepository: AuthRepository,
    ) { }

    public login = async (req: Request, res: Response) => {
        const { email, password } = req.body
        return new LoginUser(this.authRepository, new BcryptPasswordHasher())
            .execute(email, password)
            .then(auth => CustomResponse.handleResponse(res, auth, 200))
            .catch(err => CustomResponse.handleResponse(res, err))
    }

    public register = async (req: Request, res: Response) => {
        const emailService = new EmailService(envs.MAILER_SERVICE, envs.MAILER_EMAIL, envs.MAILER_SECRET_KEY)
        new RegisterUser(this.authRepository, emailService)
            .execute(req.body)
            .then(auth => CustomResponse.handleResponse(res, auth, 201))
            .catch(err => CustomResponse.handleResponse(res, err));
    }

    public recoveryPassword = async (req: Request, res: Response) => {
        const { email } = req.body
        new PasswordRecovery(
            this.authRepository,
            container.cradle.emailService,
            container.cradle.resetPasswordRepository).execute(email)
            .then(auth => CustomResponse.handleResponse(res, auth, 201))
            .catch(err => CustomResponse.handleResponse(res, err));
    }

    public changePassword = async (req: Request, res: Response) => {
        const { password } = req.body
        const token = req.params.token;
        new ChangePassword(
            this.authRepository,
            container.cradle.passwordHasher,
            container.cradle.resetPasswordRepository)
            .execute(token, password)
            .then(auth => CustomResponse.handleResponse(res, auth, 200))
            .catch(err => CustomResponse.handleResponse(res, err));
    }

    public refreshToken = async (req: Request, res: Response) => {
        const { refreshToken } = req.body;

        new RefreshTokenUser(
            this.authRepository)
            .execute(refreshToken)
            .then(auth => CustomResponse.handleResponse(res, auth, 200))
            .catch(err => CustomResponse.handleResponse(res, err));
    }

    public validateEmail = async (req: Request, res: Response) => {
        const { token } = req.params;
        new ValidateEmail(this.authRepository)
            .execute(token)
            .then(auth => CustomResponse.handleResponse(res, auth, 200))
            .catch(err => CustomResponse.handleResponse(res, err));
    }
}