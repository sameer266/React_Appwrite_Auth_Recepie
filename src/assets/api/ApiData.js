// ../assets/api/ApiData.js
export const RecepieData = async () => {
    try {
        const response = await fetch('https://dummyjson.com/recipes');
        const data = await response.json();
        return data.recipes; // Return the array of recipes
    } catch (error) {
        console.error("Error fetching recipe data:", error);
        return [];
    }
};
