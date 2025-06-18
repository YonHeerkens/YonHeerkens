export class Recipe {
  /**
   * @param {string} title  Title of the recipe
   * @param {string} pic      Path to the recipe picture asset
   * @param {number} prepTime  Preparation time to prepare all the ingredients
   * @param {number} cookTime  Cooking time
   * @param {number} servingSize How many people the recipe can serve
   * @param {number} difficulty  How difficult the dish is perceived to make (scale 1-5)
   * @param {Array<{name: string, quantity: number}>} ingredients  An array of ingredients with items that contain the name of the ingredient and the quantity
   * @param {string} state  A state of the recipe: 'draft' || 'finished' || 'removed'
   * @param {boolean} favorite  A boolean for the user to see if it is part of their favorite meals
   */
  constructor(
    title,
    pic,
    prepTime,
    cookTime,
    servingSize,
    difficulty,
    ingredients,
    state,
    favorite
  ) {
    this.title = title;
    this.picPath = pic; // Path to the asset picture of the recipe
    this.prepTime = prepTime;
    this.cookTime = cookTime;
    this.servingSize = servingSize; // How many people does this recipe serve
    this.difficulty = difficulty; // scale from 1 to 5
    this.ingredients = ingredients; // Array of ingredients {name, qty} that are all lowercase names and have quantities
    this.state = state; // Either draft or finished maybe deleted later
    this.favorite = favorite; // boolean
  }

  set title(value) {
    this.title = value.toLowerCase();
  }

  set prepTime(value) {
    this.prepTime = parseInt(value, 10);
  }

  set cookTime(value) {
    this.cookTime = parseInt(value, 10);
  }

  set ingredients(ingredientList) {
    this.ingredients = ingredientList.map((ingredient) =>
      ingredient.name.toLowerCase()
    );
  }

  get totalTime() {
    return this.cookTime + this.prepTime;
  }

  // Convert to use tuple objects since you also need the quantity
  containsIngredient(ingredient) {
    const lowercaseIngredient = ingredient.toLowerCase();
    return this.ingredients.some((recipeIngredient) => {
      recipeIngredient.includes(lowercaseIngredient);
    });
  }

  /**
   *
   * @param {int} lowerBound The lower boundary of the cooktime that the user wants to filter
   * @param {int} upperBound The upper boundary of the cooktime that the user wants to filter
   * @returns Whether or not the cooktime of this recipe fits within the boundaries that the user has given
   */
  filterCookTime(lowerBound, upperBound) {
    return this.totalTime <= upperBound && this.totalTime >= lowerBound;
  }

  /**
   *
   * @param {string} title A name that the user is looking up to see if the title of the recipe matches their input
   * @returns A boolean whether or not their input matches part of this recipe name
   */
  checkTitle(title) {
    const lowercaseTitle = title.toLowerCase();
    return this.title.includes(lowercaseTitle);
  }

  /**
   *
   * @param {int} desiredServingSize The serving size that is desired
   * @returns a new list of ingredients with their quantity matching the desired serving size
   */
  calculateIngredients(desiredServingSize) {
    const multiplier = desiredServingSize / this.servingSize;

    return this.ingredients.map((ingredient) => ({
      name: ingredient.name,
      quantity: ingredient.quantity * multiplier,
    }));
  }
}
