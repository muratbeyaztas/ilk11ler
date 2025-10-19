import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { User } from "../../domain/entities/UserLineup";

interface VerifyUserInput {
	identifier: string; // email or phone
	code: string;
}

export class VerifyUser {
	constructor(private userRepository: IUserRepository) {}

	async execute(
		input: VerifyUserInput
	): Promise<{ success: boolean; user?: User; message: string }> {
		// Try to find user by email or phone
		let user = await this.userRepository.findByEmail(input.identifier);
		if (!user) {
			user = await this.userRepository.findByPhone(input.identifier);
		}

		if (!user) {
			return {
				success: false,
				message: "Kullanıcı bulunamadı",
			};
		}

		// Check if code matches and is not expired
		if (user.verificationCode !== input.code) {
			return {
				success: false,
				message: "Doğrulama kodu hatalı",
			};
		}

		if (
			user.verificationCodeExpiry &&
			user.verificationCodeExpiry < new Date()
		) {
			return {
				success: false,
				message: "Doğrulama kodu süresi dolmuş",
			};
		}

		// Verify user
		const verified = await this.userRepository.verifyUser(user.id);
		if (verified) {
			const updatedUser = await this.userRepository.findById(user.id);
			return {
				success: true,
				user: updatedUser!,
				message: "Kullanıcı doğrulandı",
			};
		}

		return {
			success: false,
			message: "Doğrulama başarısız",
		};
	}
}
