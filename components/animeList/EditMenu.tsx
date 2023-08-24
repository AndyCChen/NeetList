import { useEffect, useState, useRef, useCallback, RefObject, ChangeEvent } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import EditMenuStyles from '../../styles/EditMenu.module.css'

type props = {
   closeEdit: () => void,
   title: string,
   status: string,
   score: number,
   progress: number,
}

const EditMenu = ({ closeEdit, title, status, score, progress }: props) => {

   const [isEditMenuClosed, setIsEditMenuClosed] = useState(false);

   useEffect(() => {
      let timeout: NodeJS.Timeout;

      if (isEditMenuClosed) {
         timeout = setTimeout(closeEdit, 200);
      }
      
      return (() => {
         clearTimeout(timeout);
      });
   }, [isEditMenuClosed]);

   const handleSave = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
   }

   const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
   }

   const [showStatus, setShowStatus] = useState(status);
   const [toggleDropdown, setToggleDropdown] = useState(false);
   const [isDropdownClosed, setIsDropdownClosed] = useState(false);
   const [startDate, setStartDate] = useState(new Date());
   const [finshDate, setFinishDate] = useState(new Date());
   const [episodeProgress, setEpisodeProgress] = useState(progress);

   const statusDropdownRef = useRef(null);

   const handleClick = useCallback((event: MouseEvent) => {
      if (!(statusDropdownRef as RefObject<HTMLDivElement>).current?.contains(event.target as Element)) {
         setIsDropdownClosed(true);
      }
   }, []);

   const onEpisodeProgressChanged = (event: ChangeEvent<HTMLInputElement>) => {
      let inputValue = event.target.value as unknown as number;
      console.log(isNaN(inputValue))
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

   useEffect(() => {
      let timeout: NodeJS.Timeout;

      if (isDropdownClosed) {
         timeout = setTimeout(() => setToggleDropdown(false), 200);
      }

      return () => clearTimeout(timeout);

   }, [isDropdownClosed])

   useEffect(() => {
      if (toggleDropdown) {
         document.addEventListener('click', handleClick, true)
      } else {
         document.removeEventListener('click', handleClick, true)
      }
   }, [toggleDropdown])

   return (
      <>
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
                  <input type='text' value={ showStatus } onClick={ onStatusFieldClicked } readOnly />
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
                  <div>
                     <input/>
                  </div>
               </div>
               <div>
                  <p>Start Date</p>
                  <DatePicker
                     showIcon
                     selected={ startDate }
                     onChange={ (date: Date) => setStartDate(date) }
                  />
               </div>
               <div>
                  <p>Finish Date</p>
                  <DatePicker
                     showIcon
                     selected={ finshDate }
                     onChange={ (date: Date) => setStartDate(date) }
                  />
               </div>
               <div>
                  <p>Episode Progress</p>
                  <input type='number'  min={ 0 } value={ episodeProgress } onChange={ onEpisodeProgressChanged }/>
               </div>
            </div>
            <div className={ EditMenuStyles.formButtons }>
               <button className={ EditMenuStyles.save } onSubmit={ handleSave }>
                  Save
               </button>
               <button className={ EditMenuStyles.delete }>
                  Delete
               </button>
            </div>
         </div>
      </>
   )
}

export default EditMenu;