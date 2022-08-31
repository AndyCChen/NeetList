import { RefObject, useState, useEffect } from "react";

export const useMousePosition = (ref: RefObject<HTMLDivElement>): number => {
   // bool to track if the mouse held down or not
   let isDown = false;

   // x position of cursor when user clicks down
   let originX: number;

   const [cursorPositionX, setCursorPositionX] = useState(0);

   useEffect(() => {
      // when mouse is held done update origin, and add mousemove event listener
      const handleMouseDown = (e: MouseEvent) => {
         isDown = true;
         originX = e.clientX
         document.addEventListener('mousemove', handleMouseMove);	
         document.addEventListener('mouseup', handleMouseUp);	
      }

      // when mouse is released, remove mousemove event listener
      const handleMouseUp = (e: MouseEvent) => {
         if (isDown) {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            isDown = false;
            setCursorPositionX(0);
         }
      }

      const handleMouseMove = (e: MouseEvent) => {
         setCursorPositionX(e.clientX - originX);
      }

      ref.current?.addEventListener('mousedown', handleMouseDown);

      return () => {
         ref.current?.removeEventListener('mousedown', handleMouseDown);
      }
   }, []);

   return cursorPositionX;
}