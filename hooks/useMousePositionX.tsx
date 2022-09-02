import { off } from "process";
import { RefObject, useState, useEffect, useReducer } from "react";

export const useMousePosition = (ref: RefObject<HTMLDivElement>): number => {
   // bool to track if the mouse held down or not
   let isDown = false;

   // x position of cursor when user clicks down
   let originX: number;

   // local variable used to access cursorPositionX state
   let offsetX: number;

   // x position state of cursor relative to originX
   const [cursorPositionX, setCursorPosition] = useState(0);

   const _getCursorPositionX = () => offsetX;

   useEffect(() => {
      const swipingEvent = new CustomEvent('swiping', {detail: _getCursorPositionX});
      const swipedLeftEvent = new Event('swipedLeft');
      const swipedRightEvent = new Event('swipedRight');

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
 
            if (Math.sign(_getCursorPositionX()) === -1) {
               document.dispatchEvent(swipedLeftEvent);
            } else if (Math.sign(_getCursorPositionX()) === 1) {
               document.dispatchEvent(swipedRightEvent);
            }
         }
      }

      const handleMouseMove = (e: MouseEvent) => {
         offsetX = e.clientX - originX;
         setCursorPosition(offsetX);
         document.dispatchEvent(swipingEvent);
      }

      ref.current?.addEventListener('mousedown', handleMouseDown);

      return () => {
         ref.current?.removeEventListener('mousedown', handleMouseDown);
      }
   }, []);

   return cursorPositionX;
}