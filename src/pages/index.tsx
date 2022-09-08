import type { NextPage } from "next";
import Head from "next/head";
import { customAlphabet } from "nanoid";
import { useRouter } from "next/router";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 4);
const Home: NextPage = () => {
  const router = useRouter();
  function createRoom() {
    const roomId = nanoid();
    router.push(`/rooms/${roomId}`);
  }

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        <button className="btn" onClick={createRoom}>
          create chat rom
        </button>
      </main>
    </>
  );
};

export default Home;
