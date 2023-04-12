const MOCK_DATA = [
  {
    date: "Wednesday, 19th of May",
    thoughts: [
      {
        text: "This is a very long text. Indeed a very intricate thought such that the thoughts are very long and need lots and lots of words as to simulate a long passage of text here in the viewport.",
        tag: "🔥",
      },
      { text: "HEUREKAAA", tag: "💡" },
    ],
  },
  {
    date: "Thursday, 20th of May",
    thoughts: [
      { text: "text 22", tag: "🔥" },
      { text: "Another example note", tag: "💡" },
    ],
  },
  {
    date: "Friday, 21st of May",
    thoughts: [
      { text: "text", tag: "🔥" },
      { text: "A simple example note", tag: "💡" },
    ],
  },
];

const initialState = MOCK_DATA;

const thoughtReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHECK_AND_ADD_DAY": {
      const returnArray = state.find(
        (dayObject) => dayObject.date == action.payload.date
      )
        ? state
        : [{ date: action.payload.date, thoughts: [] }, ...state];
      return returnArray;
    }
    case "ADD_THOUGHT": {
      action.payload;
      const updatedArray = state.map((dayObject) =>
        dayObject.date == action.payload.date
          ? {
              thoughts: [action.payload.thought, ...dayObject.thoughts],
              ...dayObject,
            }
          : dayObject
      );
      return updatedArray;
    }
    default: {
      return state;
    }
  }
};

export default thoughtReducer;
