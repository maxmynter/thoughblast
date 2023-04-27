const tagCreationReducer = (state = { tagInteraction: false }, actions) => {
  switch (actions.type) {
    case "TAG_INTERACTION_FALSE": {
      return { tagInteraction: false };
    }
    case "TAG_INTERACTION_TRUE": {
      return { tagInteraction: "create" };
    }
    case "TAG_UPDATE": {
      return { tagInteraction: "edit", item: actions.payload };
    }
    default: {
      return state;
    }
  }
};

export default tagCreationReducer;
