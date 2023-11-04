import Xcontent from "@src/components/Styles/Xcontent";
import { useEffect, useState } from "react";
import styled from "styled-components";

const DamageableButtonComponent = ({
  setDamageable,
  status = "none",
  className,
}: {
  className?: string;
  setDamageable: ({
    aggravated,
    superficial,
  }: {
    aggravated: number;
    superficial: number;
  }) => void;
  status?: "aggravated" | "superficial" | "none";
}) => {
  return (
    <button
      className={`${className} ${status}`}
      onClick={() => {
        switch (status) {
          case "aggravated":
            setDamageable({ aggravated: -1, superficial: 0 });
            break;
          case "superficial":
            setDamageable({ aggravated: 1, superficial: -1 });
            break;
          case "none":
            setDamageable({ aggravated: 0, superficial: 1 });
            break;
        }
      }}
    ></button>
  );
};

const DamageableButton = styled(DamageableButtonComponent)``;

const DamageableComponent = ({
  getDamageable,
  saveDamageable,
  max,
  total = 10,
  title,
  className,
}: {
  className?: string;
  title: string;
  total?: number;
  getDamageable: () => { aggravated: number; superficial: number };
  saveDamageable: (params: { aggravated: number; superficial: number }) => void;
  max: number;
}) => {
  const [damageable, setDamageable] = useState({
    aggravated: 0,
    superficial: 0,
  });
  const data = getDamageable();
  if (data === null) return null;
  useEffect(() => {
    setDamageable(data || { aggravated: 0, superficial: 0 });
  }, [data]);
  const updateDamageable = (value: {
    aggravated: number;
    superficial: number;
  }) => {
    saveDamageable(value);
    setDamageable(value);
  };
  const undamaged = max - damageable.aggravated - damageable.superficial;
  const unusable =
    total - damageable.aggravated - damageable.superficial - undamaged;
  return (
    <div className={className}>
      <div className="title">{title}</div>
      <div className="buttons">
        {[...Array(damageable.aggravated)].map((_, i) => (
          <DamageableButton
            key={i}
            setDamageable={({ aggravated, superficial }) =>
              updateDamageable({
                aggravated: damageable.aggravated + aggravated,
                superficial: damageable.superficial + superficial,
              })
            }
            status="aggravated"
          />
        ))}
        {[...Array(damageable.superficial)].map((_, i) => (
          <DamageableButton
            key={i}
            setDamageable={({ aggravated, superficial }) =>
              updateDamageable({
                aggravated: damageable.aggravated + aggravated,
                superficial: damageable.superficial + superficial,
              })
            }
            status="superficial"
          />
        ))}
        {[...Array(undamaged)].map((_, i) => (
          <DamageableButton
            key={i}
            setDamageable={({ aggravated, superficial }) =>
              updateDamageable({
                aggravated: damageable.aggravated + aggravated,
                superficial: damageable.superficial + superficial,
              })
            }
            status="none"
          />
        ))}
        {[...Array(unusable)].map((_, i) => (
          <div className="unusable" key={i} />
        ))}
      </div>
    </div>
  );
};

const Damageable = styled(DamageableComponent)`
  margin-bottom: 14px;
  display: flex;
  .title {
    display: inline-block;
    min-width: 25%;
  }
  .buttons {
    margin-left: 8px;
    display: inline-flex;
    width: 100%;
    button,
    .unusable {
      box-sizing: border-box;
      width: 23px;
      height: 23px;
      padding: 0;
      margin: 0 1px;
      border: 3px solid black;
      background-color: transparent;
      &.aggravated {
        &:after {
          ${Xcontent}
        }
      }
      &.superficial {
        &:after {
          content: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3Csvg viewBox='0 0 460.775 460.775' fill='%23000000' height='19px' width='19px' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 456.199 401.505 C 456.199 401.505 52.384 0.015 48.257 0.015 C 44.131 0.015 40.177 1.654 37.265 4.565 L 4.558 37.284 C -1.519 43.359 -1.519 53.193 4.558 59.27 L 401.505 456.21 C 404.418 459.121 408.371 460.76 412.498 460.76 C 416.626 460.76 420.579 459.121 423.49 456.21 L 456.199 423.491 C 462.273 417.416 462.273 407.582 456.199 401.505 Z'/%3E%3C/svg%3E");
        }
      }
      &.empty {
        background-color: transparent;
      }
    }
    .unusable {
      background-color: #000;
    }
  }
`;

export default Damageable;
