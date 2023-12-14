import axios from "axios";
const request = axios.create({
	withCredentials: true
});
const BASE_API = process.env.REACT_APP_API_BASE;

//likes
const LIKES_API = `${BASE_API}/api/likes`;

export const findAllLikes = async () => {
	const response = await request.get(`${LIKES_API}`);
	return response.data;
};

export const findLikeById = async (id) => {
	const response = await request.get(`${LIKES_API}/${id}`);
	return response.data;
};
export const findLikesByRecipeId = async (recipeId) => {
	const response = await request.get(`${LIKES_API}/recipe/${recipeId}`);
	return response.data;
};
export const findLikesByAuthorId = async (userId) => {
	const response = await request.get(`${LIKES_API}/author/${userId}`);
	return response.data;
};

export const createLike = async (like) => {
	const response = await request.post(`${LIKES_API}`, like);
	return response.data;
};

export const deleteLike = async (id) => {
	const response = await request.delete(`${LIKES_API}/${id}`);
	return response.data;
};
export const deleteLikeByRecipeId = async (recipeId) => {
	const response = await request.delete(`${LIKES_API}/recipe/${recipeId}`);
	return response.data;
};
export const deleteLikeByAuthorId = async (userId) => {
	const response = await request.delete(`${LIKES_API}/author/${userId}`);
	return response.data;
};

// comments
const COMMENTS_API = `${BASE_API}/api/comments`;

export const findAllComments = async () => {
	const response = await request.get(`${COMMENTS_API}`);
	return response.data;
};

export const findCommentById = async (id) => {
	const response = await request.get(`${COMMENTS_API}/${id}`);
	return response.data;
};
export const findCommentsByRecipeId = async (recipeId) => {
	const response = await request.get(`${COMMENTS_API}/recipe/${recipeId}`);
	return response.data;
};
export const findCommentsByAuthorId = async (userId) => {
	const response = await request.get(`${COMMENTS_API}/author/${userId}`);
	return response.data;
};

export const createComment = async (comment) => {
	const response = await request.post(`${COMMENTS_API}`, comment);
	return response.data;
};

export const updateComment = async (commentId, text) => {
	const response = await request.put(`${COMMENTS_API}/${commentId}`, text);
	return response.data;
};

export const deleteComment = async (recipeId) => {
	const response = await request.delete(`${COMMENTS_API}/${recipeId}`);
	return response.data;
};

export const deleteCommentByRecipeId = async (recipeId) => {
	const response = await request.delete(`${COMMENTS_API}/recipe/${recipeId}`);
	return response.data;
};
export const deleteCommentByAuthorId = async (userId) => {
	const response = await request.delete(`${COMMENTS_API}/author/${userId}`);
	return response.data;
};

// users
const USERS_API = `${BASE_API}/api/users`;

export const createChef = async (user) => {
	const response = await request.post(`${USERS_API}/chef`, user);
	return response.data;
};
export const createBasicUser = async (user) => {
	const response = await request.post(`${USERS_API}/basicUser`, user);
	return response.data;
};

export const findAllUsers = async () => {
	const response = await request.get(`${USERS_API}`);
	return response.data;
};

export const findAllChefs = async () => {
	const response = await request.get(`${USERS_API}/chefs`);
	return response.data;
};

export const findAllBasicUsers = async () => {
	const response = await request.get(`${USERS_API}/basicUsers`);
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
	if (response.status >= 400) {
		// Check if the response has a data property
		const responseData = response.data || {};

		// Handle the error condition using both status code and response data
		throw new Error(`Request failed with status ${response.status}. Response data: ${JSON.stringify(responseData)}`);
	}
	return response.data;
};
export const signin = async (credentials) => {
	const response = await request.post(`${USERS_API}/signin`, credentials);
	if (response.status >= 400) {
		// Check if the response has a data property
		const responseData = response.data || {};

		// Handle the error condition using both status code and response data
		throw new Error(`Request failed with status ${response.status}. Response data: ${JSON.stringify(responseData)}`);
	}
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

export const findFollowers = async (id) => {
	const response = await request.get(`${USERS_API}/${id}/followers`);
	return response.data;
};
export const findFollowing = async (id) => {
	const response = await request.get(`${USERS_API}/${id}/following`);
	return response.data;
};

// recipes
// const recipesbase = `${BASE_API}/api/recipes`;

// export const createRecipe = async (recipe) => {
// 	const response = await request.post(`${recipesbase}`, recipe);
// 	return response.data;
// };

// export const findAllRecipes = async () => {
// 	const response = await request.get(`${recipesbase}`);
// 	return response.data;
// };

// export const findRecipeById = async (id) => {
// 	const response = await request.get(`${recipesbase}/${id}`);
// 	return response.data;
// };

// export const deleteRecipe = async (id) => {
// 	const response = await request.delete(`${recipesbase}/${id}`);
// 	return response.data;
// };
