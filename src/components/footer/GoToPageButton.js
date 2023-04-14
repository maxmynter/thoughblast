import ButtonAnimationWrapper from "./ButtonAnimationWrapper";

const GoToPageButton = (props) => {
  return (
    <ButtonAnimationWrapper onClick={props.onClick}>
      {props.children}
    </ButtonAnimationWrapper>
  );
};
export default GoToPageButton;
