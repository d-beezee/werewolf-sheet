import { useEffect, useState } from "react";

const DamageableButton = ({
  setDamageable,
  status = "none",
}: {
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
    >
      {status === "aggravated"
        ? "[X]"
        : status === "superficial"
        ? "[/]"
        : "[ ]"}
    </button>
  );
};

const Damageable = ({
  getDamageable,
  saveDamageable,
  max,
  title,
}: {
  title: string;
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
    10 - damageable.aggravated - damageable.superficial - undamaged;
  return (
    <>
      {title}
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
      ))}{" "}
      {[...Array(unusable)].map((_, i) => (
        <>[]</>
      ))}
    </>
  );
};

export default Damageable;
