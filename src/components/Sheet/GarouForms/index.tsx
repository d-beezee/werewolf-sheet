import RusticBox from "@src/components/Styles/RusticBox";
import React from "react";
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
  return (
    <>
      <RusticBox className={className} direction="column">
        <RusticBox.Item
          className="title"
          titleSize="large"
          title="Forms of the Garou"
        ></RusticBox.Item>
        <Item title="HOMID" image={<img src="/forms/Homid.png" />}>
          <p>Cost: Free</p>
          <p>Silver Immunity</p>
        </Item>
        <Item title="GLABRO" image={<img src="/forms/Glabro.png" />}>
          <p>Cost: One Rage Check</p>
          <p>Physical Tests: Two-Dice Bonus</p>
          <p>Social Tests: Two-Dice Penalty*</p>
          <p>Regenerate: 1 per Rage Check</p>
        </Item>
        <Item title="CRINOS" image={<img src="/forms/Crinos.png" />}>
          <p>Cost: Two Rage Check</p>
          <p>Spend 1 willpower per turn or frenzy</p>
          <p>Physical Tests: Four-Dice Bonus</p>
          <p>Health Level: +4</p>
          <p>Social and Stealth Tests: Fail</p>
          <p>Regenerate: 2 per Rage Check</p>
          <p>Claws: +3</p>
          <p>Bite: +1 Aggravated</p>
          <p>Causes Delirium</p>
        </Item>
        <Item title="HISPO" image={<img src="/forms/Hispo.png" />}>
          <p>Cost: One Rage Check</p>
          <p>Physical Tests: Two-Dice Bonus**</p>
          <p>Stealth Tests: Two-Dice Penalty</p>
          <p>Social Tests: Limited to wolves and Garou</p>
          <p>Regenerate: 1 per Rage Check</p>
          <p>Bite: +1 Aggravated</p>
        </Item>
        <Item title="LUPUS" image={<img src="/forms/Lupus.png" />}>
          <p>Cost: Free</p>
          <p>Silver Immunity</p>
          <p>Social Tests: Limited to wolves</p>
        </Item>
      </RusticBox>

      <p>* Does not apply to intimidation or non-humans</p>
      <p>** Does not apply to stealth test</p>
    </>
  );
};

const GarouForms = styled(GarouFormsComponent)`
  ${RusticBox.Item}.title {
    height: 0;
  }
`;

export default GarouForms;
