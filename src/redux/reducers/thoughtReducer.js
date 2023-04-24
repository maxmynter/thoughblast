import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

/*const MOCK_THOUGHTS = [
  {
    text: "Hey buildspace, hey twitter, this is what I'm building for N&W S3. If you are reading this, you spend a lot of attention. Great. Tweet @ me, or slide in my DMs to get access and shape the development of the app. I would really appreciate that. ",
    tag: "🔥",
    createdAt: new Date("2022-01-01").toISOString(),
    pinnedAtDate: [],
    pinned: false,
    id: 1,
  },
  {
    text: "HEUREKAAA",
    tag: "💡",
    createdAt: new Date("2023-01-01").toISOString(),
    pinnedAtDate: [],
    pinned: false,
    id: 2,
  },
  {
    text: "Coding, all day... Keepin the commit history green. Life is good.",
    tag: "🔥",
    createdAt: new Date().toISOString(),
    pinnedAtDate: [],
    pinned: false,
    id: 3,
  },
  {
    text: "Make the design better. 4 real. ",
    tag: "💡",
    createdAt: new Date().toISOString(),
    pinnedAtDate: [],
    pinned: false,
    id: 4,
  },
];*/

const initialState = [
  {
    text: "Thank you for using thought blast. You can enter thoughts by clicking below and then choosing a suitable tag. Tags can be created in the Tag view. You can pin thoughts by swiping them to the left. If you do the same on the pinwall, they are unpinned. This is an early stage product and I would love your feedback.",
    tag: "💡",
    createdAt: new Date(0).toISOString(),
    pinnedAtDate: [],
    pinned: false,
    id: 0,
  },
  {
    text: "This is an early stage product and I would love your feedback. Submit it by clicking on this thought.",
    tag: "💡",
    createdAt: new Date(0).toISOString(),
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
