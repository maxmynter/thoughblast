const toggle_create_thought_update = (item) => {
  return {
    type: "THOUGHT_CREATION_TRUE",
    payload: item,
  };
};

const toggle_create_thought_true = () => {
  return {
    type: "THOUGHT_CREATION_TRUE",
  };
};

const toggle_create_thought_false = () => {
  return {
    type: "THOUGHT_CREATION_FALSE",
  };
};

export {
  toggle_create_thought_false,
  toggle_create_thought_true,
  toggle_create_thought_update,
};
