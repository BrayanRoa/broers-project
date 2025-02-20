import { createContainer, asClass, InjectionMode, AwilixContainer } from 'awilix';
import { AuthDatasourceImp } from '../datasource/auth.datasource.imp';
import { AuthRepositoryImpl } from '../repositories/auth.repository.imp';
import { BcryptPasswordHasher } from '../../utils/passwordHasher/bcryptPasswordHasher';
import { EmailService } from '../../utils/emails/email.service';
import { envs } from './../../config/envs';
import { UserDatasourceImp } from '../datasource/user.datasource.imp';
import { UserRepositoryImpl } from '../repositories/user.repository.imp';
import { PasswordResetTokenDatasourceImp } from '../datasource/reset-password-token.datasource.imp';
import { PasswordResetTokenRepositoryImp } from '../repositories/reset-password-token.repository.imp';

interface IContainer {
    passwordHasher: BcryptPasswordHasher,
    authDatasource: AuthDatasourceImp,
    authRepository: AuthRepositoryImpl,
    emailService: EmailService,
    resetPasswordDatasource: PasswordResetTokenDatasourceImp,
    resetPasswordRepository: PasswordResetTokenRepositoryImp
}

export const container: AwilixContainer<IContainer> = createContainer<IContainer>({
    injectionMode: InjectionMode.CLASSIC,
    strict: true
});
;
container.register({
    passwordHasher: asClass(BcryptPasswordHasher).singleton(),
    authDatasource: asClass(AuthDatasourceImp).singleton(),
    authRepository: asClass(AuthRepositoryImpl).singleton(),
    emailService: asClass(EmailService).singleton().inject(() => ({
        mailService: envs.MAILER_SERVICE,
        mailerEmail: envs.MAILER_EMAIL,
        senderEmailPassword: envs.MAILER_SECRET_KEY
    })),
    resetPasswordDatasource: asClass(PasswordResetTokenDatasourceImp).singleton(),
    resetPasswordRepository: asClass(PasswordResetTokenRepositoryImp).singleton(),
});