import BackButton from "@src/components/Styles/BackButton";
import DeleteButton from "@src/components/Styles/DeleteButton";
import LeftCaretButton from "@src/components/Styles/LeftCaretButton";
import RightCaretButton from "@src/components/Styles/RightCaretButton";
import styled from "styled-components";

const SheetContainerComponent = styled.div`
    width: calc(420mm - 20rem);
    height: 436mm ;
    margin: 0 auto;
    box-shadow: 0 0 0 1px #000;   
    box-shadow: 2px 2px 10px 0 rgb(0 0 0 / 20%);
    background-image: url('/sheetbg.jpg');
    background-size: 100%;
    background-repeat: no-repeat;
    padding: 12rem 10rem;

    &>div{
        transform: rotate(-0.1deg);
        input {
          transform: rotate(0.1deg);
        }
    }
}
`;

const SheetContainer = ({
  action,
  children,
}: {
  action: {
    flip: () => void;
    back: () => void;
    delete: () => void;
  };
  children: React.ReactNode;
}) => {
  return (
    <>
      <SheetContainerComponent>
        <div
          style={{
            position: "absolute",
            zIndex: 100,
            left: "9.5%",
            top: "35px",
          }}
        >
          <BackButton width={40} height={40} onClick={action.back} />
        </div>
        <div
          style={{
            position: "absolute",
            zIndex: 100,
            right: "10%",
            top: "35px",
          }}
        >
          <DeleteButton width={40} height={40} onClick={action.delete} />
        </div>
        <div
          style={{
            position: "absolute",
            zIndex: 100,
            right: "10%",
            top: "50%",
          }}
        >
          <RightCaretButton width={60} height={60} onClick={action.flip} />
        </div>
        <div
          style={{
            position: "absolute",
            zIndex: 100,
            left: "9.5%",
            top: "50%",
          }}
        >
          <LeftCaretButton width={60} height={60} onClick={action.flip} />
        </div>
        <div>{children}</div>
      </SheetContainerComponent>
    </>
  );
};

export default SheetContainer;
