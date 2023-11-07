import Sheet from "@src/database/Sheet";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Damageable from "../Damageable";

const size = 30;
const CustomDamageable = styled(Damageable)`
  margin-left: 21%;
  rotate: -4deg;
  margin-top: 20px;
  .title {
    min-width: 35%;
  }
  .buttons button {
    border: none;
    width: ${size}px;
    height: ${size}px;
    &:after {
      position: relative;
      top: -${size}px;
    }
    &:before {
      content: url("data:image/svg+xml,%0A%3Csvg version='1.2' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 21' width='${size}' height='${size}'%3E%3Cstyle%3E.a%7Bfill:none;stroke:%23000;stroke-miterlimit:100;stroke-width:2%7D%3C/style%3E%3Cpath fill-rule='evenodd' class='a' d='m4.4 4.5h11.6v0.1h0.1v-0.1 11.9l-0.2-0.1v0.2h-11.5zm11.7 0v-0.1h3v0.1h-3zm0 11.8h3.6v0.1h-3.8 0.2zm-11.8-16h0.1v3.8h-0.1zm0.2 16.2h0.1l-0.1 4.2h-0.1zm11.5 0h0.1v3.9h-0.1zm0-12.1v-3.7h0.2l-0.1 3.6v0.1zm-15.7-0.1h4.1v0.2h-4.1zm4.1 12v0.2l-4.1-0.1v-0.1z'/%3E%3C/svg%3E");
    }
  }
`;

const Crinos = ({ sheet }: { sheet: Sheet }) => {
  const { t } = useTranslation();
  const data = sheet.get();
  if (data === null) return null;

  return (
    <CustomDamageable
      title={t("Crinos", { context: "sheet" })}
      max={5}
      total={5}
      getDamageable={() => data.crinos}
      saveDamageable={(value) => sheet.setCrinos(value)}
    />
  );
};

export default Crinos;
