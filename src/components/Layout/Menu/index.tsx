import { useState } from "react";
import styled from "styled-components";
import Delete from "./icons/Delete";
import Hamburger from "./icons/Hamburger";
import Print from "./icons/Print";
import Share from "./icons/Share";

const MenuItemComponent = ({
  className,
  icon,
  onClick,
  disabled,
}: {
  onClick?: () => void;
  className?: string;
  icon: React.ReactNode;
  size?: number;
  disabled?: boolean;
}) => {
  return (
    <div className={`${className}`} onClick={disabled ? undefined : onClick}>
      <div className="pie-color">{icon}</div>
    </div>
  );
};

const MenuItem = styled(MenuItemComponent)`
  ${({ disabled }) =>
    disabled
      ? `
    opacity: 0.5;
    pointer-events: none;
  `
      : ``}
  -webkit-tap-highlight-color: transparent;
  background: #000;
  border-radius: 50%;
  box-shadow: 0 0 4px 5px rgba(0, 0, 0, 0.2);
  cursor: pointer;

  ${({ size = 200 }) => `
        height: ${size * 2}px;
        left: -${size / 4}px;
        top: -${size / 4}px;
        width: ${size * 2}px;
        position: absolute;
    `}
  transform: translateX(0) translateY(0);
  transition: transform 300ms;
  .pie-color:hover {
    opacity: 0.85;
  }
  .pie-color:active {
    opacity: 0.7;
  }
  svg {
    position: relative;
    ${({ size = 200 }) => `
        height: ${size / 4}px;
        width: ${size / 4}px;
    `}
  }

  .pie-color {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

const MenuItemOne = styled(MenuItem)`
  &,
  .pie-color {
    ${({ size = 200 }) => `
      clip-path: polygon(
      ${size}px ${size}px,
      0px ${size / 2}px,
      -${size / 2}px ${size}px
      );
  `};
    color: #fff;
  }
  transition-delay: 30ms;

  svg {
    left: 6%;
    top: 35%;
  }
  .pie-color {
    background-image: linear-gradient(to right, #870000, #190a05);
  }
`;

const MenuItemTwo = styled(MenuItem)`
  &,
  .pie-color {
    ${({ size = 200 }) => `
        clip-path: polygon(${size}px ${size}px, 0 ${size / 2}px, 0 -${
      size / 2
    }px);
    `}
    color: #fff;
  }

  transition-delay: 60ms;
  svg {
    left: 15%;
    top: 17%;
  }
  .pie-color {
    background-image: linear-gradient(to right, #434343 0%, black 100%);
    color: #fff;
  }
`;

const MenuItemThree = styled(MenuItem)`
  &,
  .pie-color {
    ${({ size = 200 }) => `
        clip-path: polygon(${size}px ${size}px, ${size / 3}px 0, ${size}px 0px);
    `};
    color: #fff;
  }

  transition-delay: 90ms;
  svg {
    left: 33%;
    top: 6%;
  }

  .pie-color {
    background-image: linear-gradient(
      225deg,
      #ff3cac 0%,
      #784ba0 50%,
      #2b86c5 100%
    );
  }
`;

const MenuComponent = ({
  className,
  actions,
}: {
  actions: {
    onDelete?: () => void;
    onPrint?: () => void;
    onShare?: () => void;
  };
  size?: number;
  className?: string;
}) => {
  const [active, setActive] = useState(false);
  return (
    <div className={`${className} ${active ? "active" : ""}`}>
      <MenuItemOne
        onClick={() => {
          setActive(false);
          actions.onDelete && actions.onDelete();
        }}
        icon={<Delete />}
      />
      <MenuItemTwo
        disabled
        onClick={() => {
          setActive(false);
          actions.onPrint && actions.onPrint();
        }}
        icon={<Print />}
      />
      <MenuItemThree
        disabled
        onClick={() => {
          setActive(false);
          actions.onShare && actions.onShare();
        }}
        icon={<Share />}
      />
      <div className="menu" onClick={() => setActive(!active)}>
        <Hamburger />
      </div>
    </div>
  );
};

const Menu = styled(MenuComponent)`
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 100;

  .menu {
    -webkit-tap-highlight-color: transparent;
    background: #fff;
    border-radius: 50%;
    box-shadow: 0 0 4px 5px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    position: absolute;

    ${({ size = 200 }) => `
        height: ${size}px;
        left: -${size / 2 + 10}px;
        top: -${size / 2 + 10}px;
        width: ${size}px;
    `}

    svg {
      cursor: pointer;
      position: relative;
      ${({ size = 200 }) => `
          height: ${size / 4}px;
          width: ${size / 4}px;
      `}
      left: 22.5%;
      top: 22.5%;
    }
  }

  .hamburger path {
    transition: transform 300ms;
  }
  .hamburger path:nth-child(1) {
    transform-origin: 25% 29%;
  }
  .hamburger path:nth-child(2) {
    transform-origin: 50% 50%;
  }
  .hamburger path:nth-child(3) {
    transform-origin: 75% 72%;
  }
  .hamburger path:nth-child(4) {
    transform-origin: 75% 29%;
  }
  .hamburger path:nth-child(5) {
    transform-origin: 25% 72%;
  }
  &.active ${MenuItem} {
    ${({ size = 200 }) => `
        transform: translateX(-${(size * 3) / 4}px) translateY(-${
      (size * 3) / 4
    }px);
    `}
  }
  &.active .hamburger path:nth-child(1) {
    transform: rotate(45deg);
  }
  &.active .hamburger path:nth-child(2) {
    transform: scaleX(0);
  }
  &.active .hamburger path:nth-child(3) {
    transform: rotate(45deg);
  }
  &.active .hamburger path:nth-child(4) {
    transform: rotate(-45deg);
  }
  &.active .hamburger path:nth-child(5) {
    transform: rotate(-45deg);
  }
`;

export default Menu;
