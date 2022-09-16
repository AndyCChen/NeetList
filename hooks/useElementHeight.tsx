import { RefObject, useEffect, useState } from "react";

export const useElementHeight = (ref: RefObject<HTMLDivElement>): number => {

   const [elementHeight, setElementHeight] = useState(0);

   useEffect(() => {
      if (ref.current) {
         setElementHeight(ref.current.clientHeight);
      }
   }, []);

   useEffect(() => {
      const handleResize = () => {
         if (ref.current) {
            setElementHeight(ref.current.clientHeight);
         }
      }

      window.addEventListener('resize', handleResize, true);

      return () => window.removeEventListener('resize', handleResize, true);
   }, []);

   return elementHeight;
}