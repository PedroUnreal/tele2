import { RootState } from "./index";

export const selectors = {
	getTariffOptions: (state: RootState) => state.rangeSelectors.tariffOptions,
	getTrafficCombo: (state: RootState) => state.rangeSelectors.trafficCombo,
	getUserTariff: (state: RootState) => state.rangeSelectors.userTariff,
}