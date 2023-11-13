import { NextPage } from "next/types"
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Image from "next/legacy/image"
import { useEffect, useRef, useState, Fragment } from "react"
import { useUser } from "@supabase/auth-helpers-react"
import EditMenu from "../../components/animeList/EditMenu"
import Link from "next/link"

import { useMediaQuery } from "../../hooks/useMediaQuery" 
import { getMediaByID } from '../../utils/aniListQueries'
import { AnimeInfo, FuzzyDate } from '../../interfaces/queryInterface'
import { JSONResponse, AnimeData } from '../../interfaces/userListTypes'
import MediaPageStyles from '../../styles/MediaPage.module.css'
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "../../interfaces/supabase"
import { ParsedUrlQuery } from "querystring"


type Props = {
   key: string,
   media: AnimeInfo,
   userShow: AnimeData[] | null,
}

const parseStatus = (status: string) => {
   switch (status) {
      case 'FINISHED':
         return 'Finished';
      case 'RELEASING':
         return 'Releasing';
      case 'NOT_YET_RELEASED':
         return 'Not yet released';
      case 'CANCELLED':
         return 'Canceled';
      case 'HIATUS':
         return 'Hiatus';
      default:
         return 'TBA';
   }
}

const parseFuzzyDate = ({ year, month, day }: FuzzyDate): string => {
   const monthNames = [
      "January", "February", "March", "April", 
      "May", "June", "July", "August", 
      "September", "October", "November", "December"
   ];

   const y = year.toString();

   // return only year if month and day are 0
   if (!month && !day) return y;

   const m = monthNames[month - 1];

   // return month and year if only day is 0
   // e.g Jan, 2023
   if (!day) return m + ' ' + y;

   const d = day.toString();

   return m + ' ' + d + ', ' + y;
}

