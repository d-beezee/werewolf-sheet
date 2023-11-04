import styled from "styled-components";

const ButtonComponent = ({
  ...props
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  size?: "small" | "medium" | "large";
}) => {
  return <button {...props} />;
};

const Button = styled(ButtonComponent)`
  background-color: #000;
  border: 0 solid #e5e7eb;
  box-sizing: border-box;
  color: #fff;
  display: flex;
  font-size: 1rem;
  font-weight: 700;
  justify-content: center;
  line-height: 1.75rem;
  padding: 0.75rem 1.65rem;
  position: relative;
  text-align: center;
  text-decoration: none #fff solid;
  text-decoration-thickness: auto;
  width: 100%;
  ${({ size }) => size === "medium" && ` max-width:460px`};
  ${({ size }) => size === "small" && ` max-width:200px`};
  position: relative;
  cursor: pointer;
  transform: rotate(-2deg);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  &:focus {
    outline: 0;
  }

  &:after {
    content: "";
    position: absolute;
    border: 1px solid #000000;
    bottom: 4px;
    left: 4px;
    width: calc(100% - 1px);
    height: calc(100% - 1px);
  }

  &:hover:after {
    bottom: 2px;
    left: 2px;
  }
`;

export default Button;
