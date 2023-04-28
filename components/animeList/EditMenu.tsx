import { FormEventHandler, useEffect, useState } from 'react'
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
                  <input type='text' value={ status } readOnly/>
               </div>
               <div>
                  <p>Score</p>
                  <input/>
               </div>
               <div>
                  <p>Start Date</p>
                  <input/>
               </div>
               <div>
                  <p>Finish Date</p>
                  <input/>
               </div>
               <div>
                  <p>Episode Progress</p>
                  <input/>
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