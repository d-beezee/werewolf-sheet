import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { styled } from "styled-components";
import Button from "../Styles/Button";

const LoginBoxComponent = ({
  className,
  open,
}: {
  className?: string;
  open: boolean;
}) => {
  open;
  return (
    <div className={className}>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
};

const LoginBox = styled(LoginBoxComponent)`
  ${({ open }) => (open ? "" : "display:none;")}
  padding: 20px;
  border-radius: 0 0 0 3px;
  background: #88807b;
  position: absolute;
  right: 0;
  top: 3rem;
  z-index: 100;
  button {
    border: none;
    background: none;
    cursor: pointer;
  }
`;

const NavHeaderComponent = ({ className }: { className?: string }) => {
  const [hovering, setHovering] = useState(false);
  const { data: session } = useSession();

  const user = session?.user ? session.user : null;

  return (
    <>
      <div className={className}>
        <img className="logo" src="/logo.png" />
        <div className="log-button">
          {user ? (
            <img
              style={{ maxWidth: "100%" }}
              onClick={() => setHovering(!hovering)}
              src={user.image || ""}
            />
          ) : (
            <Button className="signin" onClick={() => signIn()}>
              Sign in
            </Button>
          )}
        </div>
      </div>
      <LoginBox open={hovering} />
    </>
  );
};
const NavHeader = styled(NavHeaderComponent)`
  background: #88807b;
  height: 3rem;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  padding: 0 0.5rem;
  align-items: center;
  .log-button {
    height: 100%;
    display: flex;
    align-items: center;
    img {
      height: 80%;
      border-radius: 50%;
      cursor: pointer;
    }
  }
  .logo {
    height: 80%;
  }
  ${Button}.signin {
    scale: 0.7;
  }
`;

export default function Layout({
  children,
}: {
  showSignout?: boolean;
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  return (
    <>
      <NavHeader />
      {session ? (
        children
      ) : (
        <img style={{ margin: "0 auto", display: "block" }} src="/moon.png" />
      )}
    </>
  );
}
