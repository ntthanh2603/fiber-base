import axios from './axios.customize';

// const createUserAPI = (fullName, email, password) => {
    
// }

// const updateUserAPI = () => {
    
// }
const fetchHome = () => {
    return axios.get("/");
}
export { 
    // createUserAPI, updateUserAPI
    fetchHome
} 