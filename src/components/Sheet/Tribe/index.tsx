import Sheet from "@src/database/Sheet";
import Selectable from "../Selectable";

const Tribe = ({ sheet }: { sheet: Sheet }) => {
  const data = sheet.get();
  if (data === null) return null;

  return (
    <Selectable
      title="Tribe"
      value={data.tribe || "none"}
      onChange={(e) => sheet.setTribe(e.target.value)}
      options={[
        { id: "red-talons", name: "Artigli Rossi" },
        { id: "glass-walkers", name: "Calpestavetro" },
        { id: "ghost-council", name: "Consiglio Fantasma" },
        { id: "harth-wardens", name: "Custodi Cervo" },
        { id: "children-of-gaia", name: "Figli di Gaia" },
        { id: "black-furies", name: "Furie Nere" },
        { id: "gale-stalkers", name: "Inseguibufere" },
        { id: "bone-gnawers", name: "Rosicchia Ossa" },
        { id: "shadow-lords", name: "Signori dell'Ombra" },
        { id: "silver-fangs", name: "Zanna d'Argento" },
        { id: "silent-striders", name: "Viandanti Silenti" },
      ]}
      noOptions="Select a tribe"
    />
  );
};

export default Tribe;
