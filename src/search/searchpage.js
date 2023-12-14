import React, { useEffect, useState } from "react";
import "../styles/global-styles.css";
import { fetchRecipe, fetchRecipeByQuery } from "./recipe-service";
import { Button, Card } from "react-bootstrap";
import RecipePreview from "./recipe_preview";
import "./search-styles.css";
import { useLocation, useNavigate } from "react-router-dom";

function Search() {
	const location = useLocation();
	const navigate = useNavigate();
	const [data, setData] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [prevSearchTerm, setPrevSearchTerm] = useState();

	useEffect(() => {
		const queryParams = new URLSearchParams(location.search);
		const query = queryParams.get("query");
		if (query) {
			handleFetchRecipe(query);
			setSearchTerm(query)
		}
		else {
			setData([]);
		}
	}, [location.search]);

	const handleInputChange = (e) => {
		setSearchTerm(e.target.value);
	};

	const handleFetchRecipe = async (query) => {
		try {
			const result = await fetchRecipeByQuery(query); // Assuming you have a fetchRecipe function
			setData(result || []);
			setPrevSearchTerm(query);
		} catch (error) {
			console.error("Error fetching recipe:", error);
			setPrevSearchTerm(query);
		}
	};

	return (
		<div className="m-6 w-full">
			<input
				type="text"
				placeholder="Type here..."
				value={searchTerm}
				onChange={handleInputChange}
				className="form-control mb-3 wd-input"
			/>
			<Button
				onClick={() => navigate(`/search?query=${searchTerm}`)}
				variant="primary"
				className="mb-3 wd-btn">
				Fetch Recipe
			</Button>
			<div className="row flex flex-row flex-wrap wd-search-results">
				{data.hits &&
					data.hits.map(
						(hit, index) => {
							if (
								hit.recipe.instructionLines &&
								hit.recipe.instructionLines.length === 0
							) {
								return undefined;
							}
							return (
								<RecipePreview apiResult={hit} key={index} />
							);
						}

						//             <RecipePreview apiResult={hit} key={index}/>
					)}
				{data.hits && data.hits.length === 0 && (
					<div className="text-stone-600">
						No results matching "{prevSearchTerm}"
					</div>
				)}
			</div>
		</div >
	);
}

export default Search;
