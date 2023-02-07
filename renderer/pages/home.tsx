import React, { useState } from "react";
import Head from "next/head";
import AuthForm from "../components/auth/AuthForm";
import MainLayout from "../components/main/MainLayout";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import axios from "axios";

function Home({ data }: any) {
  const loginUser = useSelector((state: RootState) => state.login.loginUser);

  let userArrayList: string[] = [];

  for (let ele in data) {
    userArrayList = [...userArrayList, data[ele].userEmail];
  }

  return (
    <>
      <Head>
        <title>Chat application with Nextron</title>
      </Head>
      <div className="flex flex-col justify-center items-center font-sans">
        {loginUser ? (
          <div className="mt-1 w-full flex-wrap flex justify-center">
            <MainLayout userArrayList={userArrayList} />
          </div>
        ) : (
          <AuthForm />
        )}
      </div>
    </>
  );
}

export default Home;

export async function getServerSideProps() {
  const { data } = await axios(
    "https://nextron-chat-a24da-default-rtdb.asia-southeast1.firebasedatabase.app/user.json"
  );

  return { props: { data } };
}
