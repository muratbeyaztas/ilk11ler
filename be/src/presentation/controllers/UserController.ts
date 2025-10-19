import { Request, Response } from "express";
import { CreateUser } from "../../application/use-cases/CreateUser";
import { VerifyUser } from "../../application/use-cases/VerifyUser";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { EmailService } from "../../infrastructure/services/EmailService";
import { SmsService } from "../../infrastructure/services/SmsService";

export class UserController {
	private createUserUseCase: CreateUser;
	private verifyUserUseCase: VerifyUser;
	private emailService: EmailService;
	private smsService: SmsService;

	constructor() {
		const userRepository = new UserRepository();
		this.createUserUseCase = new CreateUser(userRepository);
		this.verifyUserUseCase = new VerifyUser(userRepository);
		this.emailService = new EmailService();
		this.smsService = new SmsService();
	}

	async register(req: Request, res: Response): Promise<void> {
		try {
			const { email, phone } = req.body;

			if (!email && !phone) {
				res.status(400).json({
					success: false,
					message: "Email veya telefon numarası gerekli",
				});
				return;
			}

			const { user, verificationCode } = await this.createUserUseCase.execute({
				email,
				phone,
			});

			// Send verification code
			let sent = false;
			if (email) {
				sent = await this.emailService.sendVerificationCode(
					email,
					verificationCode
				);
			} else if (phone) {
				sent = await this.smsService.sendVerificationCode(
					phone,
					verificationCode
				);
			}

			if (!sent) {
				res.status(500).json({
					success: false,
					message: "Doğrulama kodu gönderilemedi",
				});
				return;
			}

			res.json({
				success: true,
				message: "Doğrulama kodu gönderildi",
				data: { userId: user.id },
			});
		} catch (error) {
			console.error("Kayıt hatası:", error);
			res
				.status(500)
				.json({
					success: false,
					message: "Kayıt sırasında hata oluştu",
					error,
				});
		}
	}

	async verify(req: Request, res: Response): Promise<void> {
		try {
			const { identifier, code } = req.body;

			if (!identifier || !code) {
				res.status(400).json({
					success: false,
					message: "Email/telefon ve doğrulama kodu gerekli",
				});
				return;
			}

			const result = await this.verifyUserUseCase.execute({ identifier, code });

			if (result.success) {
				res.json({
					success: true,
					message: result.message,
					data: { userId: result.user?.id },
				});
			} else {
				res.status(400).json({ success: false, message: result.message });
			}
		} catch (error) {
			res
				.status(500)
				.json({
					success: false,
					message: "Doğrulama sırasında hata oluştu",
					error,
				});
		}
	}
}
