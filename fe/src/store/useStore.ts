import { create } from "zustand";
import { Team, Player, Formation, SelectedPlayer, User } from "../types";

interface AppState {
	// Teams
	teams: Team[];
	selectedTeam: Team | null;
	setTeams: (teams: Team[]) => void;
	setSelectedTeam: (team: Team | null) => void;

	// Formation
	formation: Formation;
	setFormation: (formation: Formation) => void;

	// Selected Players
	selectedPlayers: SelectedPlayer[];
	setSelectedPlayers: (players: SelectedPlayer[]) => void;
	addSelectedPlayer: (player: SelectedPlayer) => void;
	removeSelectedPlayer: (playerId: string) => void;

	// User
	user: User | null;
	setUser: (user: User | null) => void;

	// UI State
	isModalOpen: boolean;
	modalType: "register" | "verify" | null;
	openModal: (type: "register" | "verify") => void;
	closeModal: () => void;

	// Reset
	reset: () => void;
}

const useStore = create<AppState>((set) => ({
	// Teams
	teams: [],
	selectedTeam: null,
	setTeams: (teams) => set({ teams }),
	setSelectedTeam: (team) => set({ selectedTeam: team, selectedPlayers: [] }),

	// Formation
	formation: Formation.F_4_4_2,
	setFormation: (formation) => set({ formation }),

	// Selected Players
	selectedPlayers: [],
	setSelectedPlayers: (players) => set({ selectedPlayers: players }),
	addSelectedPlayer: (player) =>
		set((state) => ({
			selectedPlayers: [...state.selectedPlayers, player],
		})),
	removeSelectedPlayer: (playerId) =>
		set((state) => ({
			selectedPlayers: state.selectedPlayers.filter(
				(p) => p.playerId !== playerId
			),
		})),

	// User
	user: null,
	setUser: (user) => set({ user }),

	// UI State
	isModalOpen: false,
	modalType: null,
	openModal: (type) => set({ isModalOpen: true, modalType: type }),
	closeModal: () => set({ isModalOpen: false, modalType: null }),

	// Reset
	reset: () =>
		set({
			selectedPlayers: [],
			formation: Formation.F_4_4_2,
		}),
}));

export default useStore;
