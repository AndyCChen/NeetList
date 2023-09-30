import { useEffect, useState, useRef, useCallback, RefObject, ChangeEvent } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import EditMenuStyles from '../../styles/EditMenu.module.css'
import { AnimeData, JSONResponse } from '../../interfaces/userListTypes';
import { relative } from 'path';

type props = {
   id: string,
   title: string
   anime: AnimeData | null,
   onSaveCallback?: (Anime: AnimeData | null) => void,
   toggleEditMenu?: boolean,
}

const EditMenu = ({ id, onSaveCallback, anime, title }: props) => {
   const [toggleEdit, setEdit] = useState(false)
   const [isEditMenuClosed, setIsEditMenuClosed] = useState(false);

   const [toggleDropdown, setToggleDropdown] = useState(false);
   const [isDropdownClosed, setIsDropdownClosed] = useState(false);

   const [category, setCategory] = useState(anime ? anime.category : 'Planning');
   const [startDate, setStartDate] = useState(anime?.start_date ? new Date(anime.start_date) : null);
   const [finishDate, setFinishDate] = useState(anime?.finish_date ? new Date(anime.finish_date) : null);
   const [episodeProgress, setEpisodeProgress] = useState(anime?.episode_progress ? anime.episode_progress : 0);
   const [showScore, setScore] = useState(anime?.score ? anime.score.toString() : '0');

   const statusDropdownRef = useRef(null);

   useEffect(() => {
      const handleTimeout = () => {
         setEdit(false);
         setIsEditMenuClosed(false);
      }

      let timeout: NodeJS.Timeout;

      if (isEditMenuClosed) {
         timeout = setTimeout(handleTimeout, 200);
      }
      
      return (() => {
         clearTimeout(timeout);
      });
   }, [isEditMenuClosed]);

   const handleSave = async (event: React.MouseEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (episodeProgress.toString() === '') {
         setEpisodeProgress(0);
      }

      if (startDate && finishDate) {
         if (startDate > finishDate) {
            alert('Invalid start or finish date!')
            return;
         } 
      }

      const formData = new FormData(event.currentTarget);
      const saveResponse = await fetch(`/api/userLists/saveShow?id=${id}`, {
         method: 'POST',
         body: formData,
      });

      const {
         data: { Anime },
         error
      }: JSONResponse = await saveResponse.json();
      
      if (error) {
         alert('Error, failed to save show!');
         console.log(error);
      } else {
         alert('Show added!');

         if (onSaveCallback) {
            onSaveCallback(Anime);
         }
      }
   }

   const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      const deleteResponse = await fetch(`/api/userLists/deleteShow?id=${id}`);

      const {
         data: { Anime },
         error
      }: JSONResponse = await deleteResponse.json();

      if (error) {
         alert('An error occured!');
         console.log(error);
      } else {
         alert('Show deleted!');

         if (onSaveCallback) {
            onSaveCallback(null);
         }

         setIsEditMenuClosed(true);

         setCategory('Planning');
         setStartDate(null);
         setFinishDate(null);
         setEpisodeProgress(0);
         setScore('0');
      }
   }

   const onEpisodeProgressChanged = (event: ChangeEvent<HTMLInputElement>) => {
      let inputValue = event.target.value as unknown as number;
      if (!(inputValue < 0)) {
         setEpisodeProgress(inputValue);
      } else {
         setEpisodeProgress(0);
      }
   }

   const onStatusFieldClicked = () => {
      setIsDropdownClosed(false);
      
      if (!toggleDropdown) {
         setToggleDropdown(true);
      }
   }

   const onScoreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setScore(event.currentTarget.value);
   }

   const onScoreClicked = (event: React.MouseEvent<HTMLInputElement>) => {
      if (event.currentTarget.value === showScore) {
         setScore('0');
      }
   }

   useEffect(() => {
      let timeout: NodeJS.Timeout;

      if (isDropdownClosed) {
         timeout = setTimeout(() => setToggleDropdown(false), 200);
      }

      return () => clearTimeout(timeout);

   }, [isDropdownClosed])

   const handleClick = useCallback((event: MouseEvent) => {
      event.preventDefault();

      if (!(statusDropdownRef as RefObject<HTMLDivElement>).current?.contains(event.target as Element)) {
         setIsDropdownClosed(true);
      }
   }, []);

   useEffect(() => {
      if (toggleDropdown) {
         document.addEventListener('click', handleClick, true)
      } else {
         document.removeEventListener('click', handleClick, true)
      }
   }, [toggleDropdown])

   return (
      <div className={ EditMenuStyles.editWrapper } onClick={() => { setEdit(true) }}>
         {
            toggleEdit &&
            <form onSubmit={ handleSave }>
               <div
                  className={`
                     ${EditMenuStyles.menuBackground}
                     ${isEditMenuClosed ? EditMenuStyles.closeMenuBackground : EditMenuStyles.openMenuBackground}
                  `}
                  onClick={ () => setIsEditMenuClosed(true) }
               />
               <div className={ `${EditMenuStyles.container} ${isEditMenuClosed ? EditMenuStyles.closeMenu : EditMenuStyles.openMenu}` }>
                  <div className={ EditMenuStyles.title }>{ title }</div>
                  <div className={ EditMenuStyles.formContainer }>
                     <div>
                        <p>Status</p>
                        <input name='showStatus' type='text' value={ category } onClick={ onStatusFieldClicked } readOnly />
                        {
                           toggleDropdown &&
                           <div onClick={ () => setIsDropdownClosed(true) } className={ `${EditMenuStyles.statusDropdown} ${isDropdownClosed ? EditMenuStyles.closeDropdown : EditMenuStyles.openDropdown}` } ref={ statusDropdownRef }>
                              <button onClick={ () => setCategory('Watching') }>Watching</button>
                              <button onClick={ () => setCategory('Planning') }>Planning</button>
                              <button onClick={ () => setCategory('Finished') }>Finished</button>
                              <button onClick={ () => setCategory('Dropped') }>Dropped</button>
                              <button onClick={ () => setCategory('Paused') }>Paused</button>
                           </div>
                        }
                     </div>
                     <div>
                        <p>Score</p>
                        <div className={ EditMenuStyles.scoreInputContainer }>
                              <div className={  EditMenuStyles.scoreInput }>
                                 <input name='score' type='radio' id='5_star' value='5' checked={ showScore === '5' } onChange={ onScoreChange } onClick={ onScoreClicked } readOnly/>
                                    <label htmlFor='5_star'>★</label>
                                 <input name='score' type='radio' id='4_star' value='4' checked={ showScore === '4' } onChange={ onScoreChange } onClick={ onScoreClicked } readOnly/>
                                    <label htmlFor='4_star'>★</label>
                                 <input name='score' type='radio' id='3_star' value='3' checked={ showScore === '3' } onChange={ onScoreChange } onClick={ onScoreClicked } readOnly/>
                                    <label htmlFor='3_star'>★</label>
                                 <input name='score' type='radio' id='2_star' value='2' checked={ showScore === '2' } onChange={ onScoreChange } onClick={ onScoreClicked } readOnly/>
                                    <label htmlFor='2_star'>★</label>
                                 <input name='score' type='radio' id='1_star' value='1' checked={ showScore === '1' } onChange={ onScoreChange } onClick={ onScoreClicked } readOnly/>
                                    <label htmlFor='1_star'>★</label>
                                 <input name='score' type='radio' id='0_star' value='0' checked={ showScore === '0' } style={{ display: 'none' }} readOnly/>
                              </div>
                        </div>
                     </div>
                     <div>
                        <p>Start Date</p>
                        <DatePicker
                           name='startDate'
                           showIcon
                           selected={ startDate }
                           onChange={ (date: Date) => setStartDate(date) }
                        />
                     </div>
                     <div>
                        <p>Finish Date</p>
                        <DatePicker
                           name='endDate'
                           showIcon
                           selected={ finishDate }
                           onChange={ (date: Date) => setFinishDate(date) }
                        />
                     </div>
                     <div>
                        <p>Episode Progress</p>
                        <input name='episodeProgress' type='number'  min={ 0 } value={ episodeProgress } onChange={ onEpisodeProgressChanged }/>
                     </div>
                  </div>
                  <div className={ EditMenuStyles.formButtons }>
                     <button className={ EditMenuStyles.save } type='submit'>
                        Save
                     </button>
                     <button className={ EditMenuStyles.delete } onClick={ handleDelete }>
                        Delete
                     </button>
                  </div>
               </div>
            </form>
         }
      </div>
   )
}

export default EditMenu;