import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

const MOCK_THOUGHTS = [
  {
    text: "This is a very long text. Indeed a very intricate thought such that the thoughts are very long and need lots and lots of words as to simulate a long passage of text here in the viewport.",
    tag: "🔥",
    createdAt: new Date("2022-01-01").toISOString(),
    pinnedAtDate: null,
    id: 1,
  },
  {
    text: "HEUREKAAA",
    tag: "💡",
    createdAt: new Date("2023-01-01").toISOString(),
    pinnedAtDate: null,
    id: 2,
  },
  {
    text: "text 22",
    tag: "🔥",
    createdAt: new Date().toISOString(),
    pinnedAtDate: null,
    id: 3,
  },
  {
    text: "Another example note",
    tag: "💡",
    createdAt: new Date().toISOString(),
    pinnedAtDate: null,
    id: 4,
  },
];

const initialState = MOCK_THOUGHTS;

const thoughtReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PIN_THOUGHT": {
      console.log("pinning", action.payload.id);
      return state.map((thought) =>
        thought.id === action.payload.id
          ? { ...thought, pinnedAtDate: new Date().toISOString() }
          : thought
      );
    }
    case "ADD_THOUGHT": {
      return [
        {
          id: uuidv4(),
          createdAt: new Date().toISOString(),
          pinnedAtDate: null,
          ...action.payload,
        },
        ...state,
      ];
    }
    default: {
      return state;
    }
  }
};

export default thoughtReducer;
