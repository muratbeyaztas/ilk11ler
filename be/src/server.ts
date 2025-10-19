import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDatabase } from "./infrastructure/database/connection";
import routes from "./presentation/routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", routes);

// Health check
app.get("/health", (req, res) => {
	res.json({ status: "OK", message: "Süper Lig API çalışıyor" });
});

// Start server
const startServer = async () => {
	try {
		await connectDatabase();

		app.listen(PORT, () => {
			console.log(`🚀 Server ${PORT} portunda çalışıyor`);
			console.log(`📝 API: http://localhost:${PORT}/api`);
			console.log(`💚 Health: http://localhost:${PORT}/health`);
		});
	} catch (error) {
		console.error("Server başlatma hatası:", error);
		process.exit(1);
	}
};

startServer();

export default app;
