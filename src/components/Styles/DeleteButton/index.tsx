import { styled } from "styled-components";

const DeleteButtonComponent = ({
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
        className={className}
        version="1.1"
        x="0px"
        y="0px"
        width={width}
        height={height}
        viewBox="0 0 256 256"
        enable-background="new 0 0 256 256"
      >
        <g>
          <g>
            <path d="M111.1,188.2V93.6c0-11-16.9-11-16.9,0v94.6C94.2,199.2,111.1,199.2,111.1,188.2z M237.9,50.6h-42.3V33.4c0-14.2-11.4-25.8-25.1-25.8H85.7c-14,0-25.4,11.6-25.4,25.8v17.2H18.1c-10.8,0-10.8,17.2,0,17.2h219.7C248.7,67.8,248.7,50.6,237.9,50.6z M178.7,50.6H77.3V33.4c0-4.6,3.9-8.6,8.5-8.6h84.8c4.5,0,8.2,3.5,8.2,8.6V50.6z M195.6,93.9v128.7c0,4.6-4,8.6-8.5,8.6H68.8c-4.5,0-8.5-4-8.5-8.6v-129c0-5.1-3.9-8.6-8.5-8.6c-4.5,0-8.5,3.5-8.5,8.6v129c0,14.2,11.4,25.8,25.4,25.8h118.3c14,0,25.4-11.6,25.4-25.8V93.9C212.5,82.6,195.6,82.6,195.6,93.9z M161.8,188.2V93.6c0-11-16.9-11-16.9,0v94.6C144.9,199.2,161.8,199.2,161.8,188.2z" />
          </g>
        </g>
      </svg>
    </button>
  );
};

const DeleteButton = styled(DeleteButtonComponent)`
  border: none;
  background: none;
  cursor: pointer;
  &:hover svg {
    fill: red;
  }
`;

export default DeleteButton;