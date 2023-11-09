import { styled } from "styled-components";

const LeftCaretButtonComponent = ({
  width = 16,
  height = 16,
  className,
  onClick,
}: {
  onClick: () => void;
  width?: number;
  height?: number;
  className?: string;
}) => {
  return (
    <button className={className} onClick={onClick}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 210 297"
        version="1.1"
        id="svg3631"
      >
        <defs id="defs3625">
          <clipPath clipPathUnits="userSpaceOnUse" id="clipPath18">
            <path d="M 0,600.949 H 847.559 V 0 H 0 Z" id="path16" />
          </clipPath>
          <linearGradient
            id="a"
            x1="104.73"
            x2="494.51999"
            y1="335.72"
            y2="895.84003"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#e00" offset="0" id="stop2" />
            <stop stopColor="#9a0000" offset="1" id="stop4" />
          </linearGradient>
        </defs>
        <g id="layer1">
          <g id="g11993" transform="translate(0.01320793,-14.655723)">
            <g
              id="g12"
              transform="matrix(1.340502,0,0,-1.340502,176.89467,246.18441)"
            >
              <path
                d="M 0,0 -107.285,61.938 0,123.877 -31.946,61.938 Z"
                style={{
                  fillOpacity: 1,
                  fillRule: "nonzero",
                  stroke: "none",
                }}
                id="path14"
              />
            </g>
          </g>
        </g>
      </svg>
    </button>
  );
};

const LeftCaretButton = styled(LeftCaretButtonComponent)`
  border: none;
  background: none;
  cursor: pointer;
  &:hover svg {
    fill: #deb887;
  }
`;

export default LeftCaretButton;
