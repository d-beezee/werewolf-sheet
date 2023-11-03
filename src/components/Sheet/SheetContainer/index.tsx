import styled from "styled-components";

const SheetContainerComponent = styled.div`
    width: calc(420mm - 16%);
    height: 436mm ;
    margin: 0 auto;
    box-shadow: 0 0 0 1px #000;   
    box-shadow: 2px 2px 10px 0 rgb(0 0 0 / 20%);
    background-image: url('/sheetbg.jpg');
    background-size: 100%;
    background-repeat: no-repeat;
    padding: 10% 8%;

    div{
        transform: rotate(-0.1deg);
    }
}
`;

const SheetContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <SheetContainerComponent>
      <div>{children}</div>
    </SheetContainerComponent>
  );
};

export default SheetContainer;
