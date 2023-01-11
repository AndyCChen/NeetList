import { NextPage } from "next/types"
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

import { useMediaQuery } from "../../hooks/useMediaQuery" 
import { getMediaByID } from '../../utils/aniListQueries'
import { AnimeInfo } from '../../interfaces/queryInterface'
import MediaPageStyles from '../../styles/MediaPage.module.css'

type Props = {
   media: AnimeInfo
}

const MediaPage: NextPage<Props> = ({ media }) => {

   const height = useMediaQuery(
		[
			'only screen and (max-width: 800px)',
			'only screen and (max-width: 1200px)'
		],
		[
			'200', 
			'300',
		],
		'300'
	);

   const [isOverflow, setIsOverflow] = useState(false);

   const headerContainerRef = useRef<HTMLDivElement>(null);
   const headerTitleRef = useRef<HTMLHeadingElement>(null);
   const descriptionRef = useRef<HTMLParagraphElement>(null);
   
   useEffect(() => {
      const handleResize = () => {
         if (headerContainerRef.current && headerTitleRef.current && descriptionRef.current) {
            const headerContainerHeight = headerContainerRef.current.clientHeight;
            const headerTitleHeight = headerTitleRef.current.clientHeight;
            const descriptionHeight = descriptionRef.current.clientHeight;

            const isOverflowing = (headerTitleHeight + descriptionHeight) > headerContainerHeight;
            setIsOverflow(isOverflowing);
         }
       }

      // run handleResize on initial render
      handleResize();
      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
   }, []);

   useEffect(() => {
      console.log(isOverflow);
   }, [isOverflow])

   return (
      <div>
      {
         media.bannerImage &&
         <div className={ MediaPageStyles.headerImageContainer }>
            <Image
               src={ media.bannerImage }
               height={ height }
               width={ 1900 }
               objectFit='cover'
               layout='fixed'
               draggable='false'
            />
         </div>
      }
         <div className={ MediaPageStyles.headerContainer } ref={ headerContainerRef }>
            
            <div className={ MediaPageStyles.headerText }>
               <h1 ref={ headerTitleRef }>{ media.title.english ? media.title.english : media.title.romaji }</h1>
               <p ref={ descriptionRef } dangerouslySetInnerHTML={{ __html: media.description } }/>
               <span className={ MediaPageStyles.readMore }>Read More</span>
            </div>
         </div>
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