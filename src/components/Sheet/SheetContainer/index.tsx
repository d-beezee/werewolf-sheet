import BackButton from "@src/components/Styles/BackButton";
import LeftCaretButton from "@src/components/Styles/LeftCaretButton";
import RightCaretButton from "@src/components/Styles/RightCaretButton";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const SheetContainerComponent = styled.div`
  width: calc(420mm - 20rem);
  height: 436mm;
  margin: 0 auto;
  box-shadow: 0 0 0 1px #000;
  box-shadow: 2px 2px 10px 0 rgb(0 0 0 / 20%);
  background-image: url("/sheetbg.jpg");
  background-size: 100%;
  background-repeat: no-repeat;
  padding: 12rem 10rem;

  & > div {
    transform: rotate(-0.1deg);
    input {
      transform: rotate(0.1deg);
    }
  }

  .sheet-button {
    position: absolute;
    z-index: 100;
  }

  .sheet-button.back-button {
    top: 35px;
  }
  .sheet-button.flip-right-button,
  .sheet-button.flip-left-button {
    top: 50%;
  }

  .sheet-button.back-button,
  .sheet-button.flip-left-button {
    left: 9.5%;
  }
  .sheet-button.flip-right-button {
    right: 10%;
  }

  @media (max-width: 768px) {
    .sheet-button.back-button {
      left: 2.5%;
    }
    .sheet-button.delete-button {
      right: 3.5%;
    }
    .sheet-button.flip-left-button,
    .sheet-button.flip-right-button {
      display: none;
    }
  }
  @media print {
    width: 350mm;
    -webkit-print-color-adjust: exact;
    color-adjust: exact !important;
    print-color-adjust: exact !important;
    margin: 0;
    padding: 0;
    padding-top: 10mm;
    background-size: 0;
    box-shadow: none;
    background: url(/sheetbg.jpg);
    background-size: 350mm 440mm;

    &:after {
      position: absolute;
      z-index: -1;
      content: "";
      background-size: 100%;
      left: 0;
      right: 0;
      height: 440mm;
      width: 350mm;
      top: -10mm;
      background-repeat: no-repeat;
    }
    & > div {
      transform: scale(0.8);
      input {
        transform: none;
      }
    }
    .sheet-button {
      display: none;
    }
  }
  @page {
    size: 350mm 450mm;
    margin-left: 0px;
    margin-right: 0px;
    margin-top: 0px;
    margin-bottom: 0px;
    margin: 0;
    -webkit-print-color-adjust: exact;
  }
`;

const SheetContainer = ({
  action,
  children,
  resize = true,
}: {
  action: {
    flip?: () => void;
    back?: () => void;
  };
  children: React.ReactNode;
  resize?: boolean;
}) => {
  const [width, setWidth] = useState(0);
  let containerWidth = document.querySelector("main")?.offsetWidth || 0;
  const ref = useRef<any>();
  useEffect(() => {
    setWidth(ref.current ? ref.current.offsetWidth : 0);
  }, [ref.current]);

  const percent = containerWidth / width;
  const left = (100 - percent * 100) / 2;

  return (
    <>
      <SheetContainerComponent
        ref={ref}
        style={
          containerWidth < width && resize
            ? {
                scale: percent.toFixed(2),
                translate: `-${left.toFixed(2)}% -${left.toFixed(2)}%`,
              }
            : {}
        }
      >
        {action.back && (
          <div className="sheet-button back-button">
            <BackButton width={40} height={40} onClick={action.back} />
          </div>
        )}
        {action.flip && (
          <div className="sheet-button flip-right-button">
            <RightCaretButton width={60} height={60} onClick={action.flip} />
          </div>
        )}
        {action.flip && (
          <div className="sheet-button flip-left-button">
            <LeftCaretButton width={60} height={60} onClick={action.flip} />
          </div>
        )}
        <div>{children}</div>
      </SheetContainerComponent>
    </>
  );
};

export default SheetContainer;