const MediaPage: NextPage<Props> = ({ media, userShow }) => {
   const user = useUser();

   const height = useMediaQuery(
      [
         'only screen and (max-width: 800px)',
         'only screen and (max-width: 1200px)'
      ],
      [
         200, 
         300,
      ],
      300
   );

   const [isOverflow, setIsOverflow] = useState(false);
   const [isReadme, setIsReadme] = useState(false);
   const [showAddOptions, setShowAddOptions] = useState(false);
   const [anime, setAnime] = useState<AnimeData | null>(userShow ? userShow[0] : null);

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
   }, []);

   

   const handleReadmeClick = () => {
      setIsOverflow(false);
      setIsReadme(true);
   }

   const handleSetShow = async (status: string) => {
      if (!user) {
         alert('Must Login');
         return;
      }

      const setResponse = await fetch(`/api/userLists/setShow?status=${status}&id=${ media.id }`, {
         method: 'POST',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
         body: JSON.stringify({
            status: status,
            id: media.id,
            imageURL: media.coverImage.medium,
            title: media.title.english ? media.title.english : (media.title.romaji ? media.title.romaji : media.title.native),
         })
      });

      const { 
         data: { Anime },
         error
       }: JSONResponse = await setResponse.json();

      if (error) {
         console.log(error);
         alert(error.message);
      } else {
         alert('Show added!')
         setAnime(Anime);
      }
   }
   
   return (
      <div>
         {
            media.bannerImage &&
            <div className={ MediaPageStyles.headerImageContainer }>
               <Image
                  src={ media.bannerImage }
                  alt={ 'banner image' }
                  height={ height }
                  width={ 1900 }
                  objectFit='cover'
                  layout='fixed'
                  draggable='false'
               />
            </div>
         }
         <div className={ MediaPageStyles.headerContainer } ref={ headerContainerRef } style={{height: isReadme ? 'auto' : '250px'}}>
            <div className={ MediaPageStyles.coverImageContainer }>
               <Image
                  alt={ 'thumbnail' }
                  src={ media.coverImage.large }
                  height={ 280 }
                  width={ 200 }
                  layout='fixed'
                  draggable='false'
               />
               <div className={ MediaPageStyles.addButtonContainer }>
                  <div className={ MediaPageStyles.addButton } onClick={ () => !user && alert('Must login!') }>
                     { anime ? anime.category : 'Add to List' }
                     <EditMenu 
                        id= { media.id }
                        onSaveCallback={ ({ anime, deleteShow }) => { 
                           if (anime && !deleteShow) 
                              setAnime(anime);
                           else 
                              setAnime(null);
                         }}
                        title={ media.title.english ? media.title.english : media.title.romaji ? media.title.romaji : media.title.native }
                        imageURL={ media.coverImage.medium }
                        anime={ anime }
                     />
                  </div>
                  <div className={ MediaPageStyles.addButtonOptions } onClick={() => setShowAddOptions(!showAddOptions)}>
                     <Image src='/addOptions.svg' alt={ 'icon' } height={15} width={15} layout='fixed' style={{color: 'white'}}/>
                     <div className={ `${MediaPageStyles.optionsContainer} ${showAddOptions ? MediaPageStyles.openOptions : MediaPageStyles.closeOptions}` }>
                        <div onClick={ () => handleSetShow('Watching') }>Set as Watching</div>
                        <div onClick={ () => handleSetShow('Planning') }>Set as Planning</div>
                     </div>
                  </div>
               </div>
            </div>
            <div className={ MediaPageStyles.headerText }>
               <h1 ref={ headerTitleRef }>{ media.title.english ? media.title.english : media.title.romaji }</h1>
               <p ref={ descriptionRef } dangerouslySetInnerHTML={{ __html: media.description } }/>
               {
                  isOverflow && <span className={ MediaPageStyles.readMore } onClick={ handleReadmeClick }>Read More</span>
               }
            </div>
         </div>
         <div className={ MediaPageStyles.contentContainer }>
            <div className={ MediaPageStyles.sideBar } style={{ marginTop: isReadme ? '15px' : '110px' }}>
               <div>
                  <h4>Format</h4>
                  <p>{ media.format }</p>
               </div>
               {
                  media.episodes && 
                     <div>
                        <h4>Episodes</h4>
                        <p>{ media.episodes }</p>
                     </div>
               }
               <div>
                  <h4>Status</h4>
                  <p>{ parseStatus(media.status) }</p>
               </div>
               <div>
                  <h4>Start Date</h4>
                  <p>{ parseFuzzyDate(media.startDate) }</p>
               </div>
              {
                  media.endDate.year &&
                     <div>
                        <h4>End Date</h4>
                        <p>{ parseFuzzyDate(media.endDate) }</p>
                     </div>
              }
              <div>
                  <h4>Season</h4>
                  <p>{ media.season } { media.seasonYear }</p>
               </div>
               {
                  media.studios.nodes.length != 0 &&
                  <div>
                     <h4>Studio</h4>
                     <p>{ media.studios.nodes[0].name }</p>
                  </div>
               }
               <div>
                  <h4>Genres</h4>
                  <p>
                     {
                        media.genres.map((genre: string, index: number) => 
                           <Fragment key={ index }>
                              { genre }<br/>
                           </Fragment>
                        )
                     }
                  </p>
               </div>
            </div>
            <div className={ MediaPageStyles.contentBody }>
               <div>
                  <h1 className={ MediaPageStyles.barHeader }>Characters</h1>
                  <div className={ MediaPageStyles.contentBar }>
                     {
                        media.characters.edges.map(({ node: { name, image }, role }) =>
                           <div className={ MediaPageStyles.contentBarGridItem} key={ name.full }>
                              <Image
                                 style={{ borderRadius: '5px'}}
                                 src={ image.large }
                                 alt='character image'
                                 height={75}
                                 width={55}
                              />
                              <div className={ MediaPageStyles.characterInfo }>
                                 <p>{ name.full }</p>
                                 <p>{ role }</p>
                              </div>
                           </div>
                        )
                     }
                  </div>
               </div>
               <div>
                  <h1 className={ MediaPageStyles.barHeader }>Recommended</h1>
                  <div className={ MediaPageStyles.recommendedBar }>
                  {
                     media.recommendations.nodes.map(({ mediaRecommendation: {coverImage, title, id} }) =>
                        <Link key={ id } href={`/media/${ encodeURIComponent(id) }`}>
                           <div className={ MediaPageStyles.recommendedBarGridItem }>
                              <Image
                                 src={ coverImage.large }
                                 alt='anime cover image'
                                 height={200}
                                 width={150}
                                 style={{ borderRadius: '5px'}}
                              />
                              <p>
                                 { title.english ? title.english : title.romanji ? title.romanji : title.native }
                              </p>
                           </div>
                        </Link>
                     )
                  }
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export const getServerSideProps: GetServerSideProps<Props> = async (context: GetServerSidePropsContext) => {
   const checkParams = (urlParameters: ParsedUrlQuery): boolean => {
      return urlParameters.media_ID as unknown as number !== undefined;
   }

   if (!context.params || !checkParams(context.params)) {
      return {
         notFound: true,
      }
   }

   const id = context.params.media_ID as unknown as number;

   const media = await getMediaByID({ id: id });

   // return error 404 if request is failed
   if (!media) {
      return {
         notFound: true,
      }
   }

   const supabase = createPagesServerClient<Database>(context);

   const {
      data: { user }
   } = await supabase.auth.getUser();

   if (!user) {
      return {
         props: {
            key: media.id,
            media: media,
            userShow: null,
         }
      }
   }

   // check if show is added in user's list by fetching from database
   const { data: userShow, error } = await supabase
      .from('shows')
      .select()
      .match({
         'user_id': user.id,
         'anime_id': id
      });

   if (error) {
      return {
         notFound: true
      }
   }

   return {
      props: {
         key: media.id,
         media: media,
         userShow: userShow.length !== 0 ? userShow : null,
      }
   }
}

export default MediaPage