const MOCK_DATA = [
  {
    date: "Wednesday, 19th of May",
    thoughts: [
      {
        text: "This is a very long text. Indeed a very intricate thought such that the thoughts are very long and need lots and lots of words as to simulate a long passage of text here in the viewport.",
        tag: "🔥",
        id: 1,
      },
      { text: "HEUREKAAA", tag: "💡", id: 2 },
    ],
  },
  {
    date: "Thursday, 20th of May",
    thoughts: [
      { text: "text 22", tag: "🔥", id: 3 },
      { text: "Another example note", tag: "💡", id: 4 },
    ],
  },
  {
    date: "Friday, 21st of May",
    thoughts: [
      { text: "text", tag: "🔥", id: 5 },
      { text: "A simple example note", tag: "💡", id: 6 },
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
      const updatedArray = state.map((dayObject) => {
        if (dayObject.date == action.payload.date) {
          const returnDayObject = {
            ...dayObject,
            thoughts: [...dayObject.thoughts, action.payload.thought],
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
