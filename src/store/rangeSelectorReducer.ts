const defaultState = {
    minutes: [],
    gigs: [],
    sms: []
};

const ADD_MINUTES = "ADD_MINUTES"
const ADD_GIGS = "ADD_GIGS"
const ADD_SMS = "ADD_SMS"

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
            return {...state, minutes: action.payload };
        case ADD_GIGS:
            return {...state, gigs: action.payload };
        case ADD_SMS:
            return {...state, sms: action.payload };
        default:
            return state;
    }
};

export const addMinutesAction = (payload: number) => ({ type: ADD_MINUTES, payload })
export const addGigsAction = (payload: number) => ({ type: ADD_GIGS, payload })
export const addSmsAction = (payload: number) => ({ type: ADD_SMS, payload })

// Export a reusable selector here
export const selectors = {
    getGigs: (state: any) => state.rangeSelectors.gigs,
    //getUserById: (state:any, userId:any) => state.users.users.find(user :any => user.id === userId),
}

// const user: User = useSelector(state => selectors.getUserById(state, id));