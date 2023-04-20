const thoughtCreationReducer = (
  state = { newThoughtCreationInProgress: false },
  actions
) => {
  switch (actions.type) {
    case "THOUGHT_CREATION_FALSE": {
      return {
        newThoughtCreationInProgress: false,
      };
    }
    case "THOUGHT_CREATION_TRUE": {
      return {
        newThoughtCreationInProgress: true,
      };
    }
    case "THOUGHT_UPDATE": {
      return {
        newThoughtCreationInProgress: true,
        item: actions.payload.item,
      };
    }
    default: {
      return state;
    }
  }
};

export default thoughtCreationReducer;
