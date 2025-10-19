import useStore from "../store/useStore";

const Header = () => {
	const { selectedTeam, user } = useStore();

	return (
		<header className="bg-white shadow-md">
			<div className="container mx-auto px-4 py-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-4">
						<div className="flex items-center space-x-2">
							<svg
								className="w-8 h-8 text-red-600"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 5a1 1 0 012 0v4a1 1 0 01-2 0V5zm1 8a1 1 0 100 2 1 1 0 000-2z" />
							</svg>
							<h1 className="text-2xl font-bold text-gray-800">Süper Lig</h1>
						</div>

						{selectedTeam && (
							<div className="hidden md:flex items-center space-x-2 ml-8 px-4 py-2 bg-gray-100 rounded-lg">
								<img
									src={selectedTeam.logo}
									alt={selectedTeam.name}
									className="w-8 h-8 object-contain"
									onError={(e) => {
										(e.target as HTMLImageElement).src =
											"https://via.placeholder.com/50?text=" +
											selectedTeam.name.charAt(0);
									}}
								/>
								<span className="font-semibold text-gray-700">
									{selectedTeam.name}
								</span>
							</div>
						)}
					</div>

					<div className="flex items-center space-x-4">
						{user ? (
							<div className="flex items-center space-x-2">
								<div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
									<svg
										className="w-6 h-6 text-white"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path
											fillRule="evenodd"
											d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
											clipRule="evenodd"
										/>
									</svg>
								</div>
								<span className="text-sm text-gray-600 hidden md:block">
									{user.email || user.phone}
								</span>
							</div>
						) : (
							<div className="text-sm text-gray-500 hidden md:block">
								Kadronuzu kaydetmek için giriş yapın
							</div>
						)}
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
