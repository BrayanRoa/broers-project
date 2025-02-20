import { CustomResponse } from "../../utils/response/custom.response";
import { CreatePasswordResetTokenDto } from "../dtos/reset-password/create-reset-password.dto";
import { ResetPasswordEntity } from "../entities/reset-password/reset-password.entity";


export abstract class PasswordResetTokenDatasource {

    abstract save(dto: CreatePasswordResetTokenDto): Promise<ResetPasswordEntity | CustomResponse>;
    abstract findOneUser(param: string): Promise<ResetPasswordEntity | CustomResponse>;

    abstract deleteResetToken(token: string): Promise<string | CustomResponse>
}