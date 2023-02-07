import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import AuthForm from "../auth/AuthForm";
import Nav from "../nav/Nav";

const Layout = ({ children }) => {
  const loginUser = useSelector((state: RootState) => state.login.loginUser);

  return (
    <>
      {loginUser ? (
        <div>
          <Nav />
          <div className="px-8">{children}</div>
        </div>
      ) : (
        <AuthForm />
      )}
    </>
  );
};

export default Layout;
