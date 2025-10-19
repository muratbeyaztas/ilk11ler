import { Request, Response } from "express";
import { GetAllTeams } from "../../application/use-cases/GetAllTeams";
import { GetTeamById } from "../../application/use-cases/GetTeamById";
import { TeamRepository } from "../../infrastructure/repositories/TeamRepository";

export class TeamController {
	private getAllTeamsUseCase: GetAllTeams;
	private getTeamByIdUseCase: GetTeamById;

	constructor() {
		const teamRepository = new TeamRepository();
		this.getAllTeamsUseCase = new GetAllTeams(teamRepository);
		this.getTeamByIdUseCase = new GetTeamById(teamRepository);
	}

	async getAllTeams(req: Request, res: Response): Promise<void> {
		try {
			const teams = await this.getAllTeamsUseCase.execute();
			res.json({ success: true, data: teams });
		} catch (error) {
			res
				.status(500)
				.json({
					success: false,
					message: "Takımlar yüklenirken hata oluştu",
					error,
				});
		}
	}

	async getTeamById(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const team = await this.getTeamByIdUseCase.execute(id);

			if (!team) {
				res.status(404).json({ success: false, message: "Takım bulunamadı" });
				return;
			}

			res.json({ success: true, data: team });
		} catch (error) {
			res
				.status(500)
				.json({
					success: false,
					message: "Takım yüklenirken hata oluştu",
					error,
				});
		}
	}
}
