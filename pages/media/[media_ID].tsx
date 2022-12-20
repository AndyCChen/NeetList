import { NextPage } from "next/types"
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

import { getMediaByID } from '../../utils/aniListQueries'
import { Anime } from '../../interfaces/queryInterface'

type Props = {
   media: Anime
}

const MediaPage: NextPage<Props> = ({ media }) => {
   return (
      <div>
         { media.title.english }
      </div>
   )
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
   let id;

   if (context.params) {
      id = context.params.media_ID;
   }

   const media = await getMediaByID({ id: id as unknown as number });

   // return error 404 if request is failed
   if (!media) {
      return {
         notFound: true,
      }
   }

   return {
      props: {
         media,
      }
   }
}

export default MediaPage