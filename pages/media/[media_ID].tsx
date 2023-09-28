import { NextPage } from "next/types"
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Image from "next/legacy/image"
import { useEffect, useRef, useState, Fragment } from "react"
import { useUser } from "@supabase/auth-helpers-react"
import EditMenu from "../../components/animeList/EditMenu"

import { useMediaQuery } from "../../hooks/useMediaQuery" 
import { getMediaByID } from '../../utils/aniListQueries'
import { AnimeInfo, FuzzyDate } from '../../interfaces/queryInterface'
import { JSONResponse, AnimeData } from '../../interfaces/userListTypes'
import MediaPageStyles from '../../styles/MediaPage.module.css'
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "../../interfaces/supabase"


type Props = {
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
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      setIsLoading(false);
   }, []);

   if (!isLoading) {
      return (
         <MediaPageBody media={ media } userShow={ userShow }/>
      )
   } else {
      return (
         <div></div>
      )
   }
}

const MediaPageBody = ({ media, userShow }: Props) => {
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

   const [toggleEdit, setToggleEdit] = useState(false);
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

   const handleAddToList = async () => {
      if (!user) {
         alert('Must Login');
         return;
      }
      setToggleEdit(true);
   }

   const handleSetShow = async (status: string) => {
      if (!user) {
         alert('Must Login');
         return;
      }

      const setResponse = await fetch(`/api/userLists/setShow?status=${status}&id=${ media.id }`, {
         method: 'POST',
      });

      const { 
         data: { Anime },
         error
       }: JSONResponse = await setResponse.json();

      if (error) {
         console.log(error);
         alert('There was an error!');
      } else {
         alert('Show added!')
         console.log(Anime);
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
                  <div className={ MediaPageStyles.addButton } onClick={ handleAddToList }>{ anime ? anime.category : 'Add to List' }</div>
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
            <div className={ MediaPageStyles.sideBar }>
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
            
         </div>
         {
            toggleEdit &&
            <EditMenu 
               id= { media.id }
               closeEdit={ () => setToggleEdit(!toggleEdit) }
               title={ media.title.english ? media.title.english : media.title.romaji }
               status= { anime?.category }
               score= { anime?.score ? anime.score.toString() : '0'}
               progress={ anime?.episode_progress }
               startingDate={ anime?.start_date ? new Date(anime.start_date) : null }
               finishingDate={ anime?.finish_date ? new Date(anime.finish_date) : null }
               callback={ (show) => setAnime(show) }
            />
         }
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

   const supabase = createPagesServerClient<Database>(context);

   const {
      data: { user }
   } = await supabase.auth.getUser();

   // check if show is added in user's list by fetching from database
  if (user) {
      const { data: userShow, error } = await supabase
         .from('shows')
         .select()
         .match({
            'user_id': user.id,
            'anime_id': id
         });
      
      return {
         props: {
            media,
            userShow,
         }
      }
  }

   return {
      props: {
         media,
      }
   }
}

export default MediaPage