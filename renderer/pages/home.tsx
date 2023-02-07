import React, { useState } from "react";
import Head from "next/head";
import axios from "axios";
import UserList from "../components/user/UserList";

function Home({ data }: any) {
  let userArrayList: string[] = [];

  for (let ele in data) {
    userArrayList = [...userArrayList, data[ele].userEmail];
  }

  return (
    <>
      <Head>
        <title>Chat application with Nextron</title>
      </Head>
      <div className="flex flex-col justify-center items-center">
        <UserList userArrayList={userArrayList} />
      </div>
    </>
  );
}

//데이터를 잘못생각했다.

export default Home;

export async function getServerSideProps() {
  const { data } = await axios(
    "https://nextron-chat-a24da-default-rtdb.asia-southeast1.firebasedatabase.app/user.json"
  );

  return { props: { data } };
}
