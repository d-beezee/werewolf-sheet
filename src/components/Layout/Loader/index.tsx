import { styled } from "styled-components";

const Loader = styled.div`
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
      background-image: linear-gradient(to right top, #fb0712, #124feb);
    }

    100% {
      transform: rotate(360deg);
      background-image: linear-gradient(to right top, #ba1018, #12ebae);
    }
  }

  top: 30%;
  position: absolute;
  margin: 0 auto;
  left: 0;
  right: 0;
  &:after {
    content: "";
    position: absolute;
    background-color: #0f0f0f;
    width: 190px;
    height: 190px;
    top: 10px;
    border-radius: 50%;
  }
  height: 200px;
  width: 200px;
  background-image: linear-gradient(to right top, #fb0712, #124feb);
  border-radius: 50%;
  //   position: relative;
  animation: rotate 2s infinite;
  transition: all 2s;
`;

export default Loader;
