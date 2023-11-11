import { tSkill } from "@src/database/Sheet";
import { styled } from "styled-components";
import Dottable from "../Dottable";
import Inputable from "../Inputable";

const SkillComponent = ({
  title,
  saveValue,
  value,
  className,
}: {
  className?: string;
  title: string;
  value: tSkill;
  saveValue: (skill: tSkill) => void;
}) => {
  return (
    <Dottable
      className={className}
      title={title}
      value={value?.value || 0}
      saveValue={(value) => saveValue({ value })}
      allowZero
    >
      <Inputable
        value={value?.specialty || ""}
        onChange={(e) =>
          saveValue({ value: value?.value || 0, specialty: e.target.value })
        }
      />
    </Dottable>
  );
};

const Skill = styled(SkillComponent)`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  .title {
    min-width: ${({ title }) => `${title.length}ch`};
    margin-right: 0.5rem;
  }
  ${Inputable} {
    width: ${({ title }) => `calc(22ch - ${title.length}ch)`};
    padding: 0;
    input {
      padding: 0.25rem 0;
      margin-left: 0;
    }
  }
`;

export default Skill;
