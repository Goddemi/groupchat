import React, { useState } from "react";
import Head from "next/head";
import axios from "axios";
import UserList from "../components/user/UserList";
import { getUserListWithArray } from "../components/auth/api/userList";

interface Props {
  data: string[];
}

function Home({ data }: Props) {
  const userArrayList = data;

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

export default Home;

export async function getServerSideProps() {
  const data = await getUserListWithArray();

  return { props: { data } };
}
