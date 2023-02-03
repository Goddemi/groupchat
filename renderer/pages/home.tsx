import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import AuthForm from "../components/auth/AuthForm";
// 여기서 로그인 상태값을 가져온다.

function Home() {
  const [loginState, setLoginState] = useState(false);

  return (
    <>
      <Head>
        <title>Chat application with Nextron</title>
      </Head>
      <div className="flex flex-col justify-center items-center">
        {loginState ? (
          <div className="mt-1 w-full flex-wrap flex justify-center">
            <Link href="/next">
              <a className="btn-blue">Go to next page</a>
            </Link>
          </div>
        ) : (
          <AuthForm setLoginState={setLoginState} />
        )}
      </div>
    </>
  );
}

export default Home;
