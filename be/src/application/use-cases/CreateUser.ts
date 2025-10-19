import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { User } from "../../domain/entities/UserLineup";

interface CreateUserInput {
	email?: string;
	phone?: string;
}

export class CreateUser {
	constructor(private userRepository: IUserRepository) {}

	async execute(
		input: CreateUserInput
	): Promise<{ user: User; verificationCode: string }> {
		// Generate 6-digit verification code
		const verificationCode = Math.floor(
			100000 + Math.random() * 900000
		).toString();

		// Set expiry to 10 minutes from now
		const verificationCodeExpiry = new Date();
		verificationCodeExpiry.setMinutes(verificationCodeExpiry.getMinutes() + 10);

		// Check if user already exists
		let existingUser: User | null = null;
		if (input.email) {
			existingUser = await this.userRepository.findByEmail(input.email);
		} else if (input.phone) {
			existingUser = await this.userRepository.findByPhone(input.phone);
		}

		let user: User;
		if (existingUser) {
			// Update verification code
			user = (await this.userRepository.update(existingUser.id, {
				verificationCode,
				verificationCodeExpiry,
				isVerified: false,
			})) as User;
		} else {
			// Create new user
			user = await this.userRepository.create({
				email: input.email,
				phone: input.phone,
				verificationCode,
				verificationCodeExpiry,
				isVerified: false,
				createdAt: new Date(),
			});
		}

		return { user, verificationCode };
	}
}
