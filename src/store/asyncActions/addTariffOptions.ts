import { AppDispatch, AppGetState } from "../index";
import { actionCreators } from "../rangeSelectorReducer";

export const fetchTariffOptions = () => {
	return (dispatch: AppDispatch) => {
		fetch('api/tariffs', { method: 'get' })
			.then((response) => response.json())
			.then((json) => {
				dispatch(actionCreators.addTariffInfoAction({
					tariffOptions: json.tariffOptions[0], // MirageJS всегда возвращает массив
					trafficCombo: json.trafficCombo,
					userTariff: json.userTariff[0]
				}))
			})
	}
}

export const updateCurrentTariff = (key: string, value: String) => {
	return (dispatch: AppDispatch, getState: AppGetState) => {
		const currentTariff = getState().rangeSelectors.userTariff;
		const updatedTariff = {
			...currentTariff,
			[key]: value
		};

		fetch('api/user-tariff', {
			method: 'put',
			body: JSON.stringify(updatedTariff)
		})
			.then((response) => response.json())
			.then((json) => {
				dispatch(actionCreators.setUserTariffAction(json[0]))
			})
	}
}

export const updateCurrentNetwork = (messenger: Messenger) => {
	return (dispatch: AppDispatch, getState: AppGetState) => {
		const currentTariff = getState().rangeSelectors.userTariff;

		if (currentTariff) {
			const messengerIndex = currentTariff.messengers.indexOf(messenger);

			if (messengerIndex === -1) {
				currentTariff.messengers.push(messenger)
			} else {
				currentTariff.messengers.splice(messengerIndex, 1)
			}

			fetch('api/user-tariff', {
				method: 'put',
				body: JSON.stringify(currentTariff)
			})
				.then((response) => response.json())
				.then((json) => {

					dispatch(actionCreators.setUserTariffAction(json[0]))
				})
		}
	}
}