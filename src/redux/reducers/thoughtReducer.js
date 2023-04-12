import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

const MOCK_DATA = [
  {
    title: "Wednesday, 19th of May",
    data: [
      {
        text: "This is a very long text. Indeed a very intricate thought such that the thoughts are very long and need lots and lots of words as to simulate a long passage of text here in the viewport.",
        tag: "🔥",
        createdAt: new Date().toISOString(),
        id: 1,
      },
      {
        text: "HEUREKAAA",
        tag: "💡",
        createdAt: new Date().toISOString(),
        id: 2,
      },
    ],
  },
  {
    title: "Thursday, 20th of May",
    data: [
      {
        text: "text 22",
        tag: "🔥",
        createdAt: new Date().toISOString(),
        id: 3,
      },
      {
        text: "Another example note",
        tag: "💡",
        createdAt: new Date().toISOString(),
        id: 4,
      },
    ],
  },
  {
    title: "Friday, 21st of May",
    data: [
      { text: "text", tag: "🔥", createdAt: new Date().toISOString(), id: 5 },
      {
        text: "A simple example note",
        tag: "💡",
        createdAt: new Date().toISOString(),
        id: 6,
      },
    ],
  },
];

const initialState = MOCK_DATA;

const thoughtReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHECK_AND_ADD_DAY": {
      const returnArray = state.find(
        (dayObject) => dayObject.title == action.payload.title
      )
        ? state
        : [{ date: action.payload.title, data: [] }, ...state];
      return returnArray;
    }
    case "ADD_THOUGHT": {
      console.log("ADD Thought", action.payload);
      const updatedArray = state.map((dayObject) => {
        if (dayObject.title == action.payload.title) {
          const returnDayObject = {
            ...dayObject,
            data: [
              ...dayObject.data,
              {
                id: uuidv4(),
                createdAt: new Date().toISOString(),
                ...action.payload.thought,
              },
            ],
          };
          return returnDayObject;
        } else {
          return dayObject;
        }
      });
      return updatedArray;
    }
    default: {
      return state;
    }
  }
};

export default thoughtReducer;
