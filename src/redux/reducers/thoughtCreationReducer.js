const thoughtCreationReducer = (
  state = { thoughtInteraction: false },
  actions
) => {
  switch (actions.type) {
    case "THOUGHT_CREATION_FALSE": {
      return {
        thoughtInteraction: false,
      };
    }
    case "THOUGHT_CREATION_TRUE": {
      return {
        thoughtInteraction: "create",
      };
    }
    case "THOUGHT_UPDATE": {
      return {
        thoughtInteraction: "edit",
        item: actions.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default thoughtCreationReducer;
