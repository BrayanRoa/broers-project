import { JwtAdapter } from "../../../utils/jwt/jwt";
import { CustomResponse } from "../../../utils/response/custom.response";
import { AuthRepository } from "../../repositories/auth.repository";

export interface RefreshTokenResponse {
    accessToken: string;
}

export interface RefreshTokenUseCase {
    execute(refreshToken: string): Promise<{ accessToken: string } | CustomResponse>;
}

export class RefreshTokenUser implements RefreshTokenUseCase {

    constructor(private authRepository: AuthRepository) { }

    async execute(refreshToken: string): Promise<{ accessToken: string } | CustomResponse> {
        if (!refreshToken) {
            return new CustomResponse("No refresh token provided", 401);
        }

        try {
            // Verificamos si el refreshToken es válido
            const decoded = await JwtAdapter.decodeToken<{ id: string }>(refreshToken);
            if (!decoded) {
                return new CustomResponse("Invalid refresh token", 401);
            }

            // Verificamos si el usuario existe en la base de datos
            const user = await this.authRepository.getOneUser(decoded.id);
            if (!user) {
                return new CustomResponse("User not found", 401);
            }

            // Generamos un nuevo accessToken
            const newAccessToken = await JwtAdapter.generateToken({ id: user }, "15m") as string;

            return { accessToken: newAccessToken };
        } catch (error) {
            return new CustomResponse("Invalid refresh token", 401);
        }
    }
}
