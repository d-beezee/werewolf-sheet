import styled from "styled-components";

const RusticBoxItemComponent = ({
  className,
  title,
  // @ts-ignore
  titleSize = "small",
  style,
  children,
}: {
  title?: string;
  titleSize?: "small" | "medium" | "large";
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}) => {
  return (
    <div style={style} className={className}>
      <div className="container">
        {title && (
          <div className="title">
            <span>{title}</span>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

const RusticBoxItem = styled(RusticBoxItemComponent)`
  width: 100%;
  .container {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 10px;
    .title {
      z-index: 1;
      width: 100%;
      height: 0;
      text-align: center;
      position: relative;
      top: -35px;
      ${({ titleSize }) =>
        titleSize === "large"
          ? `
        span{
            font-family:  var(--bebas-neue);
            font-size: 2rem;
        }
        scale: 1 1.2;
        top: -55px;
    `
          : ""}

      ${({ titleSize }) =>
        titleSize === "medium"
          ? `
        span{
            font-family:  var(--bebas-neue);
            background-color: #000;
            font-size: 1.6rem;
            padding: 5px 10px ;
        }
        transform: skew(-2deg);
    
        width: 100%;
        float: left;
        scale: 1 1.2;
        color: #fff;
        
  `
          : ""}
    }
  }
`;

const RusticBoxComponent = ({
  className,
  style,
  children,
}: {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  direction?: "row" | "column";
}) => {
  return (
    <div style={style} className={className}>
      {children}
    </div>
  );
};

const RusticBox = styled(RusticBoxComponent)`
  box-sizing: border-box;
  position: relative;
  border-left: 2px solid #000;
  border-right: 2px solid #000;
  display: flex;
  padding: 5px 0;

  ${({ direction }) =>
    direction === "column" ? "" : "justify-content: space-between"};

  ${({ direction }) =>
    direction === "column" ? "flex-direction: column;" : ""}
  ${RusticBoxItem} {
    ${({ direction }) =>
      direction === "column"
        ? "border-bottom: 2px solid #000;"
        : "border-right: 2px solid #000;"}
  }
  ${RusticBoxItem}:last-child {
    ${({ direction }) =>
      direction === "column" ? "border-bottom: none;" : "border-right:none;"}
  }

  &:after {
    position: absolute;
    top: 5px;
    left: -7px;
    background: #000;
    width: calc(100% + 14px);
    height: 2px;
    content: "";
  }

  &:before {
    position: absolute;
    bottom: 5px;
    left: -7px;
    background: #000;
    width: calc(100% + 14px);
    height: 2px;
    content: "";
  }
`;

export default Object.assign(RusticBox, {
  Item: RusticBoxItem,
});
