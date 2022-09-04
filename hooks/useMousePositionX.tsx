import { RefObject, useState, useEffect, useReducer } from "react";

export const useMousePosition = (ref: RefObject<HTMLDivElement>) => {
   // bool to track if the mouse held down or not
   let isDown = false;

   // x position of cursor when user clicks down
   let originX: number;

   // cursor position on x axis relative to originX
   let cursorPositionX: number;

   // width of the curouselItem
   let clientWidth: number;

   // getter functions for cursorPositionX and clientWidth
   const _getCursorPositionX = () => cursorPositionX;
   const _getClientWidth = () => clientWidth;

   useEffect(() => {
      // custom events that are fired when their respective conditions are met
      const swipingEvent = new CustomEvent('swiping', {detail: _getCursorPositionX});
      const swiped = new CustomEvent('swiped', {detail: _getClientWidth});

      // when mouse is held done update origin, and add mousemove event listener
      const handleMouseDown = (e: MouseEvent) => {
         isDown = true;
         clientWidth= (e.target as HTMLElement).clientWidth;
         originX = e.clientX
         
         document.addEventListener('mousemove', handleMouseMove);	
         document.addEventListener('mouseup', handleMouseUp);	
      }

      // when mouse is released, remove mousemove event listener and dispatch the swiped event
      // to indicate that a swiped operation has finished
      const handleMouseUp = (e: MouseEvent) => {
         if (isDown) {
            isDown = false;
            document.dispatchEvent(swiped);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
         }
      }

      // update cursorPositionX when mouse is moving and dispatch swiping event
      // to indicate that a swiping operation is in progress
      const handleMouseMove = (e: MouseEvent) => {
         cursorPositionX = e.clientX - originX;
         document.dispatchEvent(swipingEvent);
      }

      ref.current?.addEventListener('mousedown', handleMouseDown);

      return () => {
         ref.current?.removeEventListener('mousedown', handleMouseDown);
      }
   }, []);
}