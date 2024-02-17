import { loadHeaderFooter } from "./utils.mjs";
import { createList } from "./meal-selector";

const form = document.getElementById("meal-picker");
const addMealsButtons = document.querySelectorAll(".add-meals");

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const categoryValue = document.getElementById("category").value;
    const areaValue = document.getElementById("area").value;

    createList(areaValue, categoryValue)
});

addMealsButtons.forEach(button => {
    button.addEventListener('click', () => {
        const idElement = button.previousElementSibling;
        const mealID = idElement.textContent;
        console.log(mealID);
    })
})

loadHeaderFooter();