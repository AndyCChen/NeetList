import { RefObject, useState, useEffect, useReducer } from "react";
import { mouseState, mouseAction } from '../interfaces/mousePositionInterfaces';

export const useMousePosition = (ref: RefObject<HTMLDivElement>): mouseState => {
   const initialState = {
      offset: 0,
      isSwipedLeft: false,
      isSwipedRight: false,
      isSwiping: false,
   }

   const reducer = (state: mouseState, action: mouseAction) => {
      switch (action.type) {
         case 'Swiping':
            return {
               offset: action.offset,
               isSwipedLeft: false,
               isSwipedRight: false,
               isSwiping: true,
            };
         case 'SwipedLeft':
            return {
               offset: state.offset,
               isSwipedLeft: true,
               isSwipedRight: false,
               isSwiping: false,
            };
         case 'SwipedRight':
            return {
               offset: state.offset,
               isSwipedLeft: false,
               isSwipedRight: true,
               isSwiping: false,
            };
         default:
            return {
               offset: 0,
               isSwipedLeft: false,
               isSwipedRight: false,
               isSwiping: false,
            };
      }
   }

   const [state, dispatch] = useReducer(reducer, initialState);

   // bool to track if the mouse held down or not
   let isDown = false;

   // x position of cursor when user clicks down
   let originX: number;

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
            console.log('dfd')
            if (Math.sign(state.offset) === -1) {
               dispatch({type: 'SwipedLeft'})
            } else if (Math.sign(state.offset) === 1) {
               dispatch({type: 'SwipedRight'})
            }
         }
      }

      const handleMouseMove = (e: MouseEvent) => {
         let cursorPositionX: number = e.clientX - originX;
         dispatch({type: 'Swiping', offset: cursorPositionX});
      }

      ref.current?.addEventListener('mousedown', handleMouseDown);

      return () => {
         ref.current?.removeEventListener('mousedown', handleMouseDown);
      }
   }, []);

   return state;
}