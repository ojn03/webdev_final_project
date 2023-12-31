import axios from "axios";

const KEY = process.env.REACT_APP_RECIPE_API_KEY;
const RECIPE_API = "https://api.edamam.com/api/recipes/v2";
const NAPSTER_IMAGE_URL = "https://api.napster.com/imageserver/v2";
const APP_ID = process.env.REACT_APP_RECIPE_APP_ID || '83c6cb3e';
export const albumImageUrl = (album) =>
    `${NAPSTER_IMAGE_URL}/albums/${album.id}
/images/300x300.jpg`;

export const fetchRecipeByQuery = async (query) => {

    const params = {
        q: query,
        app_key: KEY,
        type: 'public',
        app_id: APP_ID,
    };

    const apiUrl = `${RECIPE_API}?${new URLSearchParams(params)}`;

    try {
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error.message);
        throw error; // Re-throw the error to propagate it further if needed
    }
};

export const fetchRecipeById = async (id) => {
    const params = {
        app_key: KEY,
        type: 'public',
        app_id: APP_ID,
    };

    const apiUrl = `${RECIPE_API}/${id}?${new URLSearchParams(params)}`;
    try {
        const response = await axios.get(apiUrl);
        console.log(response.data.recipe)
        return response.data.recipe;
    } catch (error) {
        console.error('Error fetching data:', error.message);
        throw error; // Re-throw the error to propagate it further if needed
    }
};