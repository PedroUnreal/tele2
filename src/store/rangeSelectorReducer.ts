export interface ITariffState {
	tariffOptions: ITariffOptions | null,
	trafficCombo: ITrafficCombo[] | null,
	userTariff: {
		minutes: string,
		gigs: string,
		sms: string,
		messengers: Messenger[],
		price: number,
	} | null,
	messengerPriceCombo: Record<Messenger, number> | null
}

const defaultState: ITariffState = {
	tariffOptions: null,
	trafficCombo: null,
	userTariff: null,
	messengerPriceCombo: null
};

const SET_ALL_TARIFFS_INFO = "SET_ALL_TARIFFS_INFO";
const SET_USER_TARIFF = "SET_USER_TARIFF";

export const actionCreators = {
	addTariffInfoAction: (payload: ITariffState) => ({ type: SET_ALL_TARIFFS_INFO, payload } as const),
	setUserTariffAction: (payload: IUserTariff) => ({ type: SET_USER_TARIFF, payload } as const)
}

type TariffActions = ReturnType<PropertiesTypes<typeof actionCreators>>;

export const rangeSelectorReducer = (state: ITariffState = defaultState, action: TariffActions): ITariffState => {
	switch (action.type) {
		case SET_ALL_TARIFFS_INFO:
			return action.payload;
		case SET_USER_TARIFF:
			return {
				...state,
				userTariff: action.payload,
			};
		default:
			return state;
	}
};


