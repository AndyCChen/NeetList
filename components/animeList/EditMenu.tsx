import { useEffect, useState, useRef, useCallback, RefObject, ChangeEvent } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import EditMenuStyles from '../../styles/EditMenu.module.css'

type props = {
   closeEdit: () => void,
   title: string,
   status: string,
   score: string,
   progress: number,
   
}

const EditMenu = ({ closeEdit, title, status, score, progress }: props) => {
   const [isEditMenuClosed, setIsEditMenuClosed] = useState(false);
   const [showStatus, setShowStatus] = useState(status);
   const [toggleDropdown, setToggleDropdown] = useState(false);
   const [isDropdownClosed, setIsDropdownClosed] = useState(false);
   const [startDate, setStartDate] = useState(new Date());
   const [finishDate, setFinishDate] = useState(new Date());
   const [episodeProgress, setEpisodeProgress] = useState(progress);
   const [showScore, setShowScore] = useState(score);

   const statusDropdownRef = useRef(null);

   useEffect(() => {
      let timeout: NodeJS.Timeout;

      if (isEditMenuClosed) {
         timeout = setTimeout(closeEdit, 200);
      }
      
      return (() => {
         clearTimeout(timeout);
      });
   }, [isEditMenuClosed]);

   const handleSave = async (event: React.MouseEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!episodeProgress) {
         alert('Invalid episode progress');
         return;
      }

      if (startDate > finishDate) {
         alert('Invalid start date!')
         return;
      }

      const formData = new FormData(event.currentTarget);
      const id = '202038';
      const saveResponse = await fetch(`/api/userLists/saveShow?id=${id}`, {
         method: 'POST',
         body: formData,
      });
   }

   const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
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
      setShowScore(event.currentTarget.value);
   }

   const onScoreClicked = (event: React.MouseEvent<HTMLInputElement>) => {
      if (event.currentTarget.value === showScore) {
         setShowScore('0');
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
      if (!(statusDropdownRef as RefObject<HTMLDivElement>).current?.contains(event.target as Element)) {
         setIsDropdownClosed(true);
      }

      console.log('clicked!')
   }, []);

   useEffect(() => {
      if (toggleDropdown) {
         document.addEventListener('click', handleClick, true)
      } else {
         document.removeEventListener('click', handleClick, true)
      }
   }, [toggleDropdown])

   return (
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
                  <input name='showStatus' type='text' value={ showStatus } onClick={ onStatusFieldClicked } readOnly />
                  {
                     toggleDropdown &&  
                     <div className={ `${EditMenuStyles.statusDropdown} ${isDropdownClosed ? EditMenuStyles.closeDropdown : EditMenuStyles.openDropdown}` } ref={ statusDropdownRef }>
                        <button onClick={ () => setShowStatus('Watching') }>Watching</button>
                        <button onClick={ () => setShowStatus('Planning') }>Planning</button>
                        <button onClick={ () => setShowStatus('Finished') }>Finished</button>
                        <button onClick={ () => setShowStatus('Dropped') }>Dropped</button>
                        <button onClick={ () => setShowStatus('Paused') }>Paused</button>
                     </div>
                  }
               </div>
               <div>
                  <p>Score</p>
                  <div className={ EditMenuStyles.scoreInputContainer }>
                        <div className={  EditMenuStyles.scoreInput }>
                           <input name='score' type='radio' id='5_star' value='5' defaultChecked={ showScore === '5' } onChange={ onScoreChange } onClick={ onScoreClicked }/><label htmlFor='5_star'>★</label>
                           <input name='score' type='radio' id='4_star' value='4' defaultChecked={ showScore === '4' } onChange={ onScoreChange } onClick={ onScoreClicked }/><label htmlFor='4_star'>★</label>
                           <input name='score' type='radio' id='3_star' value='3' defaultChecked={ showScore === '3' } onChange={ onScoreChange } onClick={ onScoreClicked }/><label htmlFor='3_star'>★</label>
                           <input name='score' type='radio' id='2_star' value='2' defaultChecked={ showScore === '2' } onChange={ onScoreChange } onClick={ onScoreClicked }/><label htmlFor='2_star'>★</label>
                           <input name='score' type='radio' id='1_star' value='1' defaultChecked={ showScore === '1' } onChange={ onScoreChange } onClick={ onScoreClicked }/><label htmlFor='1_star'>★</label>
                           <input name='score' type='radio' id='0_star' value='0' defaultChecked={ showScore === '0'} style={{ display: 'none' }}/>
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
               <button className={ EditMenuStyles.delete }>
                  Delete
               </button>
            </div>
         </div>
      </form>
   )
}

export default EditMenu;