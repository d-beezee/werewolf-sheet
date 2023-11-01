import Sheet from "@src/database/Sheet";

const Tribe = ({ sheet }: { sheet: Sheet }) => {
  const data = sheet.get();
  if (data === null) return null;
  return (
    <>
      Tribe
      <select
        defaultValue={data.tribe || "none"}
        onChange={(e) => sheet.setTribe(e.target.value)}
      >
        <option value="none" disabled>
          Select a tribe
        </option>
        <option value="red-talons">Artigli Rossi</option>
        <option value="glass-walkers">Calpestavetro</option>
        <option value="ghost-council">Consiglio Fantasma</option>
        <option value="harth-wardens">Custodi Cervo</option>
        <option value="children-of-gaia">Figli di Gaia</option>
        <option value="black-furies">Furie Nere</option>
        <option value="gale-stalkers">Inseguibufere</option>
        <option value="bone-gnawers">Rosicchia Ossa</option>
        <option value="shadow-lords">Signori dell'Ombra</option>
        <option value="silver-fangs">Zanna d'Argento</option>
        <option value="silent-striders">Viandanti Silenti</option>
      </select>
    </>
  );
};

export default Tribe;
