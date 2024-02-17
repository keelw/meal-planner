import { loadHeaderFooter } from "./utils.mjs";
import { createList, addToMealPlan, createMealPlan, removeFromMealPlan } from "./meal-selector";

const form = document.getElementById("meal-picker");
createMealPlan();
loadHeaderFooter();

form.addEventListener('submit', async function(event) {
    event.preventDefault();

    const categoryValue = document.getElementById("category").value;
    const areaValue = document.getElementById("area").value;

    await createList(areaValue, categoryValue);
});

// Event delegation for dynamically created buttons
document.addEventListener('click', async function(event) {
    if (event.target.classList.contains('add-meals')) {
        const idElement = event.target.previousElementSibling;
        const mealID = idElement.textContent;
        await addToMealPlan(mealID);
        await createMealPlan();
    }
})

document.addEventListener('click', async function(event) {
    if (event.target.classList.contains('remove-meals')) {
        const idElement = event.target.previousElementSibling;
        const mealID = idElement.textContent;
        await removeFromMealPlan(mealID);
        await createMealPlan();
    }
})