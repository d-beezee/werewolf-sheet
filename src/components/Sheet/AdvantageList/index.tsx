import DeleteButton from "@src/components/Styles/DeleteButton";
import RusticBox from "@src/components/Styles/RusticBox";
import Sheet from "@src/database/Sheet";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Dottable from "../Dottable";
import Inputable from "../Inputable";

const max = 14;
const AdvantageListComponent = ({
  className,
  sheet,
}: {
  className?: string;
  sheet: Sheet;
}) => {
  const [advantages, setAdvantages] = useState(sheet.get().advantages ?? []);

  useEffect(() => {
    sheet.setAdvantages(advantages);
  }, [advantages]);

  return (
    <RusticBox className={className} direction="column">
      <RusticBox.Item
        className="title"
        titleSize="large"
        title="Advantages & Flaws"
      ></RusticBox.Item>
      {advantages.map((advantage, i) => (
        <RusticBox.Item
          className="item"
          key={advantage._id ?? i}
          titleSize="large"
        >
          <div style={{ flexGrow: 1 }}>
            <Inputable
              value={advantage.name}
              onChange={(e) => {
                const newAdvantages = [...advantages];
                const newAdvantage = { ...advantage };
                newAdvantage.name = e.target.value;
                newAdvantages[i] = newAdvantage;
                setAdvantages(newAdvantages);
              }}
            />
          </div>
          <div style={{ flexGrow: 1, alignItems: "center", display: "flex" }}>
            <Dottable
              allowZero
              title=""
              getValue={() => advantage.value}
              saveValue={(newValue) => {
                const newAdvantages = [...advantages];
                const newAdvantage = { ...advantage };
                newAdvantage.value = newValue;
                newAdvantages[i] = newAdvantage;
                setAdvantages(newAdvantages);
              }}
            />
          </div>
          <div
            style={{
              alignItems: "center",
              display: "flex",
              margin: "0 8px",
            }}
          >
            <DeleteButton
              width={22}
              height={22}
              onClick={() => {
                const newAdvantage = [...advantages];
                newAdvantage.splice(i, 1);
                setAdvantages(newAdvantage);
              }}
            />
          </div>
        </RusticBox.Item>
      ))}
      <RusticBox.Item className="button" titleSize="large">
        <button
          disabled={advantages.length >= max}
          onClick={() => {
            const newAdvantages = [...advantages];
            newAdvantages.push({
              _id: newAdvantages.length.toString(),
              name: "",
              value: 0,
            });
            setAdvantages(newAdvantages);
          }}
        >
          Add
        </button>
      </RusticBox.Item>
    </RusticBox>
  );
};

const AdvantageList = styled(AdvantageListComponent)`
  min-height: ${(max - 1) * 50}px;
  ${RusticBox.Item}.title {
    height: 0;
  }
  ${RusticBox.Item}.item {
    min-height: 50px;
    align-items: stretch;
    & .container {
      display: flex;
      padding: 0;
      justify-content: space-between;
    }
    ${Inputable} {
      margin: 0;
      padding: 0;
      input {
        min-height: 50px;
        width: 100%;
        padding: 0 8px;
      }
    }
    ${Dottable} {
      margin: 0;
    }
  }
  ${RusticBox.Item}.button {
    min-height: 50px;
    & .container {
      display: flex;
      justify-content: space-between;
      padding: 0;
      button {
        border: none;
        background: none;
        padding: 8px 16px;
        width: 100%;
        cursor: pointer;
      }
    }
  }
`;

export default AdvantageList;
