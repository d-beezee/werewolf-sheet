import { styled } from "styled-components";

const SeparatorComponent = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  return (
    <div className={className}>
      <div className="line"></div>
      <div className="text-container">
        <span className="text">
          <span className="ww-tall-title">{text}</span>
        </span>
      </div>
    </div>
  );
};

const Separator = styled(SeparatorComponent)`
  margin: 30px 0 0 0;
  .text-container {
    position: relative;
    top: -25px;
    left: 0;
    right: 0;
    text-align: center;
    width: 100%;
    .text {
      display: inline-block;
      transform: skew(-5deg);
      padding: 10px 15px;
      background: #000;
      color: #fff;
    }
    span {
      transform: skew(5deg);
    }
  }
  .line {
    margin: 0 -1.9rem 0 -3.7rem;
    border-bottom: 1px solid;
  }
`;
export default Separator;
