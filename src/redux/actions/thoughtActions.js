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

export { unPinThought, resetThoughts, pinThought, addThought };
