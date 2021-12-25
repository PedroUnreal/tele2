import { addTariffInfoAction } from "../rangeSelectorReducer"
export const fetchTariffOptions = () => {
    
   //@ts-ignore 
    return (dispatch, getState) => {
        fetch('api/tariffs', { method: 'get' })
        .then((response) => response.json())
        .then((json) => {
            dispatch(addTariffInfoAction({
                tariffOptions: json.tariffOptions[0],
                trafficCombo: json.trafficCombo,
                userTariff: json.userTariff[0]
            }))
        })
       
        
        console.log('current state:', getState());
    }
}