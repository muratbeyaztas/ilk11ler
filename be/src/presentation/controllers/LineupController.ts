import { Request, Response } from "express";
import { SaveLineup } from "../../application/use-cases/SaveLineup";
import { LineupRepository } from "../../infrastructure/repositories/LineupRepository";
import { StatisticsRepository } from "../../infrastructure/repositories/StatisticsRepository";
import { Formation } from "../../domain/entities/Team";

export class LineupController {
	private saveLineupUseCase: SaveLineup;

	constructor() {
		const lineupRepository = new LineupRepository();
		const statisticsRepository = new StatisticsRepository();
		this.saveLineupUseCase = new SaveLineup(
			lineupRepository,
			statisticsRepository
		);
	}

	async saveLineup(req: Request, res: Response): Promise<void> {
		try {
			const { userId, teamId, formation, selectedPlayers } = req.body;

			if (!userId || !teamId || !formation || !selectedPlayers) {
				res.status(400).json({
					success: false,
					message: "Tüm alanlar zorunludur",
				});
				return;
			}

			// Validate formation
			if (!Object.values(Formation).includes(formation)) {
				res.status(400).json({
					success: false,
					message: "Geçersiz formasyon",
				});
				return;
			}

			const lineup = await this.saveLineupUseCase.execute({
				userId,
				teamId,
				formation,
				selectedPlayers,
			});

			res.json({
				success: true,
				message: "Kadro başarıyla kaydedildi",
				data: lineup,
			});
		} catch (error) {
			console.error("Kadro kaydetme hatası:", error);
			res
				.status(500)
				.json({
					success: false,
					message: "Kadro kaydedilirken hata oluştu",
					error,
				});
		}
	}

	async getUserLineups(req: Request, res: Response): Promise<void> {
		try {
			const { userId } = req.params;
			const lineupRepository = new LineupRepository();
			const lineups = await lineupRepository.findByUserId(userId);

			res.json({ success: true, data: lineups });
		} catch (error) {
			res
				.status(500)
				.json({
					success: false,
					message: "Kadrolar yüklenirken hata oluştu",
					error,
				});
		}
	}
}
