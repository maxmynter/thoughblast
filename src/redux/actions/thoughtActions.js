const pinThought = (id) => {
  return {
    type: "PIN_THOUGHT",
    payload: { id },
  };
};

const addThought = ({ thought }) => {
  return {
    type: "ADD_THOUGHT",
    payload: thought,
  };
};

export { pinThought, addThought };
