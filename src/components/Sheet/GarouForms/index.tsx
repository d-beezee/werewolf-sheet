import RusticBox from "@src/components/Styles/RusticBox";
import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const ItemComponent = ({
  className,
  title,
  children,
  image,
}: {
  className?: string;
  title: string;
  children?: React.ReactNode;
  image?: React.ReactNode;
}) => {
  return (
    <RusticBox.Item className={`${className} item`} titleSize="large">
      <div className="item-title ww-tall-title">{title}</div>
      <div className="item-content">{children}</div>
      <div className="item-image">{image}</div>
    </RusticBox.Item>
  );
};

const Item = styled(ItemComponent)`
  .container {
    .item-title {
      width: 20%;
      display: flex;
      align-items: center;
      transform: skew(-10deg);
    }
    .item-content {
      width: 60%;
    }
    .item-image {
      flex-grow: 1;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      img {
        max-width: 100%;
        height: fit-content;
      }
    }
    display: flex;
  }
`;

const GarouFormsComponent = ({ className }: { className?: string }) => {
  const { t } = useTranslation();
  return (
    <>
      <RusticBox className={className} direction="column">
        <RusticBox.Item
          className="title"
          titleSize="large"
          title={t("Forms of the Garou", { context: "sheet" })}
        ></RusticBox.Item>
        <Item title="HOMID" image={<img src="/forms/Homid.png" />}>
          <p>{t("Cost: Free", { context: "garouforms" })}</p>
          <p>{t("Silver Immunity", { context: "garouforms" })}</p>
        </Item>
        <Item title="GLABRO" image={<img src="/forms/Glabro.png" />}>
          <p>{t("Cost: One Rage Check", { context: "garouforms" })}</p>
          <p>
            {t("Physical Tests: Two-Dice Bonus", { context: "garouforms" })}
          </p>
          <p>
            {t("Social Tests: Two-Dice Penalty", { context: "garouforms" })}*
          </p>
          <p>{t("Regenerate: 1 per Rage Check", { context: "garouforms" })}</p>
        </Item>
        <Item title="CRINOS" image={<img src="/forms/Crinos.png" />}>
          <p>{t("Cost: Two Rage Check", { context: "garouforms" })}</p>
          <p>
            {t("Spend 1 willpower per turn or frenzy", {
              context: "garouforms",
            })}
          </p>
          <p>
            {t("Physical Tests: Four-Dice Bonus", { context: "garouforms" })}
          </p>
          <p>{t("Health Level: +4", { context: "garouforms" })}</p>
          <p>
            {t("Social and Stealth Tests: Fail", { context: "garouforms" })}
          </p>
          <p>{t("Regenerate: 2 per Rage Check", { context: "garouforms" })}</p>
          <p>{t("Claws: +3", { context: "garouforms" })}</p>
          <p>{t("Bite: +1 Aggravated", { context: "garouforms" })}</p>
          <p>{t("Causes Delirium", { context: "garouforms" })}</p>
        </Item>
        <Item title="HISPO" image={<img src="/forms/Hispo.png" />}>
          <p>{t("Cost: One Rage Check", { context: "garouforms" })}</p>
          <p>
            {t("Physical Tests: Two-Dice Bonus", { context: "garouforms" })}**
          </p>
          <p>
            {t("Stealth Tests: Two-Dice Penalty", { context: "garouforms" })}
          </p>
          <p>
            {t("Social Tests: Limited to wolves and Garou", {
              context: "garouforms",
            })}
          </p>
          <p>{t("Regenerate: 1 per Rage Check", { context: "garouforms" })}</p>
          <p>{t("Bite: +1 Aggravated", { context: "garouforms" })}</p>
        </Item>
        <Item title="LUPUS" image={<img src="/forms/Lupus.png" />}>
          <p>{t("Cost: Free", { context: "garouforms" })}</p>
          <p>{t("Silver Immunity", { context: "garouforms" })}</p>
          <p>
            {t("Social Tests: Limited to wolves", { context: "garouforms" })}
          </p>
        </Item>
      </RusticBox>

      <p>
        *{" "}
        {t("Does not apply to intimidation or non-humans", {
          context: "garouforms",
        })}
      </p>
      <p>** {t("Does not apply to stealth test", { context: "garouforms" })}</p>
    </>
  );
};

const GarouForms = styled(GarouFormsComponent)`
  ${RusticBox.Item}.title {
    height: 0;
  }
`;

export default GarouForms;
