import { createContext } from "react";

export const AppContext =  createContext()


const currency = '$'

const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    return age;
}

const months = [ "", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]

const slotDateFormat = (slotDate) => {
    const [year, month, day] = slotDate.split('_');
    return `${day} ${months[parseInt(month)]} ${year}`;
}

const AppContextProvider = (props) => {

    const value = {
       calculateAge,
       slotDateFormat,
       currency
    }
    return (
        <AppContext.Provider value = {value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider