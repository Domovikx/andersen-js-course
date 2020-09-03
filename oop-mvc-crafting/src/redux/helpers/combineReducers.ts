function combineReducers(reducersMap: any) {
  return function combinationReducer(state: any, action: any) {
    const nextState: any = {};
    Object.entries(reducersMap).forEach(([key, reducer]: any) => {
      nextState[key] = reducer(state[key], action);
    });
    return nextState;
  };
}

export default combineReducers;
