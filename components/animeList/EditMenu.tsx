import { useEffect, useState } from 'react'
import EditMenuStyles from '../../styles/EditMenu.module.css'

type props = {
   closeEdit: () => void,
}

const EditMenu = ({closeEdit}: props) => {

   const [isEditMenuClosed, setIsEditMenuClosed] = useState(false);

   useEffect(() => {
      let timeout: NodeJS.Timeout;

      if (isEditMenuClosed) {
         timeout = setTimeout(closeEdit, 200);
      }
      
      return (() => {
         clearTimeout(timeout);
      });
   }, [isEditMenuClosed])

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
            
         </div>
      </>
   )
}

export default EditMenu;