const checkAndAddDay = () => {
  return {
    type: "CHECK_AND_ADD_DAY",
  };
};

const addThought = ({ date, thought }) => {
  return {
    type: "ADD_THOUGHT",
    payload: { date, thought },
  };
};

export { checkAndAddDay, addThought };
