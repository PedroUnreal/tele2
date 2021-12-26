const defaultState = {
    minutes: [],
    gigs: [],
    sms: [],
    networks: [],
    tariffOptions: null,
    trafficCombo: null,
    userTariff: null,
};

const ADD_MINUTES = "ADD_MINUTES"
const ADD_GIGS = "ADD_GIGS"
const ADD_SMS = "ADD_SMS"
const ADD_NETWORK = "ADD_NETWORKS"
const DELETE_NETWORK = "DELETE_NETWORK"
const DELETE_ALL_NETWORKS = "DELETE_ALL_NETWORKS"
const ADD_TARIFF_INFO = "ADD_TARIFF_INFO"

// interface User {
//   id: number;
//   firstName: string;
//   lastName: string;
//   picture: string;
//   title: string;
// }

export const rangeSelectorReducer = (state = defaultState, action: any) => {
    switch (action.type) {
        case ADD_MINUTES:
            //return { ...state, rangeSelectors: [...state.rangeSelectors, action.payload] };
            return { ...state, minutes: action.payload };
        case ADD_GIGS:
            return { ...state, gigs: action.payload };
        case ADD_SMS:
            return { ...state, sms: action.payload };
        case ADD_NETWORK:
            return { ...state, networks: [...state.networks, action.payload] };
        case DELETE_NETWORK:
            return { ...state, networks: [...(state.networks.filter(network => network !== action.payload))] };
        case DELETE_ALL_NETWORKS:
            return { ...state, networks: [] };
        case ADD_TARIFF_INFO:
            return { ...state, tariffOptions: action.payload.tariffOptions, trafficCombo: action.payload.trafficCombo,
                userTariff: action.payload.userTariff };
        default:
            return state;
    }
};

export const addMinutesAction = (payload: number) => ({ type: ADD_MINUTES, payload })
export const addGigsAction = (payload: number) => ({ type: ADD_GIGS, payload })
export const addSmsAction = (payload: number) => ({ type: ADD_SMS, payload })
export const addNetworkAction = (payload: string) => ({ type: ADD_NETWORK, payload })
export const deleteNetworkAction = (payload: string) => ({ type: DELETE_NETWORK, payload })
export const deleteAllNetworksAction = () => ({ type: DELETE_ALL_NETWORKS })
export const addTariffInfoAction = (payload: any) => ({ type: ADD_TARIFF_INFO, payload });


// Export a reusable selector here
export const selectors = {
    getGigs: (state: any) => state.rangeSelectors.gigs,
    getNetworks: (state: any) => state.rangeSelectors.networks,
    getTariffOptions: (state: any) => state.rangeSelectors.tariffOptions,
    getTrafficCombo: (state: any) => state.rangeSelectors.trafficCombo,
    getUserTariff: (state: any) => state.rangeSelectors.userTariff,
    getCurrentTariff: (state: any) => state.rangeSelectors
    //getUserById: (state:any, userId:any) => state.users.users.find(user :any => user.id === userId),
}
