import useStore from "../store/useStore";
import { Formation } from "../types";

const FormationSelector = () => {
	const { formation, setFormation, setSelectedPlayers } = useStore();

	const handleFormationChange = (newFormation: Formation) => {
		if (formation !== newFormation) {
			// Reset selected players when formation changes
			setSelectedPlayers([]);
			setFormation(newFormation);
		}
	};

	return (
		<div className="bg-white rounded-lg shadow-lg p-4">
			<label className="block text-sm font-semibold text-gray-700 mb-2">
				Formasyon Seçin
			</label>
			<select
				value={formation}
				onChange={(e) => handleFormationChange(e.target.value as Formation)}
				className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:outline-none transition-colors"
			>
				{Object.values(Formation).map((f) => (
					<option key={f} value={f}>
						{f}
					</option>
				))}
			</select>
		</div>
	);
};

export default FormationSelector;
