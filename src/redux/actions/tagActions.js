const addTag = (tag) => {
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

const resetTags = () => {
  return { type: "RESET" };
};

export { resetTags, addTag, removeTag };
