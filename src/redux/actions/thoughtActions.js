const checkAndAddDay = () => {
  return {
    type: "CHECK_AND_ADD_DAY",
  };
};

const addThought = ({ title, thought }) => {
  return {
    type: "ADD_THOUGHT",
    payload: { title, thought },
  };
};

export { checkAndAddDay, addThought };
