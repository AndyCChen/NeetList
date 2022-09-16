import { RefObject, useEffect, useState } from "react";

export const useElementDimensions = (ref: RefObject<HTMLDivElement>): {elementHeight: number, elementWidth: number} => {

   const [elementHeight, setElementHeight] = useState(0);
   const [elementWidth, setElementWidth] = useState(0);

   useEffect(() => {
      if (ref.current) {
         setElementHeight(ref.current.clientHeight);
         setElementWidth(ref.current.clientWidth);
      }
   }, []);

   useEffect(() => {
      const handleResize = () => {
         if (ref.current) {
            setElementHeight(ref.current.clientHeight);
            setElementWidth(ref.current.clientWidth)
         }
      }

      window.addEventListener('resize', handleResize, true);

      return () => window.removeEventListener('resize', handleResize, true);
   }, []);

   return {elementHeight, elementWidth};
}