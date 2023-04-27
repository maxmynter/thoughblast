const tagCreationReducer = (state = { tagInteraction: false }, actions) => {
  switch (actions.type) {
    case "TAG_INTERACTION_FALSE": {
      return { tagInteraction: false };
    }
    case "TAG_INTERACTION_TRUE": {
      return { tagInteraction: true };
    }
    case "TAG_UPDATE": {
      return { tagInteraction: true, item: actions.payload };
    }
    default: {
      return state;
    }
  }
};

export default tagCreationReducer;
