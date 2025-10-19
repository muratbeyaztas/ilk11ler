import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

export class SmsService {
	private client;
	private fromNumber: string;

	constructor() {
		const accountSid = process.env.TWILIO_ACCOUNT_SID;
		const authToken = process.env.TWILIO_AUTH_TOKEN;
		this.fromNumber = process.env.TWILIO_PHONE_NUMBER || "";

		if (accountSid && authToken) {
			this.client = twilio(accountSid, authToken);
		}
	}

	async sendVerificationCode(phone: string, code: string): Promise<boolean> {
		if (!this.client) {
			console.error("Twilio yapılandırması eksik");
			return false;
		}

		try {
			await this.client.messages.create({
				body: `Süper Lig doğrulama kodunuz: ${code}. Bu kod 10 dakika süreyle geçerlidir.`,
				from: this.fromNumber,
				to: phone,
			});
			return true;
		} catch (error) {
			console.error("SMS gönderme hatası:", error);
			return false;
		}
	}
}
