import axios from "axios";
import { VTUBE_API } from "../app/constants";

export const SEARCH_API = `${VTUBE_API}/search`;


export const getSearchResult = async(inputSearch) => {
    let result = null;
    try{
        result = await axios.get(`${SEARCH_API}/result?search=${inputSearch}`)
    }
    catch (e) {
        console.log('getSearchResult API error: ' + e);
    }
    return result;
}

export const getSearchSuggestion = async(inputSearch) =>{
    let result = null;
    try{
        result = await axios.get(`${SEARCH_API}/suggestion`, inputSearch)
    }
    catch (e) {
        console.log('getSearchResult API error: ' + e);
    }
    return result;
}