import React, { useState, useEffect } from 'react';
import '../style/recepie.css';
import { RecepieData } from '../assets/api/ApiData';

function Recepies() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const recipeData = await RecepieData(); // Fetch data from API
            setData(recipeData); // Update state with fetched data
        };

        fetchData();
    }, []);

    return (
        <div className='recepie'>
            <h3>Some Top Recipes</h3>
            <ul className="recipe-list">
                {data.map((recipe) => (
                    <li key={recipe.id} className="recipe-item">
                        <h4>{recipe.name}</h4>
                        <img src={recipe.image} alt={recipe.name} className="recipe-image" />

                        <div className="ingredients-section">
                            <h5>Ingredients</h5>
                            <ul className="ingredients-list">
                                {recipe.ingredients.map((ingredient, index) => (
                                    <li key={index}>{ingredient}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="instructions-section">
                            <h5>Instructions</h5>
                            <ol className="instructions-list">
                                {recipe.instructions.map((instruction, index) => (
                                    <li key={index}>{instruction}</li>
                                ))}
                            </ol>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Recepies;
