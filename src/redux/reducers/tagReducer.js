import { v4 as uuidv4 } from "uuid";

const MOCK_TAGS = [
  { symbol: "🔥", description: "Life Events", id: 22 },
  { symbol: "💡", description: "Feature Ideas", id: 33 },
];

const initialState = MOCK_TAGS;

const tagReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TAG": {
      return [{ id: uuidv4(), ...action.payload }, ...state];
    }
    case "REMOVE_TAG": {
      return state.map((tag) =>
        tag.id === action.payload.id ? { ...tag, status: "deleted" } : tag
      );
    }
    case "RESET": {
      return MOCK_TAGS;
    }
    default: {
      return state;
    }
  }
};

export default tagReducer;
