import { Team, Player, Coach } from "../entities/Team";

export interface ITeamRepository {
	findAll(): Promise<Team[]>;
	findById(id: string): Promise<Team | null>;
	findPlayersByTeamId(teamId: string): Promise<Player[]>;
	findCoachByTeamId(teamId: string): Promise<Coach | null>;
	create(team: Team): Promise<Team>;
	update(id: string, team: Partial<Team>): Promise<Team | null>;
}
