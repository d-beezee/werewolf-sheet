import { useRouter } from "next/router";

const useIsSheet = () => {
  const { pathname } = useRouter();
  return pathname === "/sheet/[slug]";
};

export default useIsSheet;
