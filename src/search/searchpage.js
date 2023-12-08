import React, { useEffect, useState } from "react";
import "../styles/global-styles.css";
import { fetchRecipe } from "./recipe-service";
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Make sure to have react-router-dom installed


function Search() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFetchRecipe = async () => {
    try {
      const result = await fetchRecipe(searchTerm); // Assuming you have a fetchRecipe function
      console.log(result)
      setData(result || []);
    } catch (error) {
      console.error("Error fetching recipe:", error);
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Type here..."
        value={searchTerm}
        onChange={handleInputChange}
        className="form-control mb-3"
      />
      <Button onClick={handleFetchRecipe} variant="primary" className="mb-3">
        Fetch Recipe
      </Button>
      <div className="row">
        {data.hits &&
          data.hits.map((hit, index) => (
            <div key={index} className="col-md-4 mb-3">
              <Link
                to={`/recipe/${hit.recipe.uri}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Card>
                  <Card.Img variant="top" src={hit.recipe.image} alt={hit.recipe.label} />
                  <Card.Body>
                    <Card.Title>{hit.recipe.label}</Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Search;
