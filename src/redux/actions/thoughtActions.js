const checkAndAddDay = () => {
  return {
    type: "CHECK_AND_ADD_DAY",
  };
};

const addThought = ({ thought }) => {
  return {
    type: "ADD_THOUGHT",
    payload: thought,
  };
};

export { checkAndAddDay, addThought };
