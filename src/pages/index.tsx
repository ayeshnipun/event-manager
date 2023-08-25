import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";

import Dashstuff from "../components/Dashstuff";

const Home: NextPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="mx-auto flex">
        <div className="flex items-center justify-center w-full">
          <div className="mx-auto w-full text-gray-900">
            <Dashstuff />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
