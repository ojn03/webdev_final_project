import axios from "axios";
const request = axios.create({
	withCredentials: true
});
export const BASE_API = process.env.REACT_APP_API_BASE;

// users
export const USERS_API = `${BASE_API}/api/users`;

export const createUser = async (user) => {
	const response = await request.post(`${USERS_API}`, user);
	return response.data;
};

export const findAllUsers = async () => {
	const response = await request.get(`${USERS_API}`);
	return response.data;
};

export const findUserById = async (id) => {
	const response = await request.get(`${USERS_API}/${id}`);
	return response.data;
};

export const updateUser = async (user) => {
	const response = await request.put(`${USERS_API}/${user._id}`, user);
	return response.data;
};

export const deleteUser = async (id) => {
	const response = await request.delete(`${USERS_API}/${id}`);
	return response.data;
};

export const signup = async (credentials) => {
	const response = await request.post(`${USERS_API}/signup`, credentials);
	return response.data;
};
export const signin = async (credentials) => {
	const response = await request.post(`${USERS_API}/signin`, credentials);
	return response.data;
};
export const signout = async () => {
	const response = await request.post(`${USERS_API}/signout`);
	return response.data;
};
export const account = async () => {
	const response = await request.get(`${USERS_API}/account`);
	return response.data;
};
export const follow = async (id) => {
	const response = await request.post(`${USERS_API}/${id}/follow`);
	return response.data;
};
export const unfollow = async (id) => {
	const response = await request.post(`${USERS_API}/${id}/unfollow`);
	return response.data;
};
export const likedRecipes = async (id) => {
	const response = await request.get(`${USERS_API}/${id}/likedRecipes`);
	return response.data;
};
export const addLikedRecipe = async (id, recipe) => {
	const response = await request.post(
		`${USERS_API}/${id}/likedRecipes`,
		recipe
	);
	return response.data;
};
export const removeLikedRecipe = async (id, recipe) => {
	const response = await request.delete(
		`${USERS_API}/${id}/likedRecipes`,
		recipe
	);
	return response.data;
};

export const followers = async (id) => {
	const response = await request.get(`${USERS_API}/${id}/followers`);
	return response.data;
};
export const following = async (id) => {
	const response = await request.get(`${USERS_API}/${id}/following`);
	return response.data;
};

// recipes
const recipesbase = `${BASE_API}/api/recipes`;

export const createRecipe = async (recipe) => {
	const response = await request.post(`${recipesbase}`, recipe);
	return response.data;
};

export const findAllRecipes = async () => {
	const response = await request.get(`${recipesbase}`);
	return response.data;
};

export const findRecipeById = async (id) => {
	const response = await request.get(`${recipesbase}/${id}`);
	return response.data;
};

export const deleteRecipe = async (id) => {
	const response = await request.delete(`${recipesbase}/${id}`);
	return response.data;
};

export const findComments = async (id) => {
	const recipe = await findRecipeById(id);
	return recipe.comments;
};

export const deleteComment = async (recipeId, commentId) => {
	const response = await request.delete(
		`${recipesbase}/${recipeId}/comments/${commentId}`
	);
	return response.data;
};

export const addLike = async (recipeId) => {
	const response = await request.post(`${recipesbase}/${recipeId}/likes`);
	return response.data;
};
export const removeLike = async (recipeId) => {
	const response = await request.delete(`${recipesbase}/${recipeId}/likes`);
	return response.data;
};
