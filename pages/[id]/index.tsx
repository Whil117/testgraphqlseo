/* eslint-disable react/jsx-no-undef */
/* eslint-disable jsx-a11y/alt-text */
import { NextPageContext } from "next";
import Image from "next/image";
import { FC } from "react";
import { ARTISTBYID } from "..";
import AtomSeo from "../components/@atoms/AtomSeo";
import { client } from "../_app";

type Props = {};

const ArtistbyId: FC<Props> = ({ artistById }: any) => {
  return (
    <>
      <AtomSeo
        title="Swap Test"
        page={artistById?.name}
        image={artistById?.images && artistById?.images[0]?.url}
        description="Swap is a music platform that allows you to discover new music and connect with people who share the same taste."
        keywords={["nextjs", "typescript"]}
      />
      <div>
        <h1>{artistById?.name}</h1>
        <Image
          src={artistById?.images && artistById?.images[0]?.url}
          width={320}
          height={320}
        />
      </div>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;
  const { data } = await client.query({
    query: ARTISTBYID,
    variables: {
      id,
    },
  });

  return {
    props: {
      id,
      artistById: data?.artistById,
    },
  };
}

export default ArtistbyId;
