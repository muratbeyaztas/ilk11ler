import { useState } from "react";
import useStore from "../store/useStore";
import { Formation, Player, SelectedPlayer } from "../types";
import PlayerSlot from "./PlayerSlot";
import FormationSelector from "./FormationSelector";
import StatisticsModal from "./StatisticsModal";

const formations = {
	[Formation.F_4_4_2]: {
		rows: [
			{ name: "GK", positions: 1 },
			{ name: "Defans", positions: 4 },
			{ name: "Orta Saha", positions: 4 },
			{ name: "Forvet", positions: 2 },
		],
	},
	[Formation.F_4_3_3]: {
		rows: [
			{ name: "GK", positions: 1 },
			{ name: "Defans", positions: 4 },
			{ name: "Orta Saha", positions: 3 },
			{ name: "Forvet", positions: 3 },
		],
	},
	[Formation.F_3_5_2]: {
		rows: [
			{ name: "GK", positions: 1 },
			{ name: "Defans", positions: 3 },
			{ name: "Orta Saha", positions: 5 },
			{ name: "Forvet", positions: 2 },
		],
	},
	[Formation.F_4_2_3_1]: {
		rows: [
			{ name: "GK", positions: 1 },
			{ name: "Defans", positions: 4 },
			{ name: "Defansif Orta", positions: 2 },
			{ name: "Ofansif Orta", positions: 3 },
			{ name: "Forvet", positions: 1 },
		],
	},
	[Formation.F_3_4_3]: {
		rows: [
			{ name: "GK", positions: 1 },
			{ name: "Defans", positions: 3 },
			{ name: "Orta Saha", positions: 4 },
			{ name: "Forvet", positions: 3 },
		],
	},
};

const FieldView = () => {
	const { selectedTeam, formation, selectedPlayers, openModal } = useStore();
	const [selectingPosition, setSelectingPosition] = useState<{
		row: number;
		column: number;
	} | null>(null);
	const [showStatistics, setShowStatistics] = useState(false);

	if (!selectedTeam) {
		return (
			<div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center justify-center min-h-[600px]">
				<svg
					className="w-24 h-24 text-gray-400 mb-4"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M13 10V3L4 14h7v7l9-11h-7z"
					/>
				</svg>
				<h3 className="text-2xl font-bold text-gray-700 mb-2">Takım Seçin</h3>
				<p className="text-gray-500 text-center">
					Sol taraftaki listeden bir takım seçerek kadro kurulumuna
					başlayabilirsiniz
				</p>
			</div>
		);
	}

	const formationConfig = formations[formation];
	const totalPlayers = formationConfig.rows.reduce(
		(acc, row) => acc + row.positions,
		0
	);
	const isLineupComplete = selectedPlayers.length === totalPlayers;

	const handleSave = () => {
		if (!isLineupComplete) {
			alert("Lütfen tüm pozisyonları doldurun");
			return;
		}
		openModal("register");
	};

	return (
		<div className="space-y-4">
			<FormationSelector />

			<div className="bg-gradient-to-b from-green-600 to-green-700 rounded-lg shadow-2xl p-6 relative overflow-hidden">
				{/* Field Lines */}
				<div className="absolute inset-0 opacity-20">
					<div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-full bg-white"></div>
					<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-white rounded-full"></div>
				</div>

				{/* Field Content */}
				<div className="relative space-y-8">
					{formationConfig.rows.map((row, rowIndex) => (
						<div
							key={rowIndex}
							className="flex justify-center items-center gap-4"
						>
							{Array.from({ length: row.positions }).map((_, colIndex) => {
								const position = { row: rowIndex, column: colIndex };
								const selectedPlayer = selectedPlayers.find(
									(sp) =>
										sp.position.row === rowIndex &&
										sp.position.column === colIndex
								);

								return (
									<PlayerSlot
										key={`${rowIndex}-${colIndex}`}
										position={position}
										selectedPlayer={selectedPlayer}
										onSelect={() => setSelectingPosition(position)}
										team={selectedTeam}
									/>
								);
							})}
						</div>
					))}
				</div>

				{/* Formation Info */}
				<div className="absolute top-4 left-4 bg-white bg-opacity-90 rounded-lg px-3 py-1">
					<div className="text-sm font-bold text-gray-800">{formation}</div>
				</div>

				{/* Player Count */}
				<div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-lg px-3 py-1">
					<div className="text-sm font-bold text-gray-800">
						{selectedPlayers.length} / {totalPlayers}
					</div>
				</div>
			</div>

			{/* Action Buttons */}
			<div className="flex gap-4">
				<button
					onClick={handleSave}
					disabled={!isLineupComplete}
					className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-200 ${
						isLineupComplete
							? "bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl"
							: "bg-gray-300 text-gray-500 cursor-not-allowed"
					}`}
				>
					Kadroyu Kaydet
				</button>
				<button
					onClick={() => setShowStatistics(true)}
					className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-all duration-200"
				>
					İstatistikleri Gör
				</button>
			</div>

			{/* Player Selection Modal */}
			{selectingPosition && (
				<PlayerSelectionModal
					position={selectingPosition}
					team={selectedTeam}
					onClose={() => setSelectingPosition(null)}
				/>
			)}

			{/* Statistics Modal */}
			{showStatistics && (
				<StatisticsModal onClose={() => setShowStatistics(false)} />
			)}
		</div>
	);
};

// Player Selection Modal Component
const PlayerSelectionModal = ({
	position,
	team,
	onClose,
}: {
	position: { row: number; column: number };
	team: any;
	onClose: () => void;
}) => {
	const { selectedPlayers, addSelectedPlayer, removeSelectedPlayer } =
		useStore();

	const handleSelectPlayer = (playerId: string) => {
		// Remove if already selected at this position
		const existing = selectedPlayers.find(
			(sp) =>
				sp.position.row === position.row &&
				sp.position.column === position.column
		);
		if (existing) {
			removeSelectedPlayer(existing.playerId);
		}

		// Add new selection
		addSelectedPlayer({ playerId, position });
		onClose();
	};

	const selectedPlayerIds = selectedPlayers.map((sp) => sp.playerId);

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
			<div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
				<div className="p-6 border-b">
					<div className="flex items-center justify-between">
						<h3 className="text-2xl font-bold text-gray-800">Oyuncu Seçin</h3>
						<button
							onClick={onClose}
							className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
						>
							<svg
								className="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>
				</div>

				<div className="p-6 overflow-y-auto max-h-[60vh]">
					<div className="grid grid-cols-2 gap-4">
						{team.players.map((player: Player) => (
							<button
								key={player.id}
								onClick={() => handleSelectPlayer(player.id)}
								disabled={selectedPlayerIds.includes(player.id)}
								className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all ${
									selectedPlayerIds.includes(player.id)
										? "border-gray-300 bg-gray-100 opacity-50 cursor-not-allowed"
										: "border-gray-200 hover:border-red-500 hover:shadow-md cursor-pointer"
								}`}
							>
								<img
									src={player.photo}
									alt={player.name}
									className="w-12 h-12 rounded-full object-cover"
									onError={(e) => {
										(e.target as HTMLImageElement).src =
											"https://via.placeholder.com/50?text=" +
											player.name.charAt(0);
									}}
								/>
								<div className="flex-1 text-left">
									<div className="font-semibold text-gray-800">
										{player.name}
									</div>
									<div className="text-sm text-gray-500">
										#{player.number} - {player.position}
									</div>
								</div>
							</button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default FieldView;
