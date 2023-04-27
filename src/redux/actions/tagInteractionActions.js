const toggle_create_tag_true = () => {
  return {
    type: "TAG_INTERACTION_TRUE",
  };
};

const toggle_create_tag_false = () => {
  return {
    type: "TAG_INTERACTION_FALSE",
  };
};

const toggle_create_tag_update = (item) => {
  return {
    type: "TAG_UPDATE",
    payload: item,
  };
};

export {
  toggle_create_tag_true,
  toggle_create_tag_false,
  toggle_create_tag_update,
};
