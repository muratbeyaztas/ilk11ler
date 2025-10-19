import useStore from "../store/useStore";

const TeamList = () => {
	const { teams, selectedTeam, setSelectedTeam } = useStore();

	return (
		<div className="bg-white rounded-lg shadow-lg p-4">
			<h2 className="text-xl font-bold text-gray-800 mb-4">
				Süper Lig Takımları
			</h2>

			<div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto scrollbar-hide">
				{teams.map((team) => (
					<button
						key={team.id}
						onClick={() => setSelectedTeam(team)}
						className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
							selectedTeam?.id === team.id
								? "bg-red-50 border-2 border-red-500 shadow-md"
								: "bg-gray-50 hover:bg-gray-100 border-2 border-transparent"
						}`}
					>
						<img
							src={team.logo}
							alt={team.name}
							className="w-10 h-10 object-contain"
							onError={(e) => {
								(e.target as HTMLImageElement).src =
									"https://via.placeholder.com/50?text=" + team.name.charAt(0);
							}}
						/>
						<div className="flex-1 text-left">
							<div className="font-semibold text-gray-800">{team.name}</div>
							<div className="text-xs text-gray-500">{team.stadium}</div>
						</div>
						{selectedTeam?.id === team.id && (
							<svg
								className="w-5 h-5 text-red-500"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fillRule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clipRule="evenodd"
								/>
							</svg>
						)}
					</button>
				))}
			</div>

			{teams.length === 0 && (
				<div className="text-center py-8 text-gray-500">
					<svg
						className="w-16 h-16 mx-auto mb-4 text-gray-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<p>Takımlar yükleniyor...</p>
				</div>
			)}
		</div>
	);
};

export default TeamList;
