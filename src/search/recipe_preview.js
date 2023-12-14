import React from "react";
import "../styles/global-styles.css";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import "./search-styles.css";

const REGEX_TO_MATCH = /#recipe_([^\/]+)$/;

export const getRecipeIdFromUri = (uri) => {
	return uri.match(REGEX_TO_MATCH)[1];
}

function RecipePreview({ apiResult }) {
	// 	const match = REGEX_TO_MATCH.exec(apiResult.recipe.uri);
	const match = apiResult.recipe.uri.match(REGEX_TO_MATCH)[1];

	return (
		<div className="col-md-4 mb-3">
			<Link
				to={`/recipe/${match}`}
				style={{ textDecoration: "none", color: "inherit" }}>

				<div className="wd-search-card">
					<img
						variant="top"
						src={apiResult.recipe.image}
						alt={apiResult.recipe.label}
						className="wd-search-img"
					/>
					<div className="p-2">
						<h2 className="wd-sub-title text-stone-600">{apiResult.recipe.label}</h2>
					</div>
				</div>

			</Link>
		</div>
	);

}

export default RecipePreview;
