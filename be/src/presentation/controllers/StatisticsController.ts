import { Request, Response } from "express";
import { GetStatistics } from "../../application/use-cases/GetStatistics";
import { StatisticsRepository } from "../../infrastructure/repositories/StatisticsRepository";

export class StatisticsController {
	private getStatisticsUseCase: GetStatistics;

	constructor() {
		const statisticsRepository = new StatisticsRepository();
		this.getStatisticsUseCase = new GetStatistics(statisticsRepository);
	}

	async getTeamStatistics(req: Request, res: Response): Promise<void> {
		try {
			const { teamId } = req.params;
			const statistics = await this.getStatisticsUseCase.getTeamStatistics(
				teamId
			);

			res.json({ success: true, data: statistics });
		} catch (error) {
			res
				.status(500)
				.json({
					success: false,
					message: "İstatistikler yüklenirken hata oluştu",
					error,
				});
		}
	}

	async getPositionStatistics(req: Request, res: Response): Promise<void> {
		try {
			const { teamId, position } = req.params;
			const statistics = await this.getStatisticsUseCase.getPositionStatistics(
				teamId,
				position
			);

			res.json({ success: true, data: statistics });
		} catch (error) {
			res
				.status(500)
				.json({
					success: false,
					message: "İstatistikler yüklenirken hata oluştu",
					error,
				});
		}
	}
}
