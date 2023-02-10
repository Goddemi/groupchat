import Head from "next/head";
import { useSelector } from "react-redux";
import UserList from "../components/userList/UserList";
import { getUserListWithArray } from "../components/userList/api/userList";
import { RootState } from "../store/store";

interface Props {
  userArrayList: string[];
}

function Home({ userArrayList }: Props) {
  const loginUser = useSelector((state: RootState) => state.login.loginUser);
  const userListExceptMe = userArrayList.filter((ele) => ele !== loginUser);

  return (
    <>
      <Head>
        <title>Chat application with Nextron</title>
      </Head>
      <UserList userArrayList={userListExceptMe} />
    </>
  );
}

export default Home;

export async function getServerSideProps() {
  const data = await getUserListWithArray();

  return { props: { userArrayList: data } };
}
