import { useState, useEffect, useRef } from "react";

	// hook for returning a specified value from a array based on matching media queries
	export const useMediaQuery = (queries: string[], valueList: number[] | number[], defaultValue: number): number => {
		// array of media queries
		const mediaQueryList = useRef<MediaQueryList[]>();

		useEffect(() => {
			mediaQueryList.current = queries.map((query: string) => window.matchMedia(query));
		}, []);

		// get the corresponding height of the matching query
		const getValue = (): number => {
			// find index of first matching query if it exists
			const index = mediaQueryList.current ? mediaQueryList.current.findIndex((mediaQuery: MediaQueryList) => mediaQuery.matches) : -1;

			// if no queries match, return default height
			return index === -1 ? defaultValue : valueList[index];
		}
		
		const [value, setValue] = useState(getValue());

		useEffect(() => {
			const handler = () => setValue(getValue());

			if (mediaQueryList.current)
				mediaQueryList.current.forEach((mediaQuery: MediaQueryList) => mediaQuery.addEventListener('change', handler));

			return () => {
				if (mediaQueryList.current)
					mediaQueryList.current.forEach((mediaQuery: MediaQueryList) => mediaQuery.removeEventListener('change', handler));
			};
		}, []);

		return value;
	}