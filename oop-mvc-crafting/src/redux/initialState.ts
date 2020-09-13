const initialState = {
  ingredientsList: {
    wood: 5,
    bandage: 8,
    fire: 3,
    'Волшебно невероятная хрень написанная на русском языке': 17,
    metal: 7,
    стекло: 8,
    вода: 15,
    C2H5OH: 7,
  },
  recipeList: {
    'BuraTina 2.0': { wood: 3, metal: 2, стекло: 1, fire: 3 },
    'BuraTina Т-600': {
      wood: 1,
      metal: 3,
      стекло: 1,
      fire: 3,
      'Волшебно невероятная хрень написанная на русском языке': 1,
    },
    'BuraTina Т-1000': {
      wood: 2,
      metal: 1,
      стекло: 4,
      'Волшебно невероятная хрень написанная на русском языке': 2,
    },
    'CherepAHA TartiLA Т-Х': { стекло: 5, вода: 4, C2H5OH: 6 },
    'FucKel (О Бык Новенный)': {
      C2H5OH: 5,
      wood: 3,
      bandage: 3,
      fire: 10,
    },
  },
  formNewRecipe: { C2H5OH: 5, wood: 3, bandage: 3, fire: 10 },
  craftingTable: {
    recipeName: 'FucKel (О Бык Новенный)',
    recipeList: {
      C2H5OH: { exists: 5, required: 5 },
      wood: { exists: 3, required: 3 },
      bandage: { exists: 3, required: 3 },
      fire: { exists: 10, required: 10 },
    },
    countCrafting: 0,
  },
  readyList: {
    'BuraTina 2.0': {
      count: 2,
      recipeList: { wood: 3, metal: 2, стекло: 1, fire: 3 },
    },
    'BuraTina Т-600': {
      count: 5,
      recipeList: {
        wood: 1,
        metal: 3,
        стекло: 1,
        fire: 3,
        'Волшебно невероятная хрень написанная на русском языке': 1,
      },
    },
    'CherepAHA TartiLA Т-Х': {
      count: 1,
      recipeList: { стекло: 5, вода: 4, C2H5OH: 6 },
    },
    'FucKel (О Бык Новенный)': {
      count: 1,
      recipeList: { C2H5OH: 5, wood: 3, bandage: 3, fire: 10 },
    },
  },

  view: {
    RECIPE_LIST: {
      show: 'show',
      list: {},
    },
  },
};

export default initialState;
