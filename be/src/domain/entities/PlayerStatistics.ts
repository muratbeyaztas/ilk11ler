export interface PlayerStatistics {
	playerId: string;
	teamId: string;
	position: string;
	timesSelected: number;
	lastUpdated: Date;
}

export interface PositionStatistics {
	position: string;
	playerSelections: {
		playerId: string;
		playerName: string;
		count: number;
	}[];
}
