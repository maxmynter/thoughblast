const addTag = ({ tag }) => {
  return {
    type: "ADD_TAG",
    payload: tag,
  };
};

const removeTag = ({ id }) => {
  return {
    type: "REMOVE_TAG",
    payload: id,
  };
};

export { addTag, removeTag };