import { SelectedPlayer, Team } from "../types";

interface PlayerSlotProps {
	position: { row: number; column: number };
	selectedPlayer?: SelectedPlayer;
	onSelect: () => void;
	team: Team;
}

const PlayerSlot = ({
	position,
	selectedPlayer,
	onSelect,
	team,
}: PlayerSlotProps) => {
	const player = selectedPlayer
		? team.players.find((p) => p.id === selectedPlayer.playerId)
		: null;

	return (
		<button
			onClick={onSelect}
			className="relative group transition-all duration-200 hover:scale-110"
		>
			<div className="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center border-4 border-white overflow-hidden group-hover:border-yellow-400 transition-all">
				{player ? (
					<img
						src={player.photo}
						alt={player.name}
						className="w-full h-full object-cover"
						onError={(e) => {
							(e.target as HTMLImageElement).src =
								"https://via.placeholder.com/80?text=" + player.name.charAt(0);
						}}
					/>
				) : (
					<svg
						className="w-10 h-10 text-gray-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 4v16m8-8H4"
						/>
					</svg>
				)}
			</div>

			{player && (
				<div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-md whitespace-nowrap">
					<div className="text-xs font-semibold text-gray-800">
						{player.name}
					</div>
					<div className="text-xs text-gray-500">#{player.number}</div>
				</div>
			)}

			{!player && (
				<div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
					Oyuncu Seç
				</div>
			)}
		</button>
	);
};

export default PlayerSlot;
