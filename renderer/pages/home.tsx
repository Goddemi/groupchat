import Head from "next/head";
import AuthForm from "../components/auth/AuthForm";

function Home() {
  return (
    <>
      <Head>
        <title>Chat application with Nextron</title>
      </Head>
      <AuthForm />
    </>
  );
}

export default Home;
