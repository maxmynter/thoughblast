import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

const MOCK_THOUGHTS = [
  {
    thoughtThread: [
      {
        id: 31,
        from: "user",
        text: "Hey buildspace, hey twitter, this is what I'm building for N&W S3. If you are reading this, you spend a lot of attention. Great. Tweet @ me, or slide in my DMs to get access and shape the development of the app. I would really appreciate that. ",
      },
    ],
    tag: "🔥",
    createdAt: new Date("2022-01-01").toISOString(),
    pinnedAtDate: null,
    id: 1,
  },
  {
    thoughtThread: [{ id: 32, from: "user", text: "HEUREKAAA" }],
    tag: "💡",
    createdAt: new Date("2023-01-01").toISOString(),
    pinnedAtDate: null,
    id: 2,
  },
  {
    thoughtThread: [
      {
        id: 33,
        from: "user",
        text: "Coding, all day... Keepin the commit history green. Life is good.",
      },
    ],
    tag: "🔥",
    createdAt: new Date().toISOString(),
    pinnedAtDate: null,
    id: 3,
  },
  {
    thoughtThread: [
      { id: 34, from: "user", text: "Make the design better. 4 real. " },
    ],
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
    case "RESET":
      return MOCK_THOUGHTS;
    default: {
      return state;
    }
  }
};

export default thoughtReducer;
