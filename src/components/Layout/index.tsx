import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { styled } from "styled-components";
import Button from "../Styles/Button";
import Loader from "./Loader";

const LoginBoxComponent = ({
  className,
}: {
  className?: string;
  open: boolean;
}) => {
  const locale =
    (typeof window !== "undefined" &&
      window.localStorage.getItem("MY_LANGUAGE")) ||
    "it";
  return (
    <div className={className}>
      <button
        onClick={() => {
          locale === "it"
            ? window.localStorage.setItem("MY_LANGUAGE", "en")
            : window.localStorage.setItem("MY_LANGUAGE", "it");
          window.location.reload();
        }}
      >
        {locale === "it" ? "Switch to english" : "Switch to italian"}{" "}
      </button>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
};

const LoginBox = styled(LoginBoxComponent)`
  ${({ open }) => (open ? "" : "display:none;")}
  padding: 20px;
  border-radius: 0 0 0 3px;
  background-image: url("/navbg.jpg ");
  position: absolute;
  right: 0;
  top: 3rem;
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 10px;
  button {
    color: white;
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
        <a className="logo" href="/">
          <img src="/logo.png" />
        </a>
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
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.5);
  background-image: url("/navbg.jpg ");
  background-size: 15%;
  height: 3rem;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  padding: 5px 1.5rem;
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
    img {
      height: 100%;
    }
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
  const { data: session, status } = useSession();
  if (status === "loading") return <Loader />;
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
