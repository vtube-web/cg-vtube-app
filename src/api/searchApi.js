import axios from "axios";

export const SEARCH_API = "http://localhost:8080/api/search";


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