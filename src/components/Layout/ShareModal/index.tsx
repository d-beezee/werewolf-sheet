import Sheet from "@src/database/Sheet";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Delete from "../Menu/icons/Delete";

const ModalComponent = ({
  sheet,
  className,
  onClose,
}: {
  sheet: Sheet;
  className?: string;
  open: boolean;
  onClose: () => void;
}) => {
  const { data: session } = useSession();
  const [users, setUsers] = useState<string[]>([]);
  const [newUser, setNewUser] = useState("");

  useEffect(() => {
    sheet.getUsers().then((users) => {
      setUsers(users);
    });
  }, []);

  if (!session?.user?.email) return null;

  return (
    <div className={className}>
      <div onClick={onClose} className="background"></div>
      <div className="content">
        <h5>Share</h5>
        <input
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const newUsers = [...users, newUser];
              sheet.updateUsers(newUsers).then(() => {
                sheet.getUsers().then((users) => {
                  setUsers(users);
                  setNewUser("");
                });
              });
            }
          }}
        />
        <p className="user">
          {users.map((user) => (
            <div key={user}>
              <div
                className={`${
                  session.user?.email === user ? "disabled" : ""
                } delete`}
                onClick={
                  session.user?.email === user
                    ? undefined
                    : () => {
                        const newUsers = users.filter((u) => u !== user);
                        sheet.updateUsers(newUsers).then(() => {
                          sheet.getUsers().then((users) => {
                            setUsers(users);
                            setNewUser("");
                          });
                        });
                      }
                }
              >
                <Delete />
              </div>
              <span>{user}</span>
            </div>
          ))}
        </p>
      </div>
    </div>
  );
};

const Modal = styled(ModalComponent)`
  ${({ open }) =>
    open
      ? `
      .content {
        transform: translateY(0);
      }
      .background {
          opacity: 1;
      }
  `
      : `
      pointer-events: none;
      .content {
        transform: translateY(-500%);
      }
    .background {
        opacity: 0;
    }
  `}
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: 99;
  .background {
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    z-index: -1;
    transition: opacity 0.3s;
  }
  .content {
    transition: transform 0.3s;
    border-radius: 35px;
    box-shadow: 2px 2px 10px 0px #000;
    position: absolute;
    left: 0;
    right: 0;
    top: 20%;
    margin: 0 auto;
    width: 1200px;
    padding: 20px 60px;
    background: #fff;

    h5 {
      margin-bottom: 20px;
      text-align: center;
      margin-top: 0px;
      font-size: 6rem;
    }

    input {
      width: 100%;
    }
    .user div span,
    input {
      font-size: 4rem;
    }
    .user div,
    input {
      margin: 4px 0;
    }

    .user {
      & > div {
        width: 100%;
        overflow: hidden;
        display: inline-flex;
        align-items: center;
        span {
          text-overflow: ellipsis;
          overflow: hidden;
        }
        svg {
          margin-right: 10px;
          width: 5rem;
          &:hover {
            cursor: pointer;
            fill: red;
          }
        }
      }
    }
    .user .disabled {
      svg {
        fill: #ccc;
        pointer-events: none;
      }
    }
  }

  @media (min-width: 768px) {
    .content {
      width: 800px;

      h5 {
        font-size: 3rem;
      }

      .user div span,
      input {
        font-size: 2rem;
      }

      .user {
        div {
          svg {
            width: 2.5rem;
          }
        }
      }
    }
  }
`;

export default Modal;
