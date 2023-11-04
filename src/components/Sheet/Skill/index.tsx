import { tSkill } from "@src/database/Sheet";
import { styled } from "styled-components";
import Dottable from "../Dottable";
import Inputable from "../Inputable";

const SkillComponent = ({
  title,
  saveValue,
  getValue,
  className,
}: {
  className?: string;
  title: string;
  getValue: () => tSkill;
  saveValue: (skill: tSkill) => void;
}) => {
  return (
    <Dottable
      className={className}
      title={title}
      getValue={() => getValue().value}
      saveValue={(value) => saveValue({ value })}
      allowZero
    >
      <Inputable
        value={getValue().specialty || ""}
        onChange={(e) =>
          saveValue({ value: getValue().value, specialty: e.target.value })
        }
      />
    </Dottable>
  );
};

const Skill = styled(SkillComponent)`
  display: flex;
  align-items: center;
  .title {
    min-width: ${({ title }) => `${title.length}ch`};
    margin-right: 0.5rem;
  }
  ${Inputable} {
    width: ${({ title }) => `calc(22ch - ${title.length}ch)`};
    padding: 0;
    input {
      padding: 0.5rem 0;
      margin-left: 0;
    }
  }
`;

export default Skill;
