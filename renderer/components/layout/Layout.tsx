import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Nav from "../nav/Nav";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const loginUser = useSelector((state: RootState) => state.login.loginUser);
  const router = useRouter();

  useEffect(() => {
    if (!loginUser && router.pathname !== "/home") {
      router.push("/home");
    }
  }, []);

  return (
    <>
      <div>
        {loginUser && <Nav />}
        <div className="px-8">{children}</div>
      </div>
    </>
  );
};

export default Layout;
