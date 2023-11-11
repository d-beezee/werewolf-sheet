import AdvantageList from "@src/components/Sheet/AdvantageList";
import GarouForms from "@src/components/Sheet/GarouForms";
import Harano from "@src/components/Sheet/Harano";
import Hauglosk from "@src/components/Sheet/Hauglosk";
import Inputable from "@src/components/Sheet/Inputable";
import SheetContainer from "@src/components/Sheet/SheetContainer";
import RusticBox from "@src/components/Styles/RusticBox";
import Sheet from "@src/database/Sheet";
import { useTranslation } from "react-i18next";

const PageBack = ({
  resize,
  item,
  action,
}: {
  resize?: boolean;
  item: Sheet;
  version?: number;
  action?: {
    flip?: () => void;
  };
}) => {
  const { t } = useTranslation();
  const data = item.get();
  if (data === null) return <div>not found</div>;

  return (
    <div>
      <SheetContainer resize={resize} action={action ? action : {}}>
        <RusticBox>
          <RusticBox.Item
            style={{ minHeight: "200px" }}
            title={t("Chronicle Tenets", { context: "sheet" })}
          >
            <Inputable
              type="textarea"
              value={data.tenets}
              onChange={(e) => {
                item.setTenets(e.target.value);
              }}
            />
          </RusticBox.Item>
          <RusticBox.Item
            style={{ minHeight: "200px" }}
            title={t("Touchstones", { context: "sheet" })}
          >
            <Inputable
              type="textarea"
              value={data.touchstones}
              onChange={(e) => {
                item.setTouchstones(e.target.value);
              }}
            />
          </RusticBox.Item>
          <RusticBox.Item
            style={{ minHeight: "200px" }}
            title={t("Favors & Banes", { context: "sheet" })}
          >
            <Inputable
              type="textarea"
              value={data.favor}
              onChange={(e) => {
                item.setFavor(e.target.value);
              }}
            />
          </RusticBox.Item>
        </RusticBox>
        <div style={{ display: "flex", gap: "32px" }}>
          <div style={{ width: "50%", paddingTop: "40px" }}>
            <AdvantageList sheet={item} />
            <div style={{ display: "flex", marginTop: "20px" }}>
              <Harano value={data.harano} saveValue={() => {}} />
              <Hauglosk value={data.hauglosk} saveValue={() => {}} />
            </div>
            <RusticBox
              style={{
                marginTop: "32px",
              }}
            >
              <RusticBox.Item
                style={{
                  minHeight: "200px",
                }}
                titleSize="medium"
                title={t("Appearance", { context: "sheet" })}
              >
                <Inputable
                  type="textarea"
                  value={data.appearance}
                  onChange={(e) => {
                    item.setAppearance(e.target.value);
                  }}
                />
              </RusticBox.Item>
            </RusticBox>
            <RusticBox
              style={{
                marginTop: "-12px",
              }}
            >
              <RusticBox.Item
                style={{
                  minHeight: "300px",
                }}
                titleSize="medium"
                title={t("History", { context: "sheet" })}
              >
                <Inputable
                  type="textarea"
                  value={data.history}
                  onChange={(e) => {
                    item.setHistory(e.target.value);
                  }}
                />
              </RusticBox.Item>
            </RusticBox>
          </div>
          <div style={{ width: "50%", paddingTop: "40px" }}>
            <GarouForms />

            <RusticBox
              style={{
                marginTop: "32px",
              }}
            >
              <RusticBox.Item
                style={{ minHeight: "200px" }}
                titleSize="medium"
                title={t("Notes", { context: "sheet" })}
              >
                <Inputable
                  type="textarea"
                  value={data.notes}
                  onChange={(e) => {
                    item.setNotes(e.target.value);
                  }}
                />
              </RusticBox.Item>
            </RusticBox>
            <p className="ww-tall-title" style={{ marginTop: "20px" }}>
              {t("Total Experience:", { context: "sheet" })}
              _______________________________________________
            </p>
            <p className="ww-tall-title" style={{ marginTop: "20px" }}>
              {t("Spent Experience:", { context: "sheet" })}
              _______________________________________________
            </p>
          </div>
        </div>
      </SheetContainer>
    </div>
  );
};

export default PageBack;
