import React from "react";
import Head from "next/head";
import Link from "next/link";
// 여기서 로그인 상태값을 가져온다.
//
function Home() {
  return (
    <>
      <Head>
        <title>Chat application with Nextron</title>
      </Head>
      <div className="">
        <span>로그인</span>
      </div>
      <div className="mt-1 w-full flex-wrap flex justify-center">
        <Link href="/next">
          <a className="btn-blue">Go to next page</a>
        </Link>
      </div>
    </>
  );
}

export default Home;
