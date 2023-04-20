const pinThought = (id) => {
  return {
    type: "PIN_THOUGHT",
    payload: { id },
  };
};

const unPinThought = (id) => {
  console.log("unpin", id);
  return {
    type: "UNPIN_THOUGHT",
    payload: { id },
  };
};

const addThought = ({ thought }) => {
  return {
    type: "ADD_THOUGHT",
    payload: thought,
  };
};

const resetThoughts = () => {
  return {
    type: "RESET",
  };
};

const updateThought = ({ thought }) => {
  return {
    type: "UPDATE_THOUGHT",
    payload: thought,
  };
};

export { unPinThought, resetThoughts, pinThought, addThought, updateThought };
