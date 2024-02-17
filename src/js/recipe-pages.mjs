import { renderWithTemplate, loadHeaderFooter, getParam, getMealById } from "./utils.mjs";

loadHeaderFooter();

async function recipePageTemplate() {
    const page = document.getElementById("recipe");
    const mealID = getParam("recipe");
    const meal = await getMealById(mealID);
    const recipe = `<h1>${meal.meals[0].strMeal}</h1> 
                    <img src="${meal.meals[0].strMealThumb}" alt="Image of ${meal.meals[0].strMeal}">
                    <a href="${meal.meals[0].strYoutube}" alt="YouTube Link">Youtube Video</a>
                    <h3 id="category">${meal.meals[0].strCategory}</h3>
                    <h3 id="area">${meal.meals[0].strArea}</h3>
                    <table id="ingredients">
                    <tr>
                        <th>Ingredients</th>
                        <th>Quantites</th>
                    </tr>
                    <tr>
                        <td>${meal.meals[0].strIngredient1}</td>
                        <td>${meal.meals[0].strMeasure1}</td>
                    </tr> 
                    <tr>
                        <td>${meal.meals[0].strIngredient2}</td>
                        <td>${meal.meals[0].strMeasure2}</td>
                    </tr>
                    <tr>
                        <td>${meal.meals[0].strIngredient3}</td>
                        <td>${meal.meals[0].strMeasure3}</td>
                    </tr>
                    <tr>
                        <td>${meal.meals[0].strIngredient4}</td>
                        <td>${meal.meals[0].strMeasure4}</td>
                    </tr>
                    <tr>
                        <td>${meal.meals[0].strIngredient5}</td>
                        <td>${meal.meals[0].strMeasure5}</td>
                    </tr>
                    <tr>
                        <td>${meal.meals[0].strIngredient6}</td>
                        <td>${meal.meals[0].strMeasure6}</td>
                    </tr>
                    <tr>
                        <td>${meal.meals[0].strIngredient7}</td>
                        <td>${meal.meals[0].strMeasure7}</td>
                    </tr>
                    <tr>
                        <td>${meal.meals[0].strIngredient8}</td>
                        <td>${meal.meals[0].strMeasure8}</td>
                    </tr>
                    <tr>
                        <td>${meal.meals[0].strIngredient9}</td>
                        <td>${meal.meals[0].strMeasure9}</td>
                    </tr>
                    <tr>
                        <td>${meal.meals[0].strIngredient10}</td>
                        <td>${meal.meals[0].strMeasure10}</td>
                    </tr>
                    <tr>
                        <td>${meal.meals[0].strIngredient11}</td>
                        <td>${meal.meals[0].strMeasure11}</td>
                    </tr>
                    <tr>
                        <td>${meal.meals[0].strIngredient12}</td>
                        <td>${meal.meals[0].strMeasure12}</td>
                    </tr>
                    <tr>
                        <td>${meal.meals[0].strIngredient13}</td>
                        <td>${meal.meals[0].strMeasure13}</td>
                    </tr>
                    <tr>
                        <td>${meal.meals[0].strIngredient14}</td>
                        <td>${meal.meals[0].strMeasure14}</td>
                    </tr>
                    <tr>
                        <td>${meal.meals[0].strIngredient15}</td>
                        <td>${meal.meals[0].strMeasure15}</td>
                    </tr>
                    <tr>
                        <td>${meal.meals[0].strIngredient16}</td>
                        <td>${meal.meals[0].strMeasure16}</td>
                    </tr>
                    <tr>
                        <td>${meal.meals[0].strIngredient17}</td>
                        <td>${meal.meals[0].strMeasure17}</td>
                    </tr>
                    <tr>
                        <td>${meal.meals[0].strIngredient18}</td>
                        <td>${meal.meals[0].strMeasure18}</td>
                    </tr>
                    <tr>
                        <td>${meal.meals[0].strIngredient19}</td>
                        <td>${meal.meals[0].strMeasure19}</td>
                    </tr>
                    <tr>
                        <td>${meal.meals[0].strIngredient20}</td>
                        <td>${meal.meals[0].strMeasure20}</td>
                    </tr>                   
                    </table>
                    <pre id="instructions">${meal.meals[0].strInstructions}</pre>

                    <a href="${meal.meals[0].strSource}" alt="Recipe Source">Recipe Source</a>`

    renderWithTemplate(recipe, page)
}

recipePageTemplate();