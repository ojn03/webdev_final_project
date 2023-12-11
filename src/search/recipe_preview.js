import React from "react";
import "../styles/global-styles.css";
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const REGEX_TO_MATCH = /#recipe_([^\/]+)$/;

function RecipePreview({ apiResult }) {

    const match = apiResult.recipe.uri.match(REGEX_TO_MATCH)[1];

    return (
        <div className="col-md-4 mb-3">
            <Link
                to={`/recipe/${match}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
            >
                <Card>
                    <Card.Img variant="top" src={apiResult.recipe.image} alt={apiResult.recipe.label} />
                    <Card.Body>
                        <Card.Title>{apiResult.recipe.label}</Card.Title>
                    </Card.Body>
                </Card>
            </Link>
        </div>
    );
}

export default RecipePreview;
