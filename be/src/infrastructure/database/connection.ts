import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI =
	process.env.MONGODB_URI || "mongodb://localhost:27017/superlig";

export const connectDatabase = async (): Promise<void> => {
	try {
		await mongoose.connect(MONGODB_URI);
		console.log("✅ MongoDB bağlantısı başarılı");
	} catch (error) {
		console.error("❌ MongoDB bağlantı hatası:", error);
		process.exit(1);
	}
};

export const disconnectDatabase = async (): Promise<void> => {
	try {
		await mongoose.disconnect();
		console.log("MongoDB bağlantısı kapatıldı");
	} catch (error) {
		console.error("MongoDB bağlantı kapatma hatası:", error);
	}
};
