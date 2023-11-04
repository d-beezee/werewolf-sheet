import Button from "@src/components/Styles/Button";
import DeleteButton from "@src/components/Styles/DeleteButton";
import Sheet from "@src/database/Sheet";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Inputable from "../Inputable";

const GiftListComponent = ({
  sheet,
  className,
}: {
  sheet: Sheet;
  className?: string;
}) => {
  const [gifts, setGifts] = useState(sheet.get().gifts ?? []);

  useEffect(() => {
    sheet.setGifts(gifts);
  }, [gifts]);

  return (
    <div className={className}>
      <table>
        <thead>
          <tr>
            <th className="name">Name</th>
            <th className="pool">Pool</th>
            <th className="cost">Cost</th>
            <th className="notes">Notes</th>
            <th className="delete"></th>
          </tr>
        </thead>
        <tbody>
          {gifts.map((gift, i) => (
            <tr key={gift._id ?? i}>
              <td className="name">
                <Inputable
                  value={gift.name}
                  onChange={(e) => {
                    const newGifts = [...gifts];
                    const newGift = { ...gift };
                    newGift.name = e.target.value;
                    newGifts[i] = newGift;
                    setGifts(newGifts);
                  }}
                />
              </td>
              <td className="pool">
                <Inputable
                  value={gift.pool}
                  onChange={(e) => {
                    const newGifts = [...gifts];
                    const newGift = { ...gift };
                    newGift.pool = e.target.value;
                    newGifts[i] = newGift;
                    setGifts(newGifts);
                  }}
                />
              </td>
              <td className="cost">
                <Inputable
                  value={gift.cost}
                  onChange={(e) => {
                    const newGifts = [...gifts];
                    const newGift = { ...gift };
                    newGift.cost = e.target.value;
                    newGifts[i] = newGift;
                    setGifts(newGifts);
                  }}
                />
              </td>
              <td className="notes">
                <Inputable
                  value={gift.notes}
                  onChange={(e) => {
                    const newGifts = [...gifts];
                    const newGift = { ...gift };
                    newGift.notes = e.target.value;
                    newGifts[i] = newGift;
                    setGifts(newGifts);
                  }}
                />
              </td>
              <td className="delete">
                <DeleteButton
                  width={22}
                  height={22}
                  onClick={() => {
                    const newGifts = [...gifts];
                    newGifts.splice(i, 1);
                    setGifts(newGifts);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "20px",
        }}
      >
        <Button
          size="small"
          onClick={() => {
            const newGifts = [...gifts];
            newGifts.push({
              name: "",
              pool: "",
              cost: "",
              notes: "",
              _id: newGifts.length.toString(),
            });
            setGifts(newGifts);
          }}
        >
          Add Gift/Rite
        </Button>
      </div>
    </div>
  );
};

const GiftList = styled(GiftListComponent)`
  position: absolute;
  width: 100%;
  table {
    width: 100%;
    border-spacing: 0px;
    border-collapse: collapse;
    th,
    td {
      text-align: left;
      padding: 0;
      border: 1px solid black;
      border-top: none;
    }
    th {
      padding: 0.5rem;
    }
    .name {
      width: 20%;
    }
    .notes {
      width: 50%;
    }
    td ${Inputable} {
      margin: 0;
      padding: 0;
      input {
        padding: 0.5rem 0;
        width: 100%;
        &:focus {
          background: rgba(0, 0, 0, 0.05);
          outline: none;
        }
      }
    }
  }
`;

export default GiftList;
