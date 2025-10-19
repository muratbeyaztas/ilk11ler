import { useEffect } from "react";
import TeamList from "./components/TeamList";
import FieldView from "./components/FieldView";
import SubstitutesList from "./components/SubstitutesList";
import Header from "./components/Header";
import RegisterModal from "./components/RegisterModal";
import VerifyModal from "./components/VerifyModal";
import useStore from "./store/useStore";
import { teamService } from "./services/api";

function App() {
	const { setTeams, isModalOpen, modalType } = useStore();

	useEffect(() => {
		const loadTeams = async () => {
			try {
				const teams = await teamService.getAllTeams();
				setTeams(teams);
			} catch (error) {
				console.error("Takımlar yüklenirken hata:", error);
			}
		};

		loadTeams();
	}, [setTeams]);

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
			<Header />

			<div className="container mx-auto px-4 py-6">
				<div className="grid grid-cols-12 gap-6">
					{/* Left Sidebar - Team List */}
					<div className="col-span-12 lg:col-span-3">
						<TeamList />
					</div>

					{/* Main Content - Field View */}
					<div className="col-span-12 lg:col-span-6">
						<FieldView />
					</div>

					{/* Right Sidebar - Substitutes and Coach */}
					<div className="col-span-12 lg:col-span-3">
						<SubstitutesList />
					</div>
				</div>
			</div>

			{/* Modals */}
			{isModalOpen && modalType === "register" && <RegisterModal />}
			{isModalOpen && modalType === "verify" && <VerifyModal />}
		</div>
	);
}

export default App;
