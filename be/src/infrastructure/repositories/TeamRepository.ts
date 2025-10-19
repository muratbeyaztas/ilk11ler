import { ITeamRepository } from "../../domain/repositories/ITeamRepository";
import { Team, Player, Coach } from "../../domain/entities/Team";
import { TeamModel } from "../database/models/TeamModel";

export class TeamRepository implements ITeamRepository {
	async findAll(): Promise<Team[]> {
		const teams = await TeamModel.find();
		return teams.map((team) => this.mapToEntity(team));
	}

	async findById(id: string): Promise<Team | null> {
		const team = await TeamModel.findById(id);
		return team ? this.mapToEntity(team) : null;
	}

	async findPlayersByTeamId(teamId: string): Promise<Player[]> {
		const team = await TeamModel.findById(teamId);
		return team
			? team.players.map((p: any) => ({
					...p.toObject(),
					id: p._id.toString(),
			  }))
			: [];
	}

	async findCoachByTeamId(teamId: string): Promise<Coach | null> {
		const team = await TeamModel.findById(teamId);
		return team && team.coach
			? {
					...(team.coach as any).toObject(),
					id: (team.coach as any)._id.toString(),
			  }
			: null;
	}

	async create(team: Team): Promise<Team> {
		const newTeam = new TeamModel(team);
		const saved = await newTeam.save();
		return this.mapToEntity(saved);
	}

	async update(id: string, team: Partial<Team>): Promise<Team | null> {
		const updated = await TeamModel.findByIdAndUpdate(id, team, { new: true });
		return updated ? this.mapToEntity(updated) : null;
	}

	private mapToEntity(doc: any): Team {
		return {
			id: doc._id.toString(),
			name: doc.name,
			logo: doc.logo,
			stadium: doc.stadium,
			city: doc.city,
			foundedYear: doc.foundedYear,
			colors: doc.colors,
			players: doc.players.map((p: any) => {
				const playerObj = p.toObject ? p.toObject() : p;
				return {
					...playerObj,
					id: p._id ? p._id.toString() : playerObj._id?.toString() || "",
				};
			}),
			coach: {
				...(doc.coach.toObject ? doc.coach.toObject() : doc.coach),
				id: doc.coach._id ? doc.coach._id.toString() : "",
			},
		};
	}
}
