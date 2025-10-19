import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export class EmailService {
	private transporter;

	constructor() {
		this.transporter = nodemailer.createTransport({
			host: process.env.EMAIL_HOST || "smtp.gmail.com",
			port: parseInt(process.env.EMAIL_PORT || "587"),
			secure: false,
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS,
			},
		});
	}

	async sendVerificationCode(email: string, code: string): Promise<boolean> {
		try {
			await this.transporter.sendMail({
				from: process.env.EMAIL_FROM || "noreply@superlig.com",
				to: email,
				subject: "Süper Lig - Doğrulama Kodu",
				html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #e30613;">Süper Lig - Doğrulama Kodu</h2>
            <p>Merhaba,</p>
            <p>Kadro seçiminizi kaydetmek için aşağıdaki doğrulama kodunu kullanın:</p>
            <div style="background-color: #f5f5f5; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">
              ${code}
            </div>
            <p>Bu kod 10 dakika süreyle geçerlidir.</p>
            <p>İyi günler dileriz!</p>
          </div>
        `,
			});
			return true;
		} catch (error) {
			console.error("Email gönderme hatası:", error);
			return false;
		}
	}
}
