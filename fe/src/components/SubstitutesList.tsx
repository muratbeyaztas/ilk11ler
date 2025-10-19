import useStore from "../store/useStore";

const SubstitutesList = () => {
	const { selectedTeam, selectedPlayers } = useStore();

	if (!selectedTeam) {
		return (
			<div className="bg-white rounded-lg shadow-lg p-6">
				<h3 className="text-lg font-bold text-gray-800 mb-4">
					Teknik Direktör & Yedekler
				</h3>
				<div className="text-center py-8 text-gray-500">
					<p>Önce bir takım seçin</p>
				</div>
			</div>
		);
	}

	const selectedPlayerIds = selectedPlayers.map((sp) => sp.playerId);
	const substitutes = selectedTeam.players.filter(
		(p) => !selectedPlayerIds.includes(p.id)
	);

	return (
		<div className="bg-white rounded-lg shadow-lg p-4">
			<h3 className="text-lg font-bold text-gray-800 mb-4">
				Teknik Direktör & Yedekler
			</h3>

			{/* Coach */}
			<div className="mb-6 p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg border-2 border-yellow-400">
				<div className="flex items-center space-x-3">
					<img
						src={selectedTeam.coach.photo}
						alt={selectedTeam.coach.name}
						className="w-16 h-16 rounded-full object-cover border-4 border-yellow-400"
						onError={(e) => {
							(e.target as HTMLImageElement).src =
								"https://via.placeholder.com/64?text=" +
								selectedTeam.coach.name.charAt(0);
						}}
					/>
					<div>
						<div className="text-xs text-yellow-800 font-semibold">
							TEKNİK DİREKTÖR
						</div>
						<div className="font-bold text-gray-800">
							{selectedTeam.coach.name}
						</div>
						<div className="text-sm text-gray-600">
							{selectedTeam.coach.nationality}
						</div>
					</div>
				</div>
			</div>

			{/* Substitutes */}
			<div>
				<h4 className="text-sm font-semibold text-gray-600 mb-3">
					YEDEK OYUNCULAR
				</h4>
				<div className="space-y-2 max-h-[calc(100vh-450px)] overflow-y-auto scrollbar-hide">
					{substitutes.length > 0 ? (
						substitutes.map((player) => (
							<div
								key={player.id}
								className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
							>
								<img
									src={player.photo}
									alt={player.name}
									className="w-12 h-12 rounded-full object-cover border-2 border-gray-300"
									onError={(e) => {
										(e.target as HTMLImageElement).src =
											"https://via.placeholder.com/48?text=" +
											player.name.charAt(0);
									}}
								/>
								<div className="flex-1">
									<div className="font-semibold text-gray-800 text-sm">
										{player.name}
									</div>
									<div className="text-xs text-gray-500">
										#{player.number} - {player.position}
									</div>
								</div>
							</div>
						))
					) : (
						<div className="text-center py-8 text-gray-500">
							<svg
								className="w-12 h-12 mx-auto mb-2 text-gray-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
								/>
							</svg>
							<p className="text-sm">Tüm oyuncular seçildi</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default SubstitutesList;
