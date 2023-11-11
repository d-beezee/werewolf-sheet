import useIsSheet from "@src/hooks/useIsSheet";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
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
  const isSheet = useIsSheet();

  const locale =
    (typeof window !== "undefined" &&
      window.localStorage.getItem("MY_LANGUAGE")) ||
    "it";
  return (
    <div className={`${className} ${isSheet ? "sheet" : ""}`}>
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
  ${({ open }) => (open ? "display: flex;" : "display:none;")}
  padding: 20px;
  border-radius: 0 0 0 3px;
  background-image: url("/navbg.jpg ");
  position: absolute;
  right: 0;
  top: 3rem;
  z-index: 100;

  flex-direction: column;
  gap: 10px;
  button {
    color: white;
    border: none;
    background: none;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    &.sheet {
      top: 9rem;
      button {
        font-size: 3.5rem;
      }
    }
  }
`;

const NavigationTitleComponent = ({ className }: { className?: string }) => {
  const { pathname } = useRouter();

  function _backItem() {
    if (pathname === "/") return null;
    if (pathname === "/sheet") return { title: "Back home", url: "/" };
    if (pathname === "/sheet/[slug]")
      return { title: "Back to sheets", url: "/sheet" };
    return null;
  }
  const backItem = _backItem();

  if (null === backItem) return null;

  const { title, url } = backItem;

  return (
    <div className={className} onClick={() => (location.href = url)}>
      {title}
    </div>
  );
};

const NavigationTitle = styled(NavigationTitleComponent)`
  cursor: pointer;
  color: #fff;
  padding: 2% 5%;
`;

const NavHeaderComponent = ({ className }: { className?: string }) => {
  const [hovering, setHovering] = useState(false);
  const isSheet = useIsSheet();
  const { data: session } = useSession();

  const user = session?.user ? session.user : null;

  return (
    <>
      <div className={`${className} ${isSheet ? "sheet" : ""}`}>
        <a className="logo" href="/">
          <img src="/logo.png" />
        </a>
        <NavigationTitle />
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

  @media (max-width: 768px) {
    &.sheet {
      height: 140px;

      ${NavigationTitle} {
        font-size: 4rem;
      }
    }
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
        <img
          style={{ margin: "3rem auto", display: "block", maxWidth: "60%" }}
          src="/moon.png"
        />
      )}
    </>
  );
}
