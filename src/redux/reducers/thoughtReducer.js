import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

const initialState = [
  {
    text: "Thank you for using thought blast. You can enter thoughts by clicking below and then choosing a suitable tag. Tags can be created in the Tag view. You can pin thoughts by swiping them to the left. If you do the same on the pinwall, they are unpinned. This is an early stage product and I would love your feedback.",

    createdAt: new Date().toISOString(),
    pinnedAtDate: [],
    pinned: false,
    id: 0,
  },
  {
    text: "This is an early stage product and I would love your feedback. Submit it by clicking on this thought.",

    createdAt: new Date().toISOString(),
    pinnedAtDate: [],
    pinned: false,
    id: 1,
  },
];

const thoughtReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PIN_THOUGHT": {
      console.log("pinning", action.payload.id);
      return state.map((thought) =>
        thought.id === action.payload.id
          ? {
              ...thought,
              pinned: true,
              pinnedAtDate: [...thought.pinnedAtDate, new Date().toISOString()],
            }
          : thought
      );
    }
    case "UNPIN_THOUGHT": {
      return state.map((thought) =>
        thought.id === action.payload.id
          ? { ...thought, pinned: false }
          : thought
      );
    }
    case "ADD_THOUGHT": {
      return [
        {
          id: uuidv4(),
          createdAt: new Date().toISOString(),
          pinnedAtDate: [],
          ...action.payload,
        },
        ...state,
      ];
    }
    case "UPDATE_THOUGHT": {
      return state.map((thought) =>
        thought.id === action.payload.id
          ? {
              ...thought,
              ...action.payload,
              updatedAt: action.payload.updatedAt
                ? [...action.payload.updatedAt, new Date().toISOString()]
                : [new Date().toISOString()],
            }
          : thought
      );
    }
    case "RESET":
      return state;
    default: {
      return state;
    }
  }
};

export default thoughtReducer;
