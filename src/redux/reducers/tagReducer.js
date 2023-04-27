import { v4 as uuidv4 } from "uuid";
/*
const MOCK_TAGS = [
  { symbol: "🔥", description: "Life Events", id: 22 },
  { symbol: "💡", description: "Feature Ideas", id: 33 },
];*/

const initialState = [{ symbol: "💡", description: "Idea", id: 33 }];

const tagReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_TAG": {
      return state.map((tag) =>
        action.payload.id === tag.id ? { ...tag, ...action.payload } : tag
      );
    }
    case "ADD_TAG": {
      return [{ id: uuidv4(), ...action.payload }, ...state];
    }
    case "REMOVE_TAG": {
      return state.map((tag) =>
        tag.id === action.payload ? { ...tag, status: "deleted" } : tag
      );
    }
    case "RESET": {
      return state;
    }
    default: {
      return state;
    }
  }
};

export default tagReducer;
