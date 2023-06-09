import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

const initialState = [
  {
    text: "Thank you for using thought blast.\n\nEnter thoughts by clicking '+'\n\nEnter voice notes by holding '+'\n\nPin thoughts by swiping thoughts to the left. \n\nDo the same on the pinwall to unpin.",

    createdAt: new Date().toISOString(),
    pinnedAtDate: [],
    pinned: false,
    id: 0,
  },
  {
    text: "Tap here, to send me feedback",

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
          id: action.payload.id ? action.payload.id : uuidv4(),
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
