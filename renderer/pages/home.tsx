import Head from "next/head";
import UserList from "../components/user/UserList";
import { getUserListWithArray } from "../components/auth/api/userList";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
interface Props {
  data: string[];
}

function Home({ data }: Props) {
  const loginUser = useSelector((state: RootState) => state.login.loginUser);
  const userArrayList = data;

  const userListExceptMe = userArrayList.filter((ele) => ele !== loginUser);

  return (
    <>
      <Head>
        <title>Chat application with Nextron</title>
      </Head>
      <div className="flex flex-col justify-center items-center">
        <UserList userArrayList={userListExceptMe} />
      </div>
    </>
  );
}

export default Home;

export async function getServerSideProps() {
  const data = await getUserListWithArray();

  return { props: { data } };
}
