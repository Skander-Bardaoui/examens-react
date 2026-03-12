import axios from "axios"

const API_URL="http://localhost:3001/projects"
export const getProjects= async ()=>{
    try{
        const response =await axios.get(API_URL);
        return response.data;

    }catch (error) {
        alert ("erreur list produit")
    }
}