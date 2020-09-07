const initialState = {
  ingredientsList: {
    wood: 10,
    bandage: 5,
    fire: 8,
    'Волшебно невероятная хрень написанная на русском языке': 22,
  },

  recipeList: {
    факел: {
      wood: 2,
      bandage: 4,
      fire: 1,
    },
    'волшебный факел': {
      wood: 2,
      bandage: 4,
      fire: 1,
      'Волшебно невероятная хрень написанная на русском языке': 1,
    },
  },

  formNewRecipe: {},

  craftingTable: {
    recipeName: 'Push the recipe right here !',
    recipeList: {},
    countCrafting: 0,
  },
};

export default initialState;
