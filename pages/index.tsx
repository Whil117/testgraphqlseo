/* eslint-disable jsx-a11y/alt-text */
import { gql } from "@apollo/client";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import AtomSeo from "./components/@atoms/AtomSeo";
import { client } from "./_app";

export const ARTISTBYID = gql`
  query artistById($id: String!) {
    artistById(id: $id) {
      id
      name
      description
      images {
        url
        height
        width
      }
      uri
      followers
      type
      genres
      biography
      backgroundCover
      href
    }
  }
`;
export const LISTARTISTS = gql`
  query {
    listArtist {
      id
      name
      description
      genres
      type
      images {
        url
        height
        width
      }
      biography
      followers
    }
  }
`;

const Home: NextPage = ({ listArtist }: any) => {
  return (
    <>
      <AtomSeo
        title="Swap Test"
        page="Public"
        image={listArtist[0]?.images[0]?.url}
        description="Swap Test"
        keywords={["nextjs", "typescript"]}
      />
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>Welcome to Swap Public</h1>
          <div className={styles.grid}>
            {listArtist.map((artist: any) => (
              <Link href={artist?.id} key={artist.id}>
                <a className={styles.card}>
                  <p>{artist?.name}</p>
                  <Image
                    src={artist?.images[0]?.url}
                    width={120}
                    height={120}
                  />
                </a>
              </Link>
            ))}
          </div>
        </main>

        <footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{" "}
            <span className={styles.logo}>
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                width={72}
                height={16}
              />
            </span>
          </a>
        </footer>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const data = await client.query({
    query: LISTARTISTS,
    variables: {},
  });
  console.log(data);

  return {
    props: {
      listArtist: data.data.listArtist,
    },
  };
}

export default Home;
