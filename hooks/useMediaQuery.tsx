import { useState, useEffect } from "react";

	// hook for returning a specified value from a array based on matching media queries
	export const useMediaQuery = (queries: string[], valueList: number[] | number[], defaultValue: number): number => {
		// array of media queries
		const mediaQueryList = queries.map((query: string) => window.matchMedia(query));

		// get the corresponding height of the matching query
		const getValue = (): number => {
			// find index of first matching query if it exists
			const index = mediaQueryList.findIndex((mediaQuery: MediaQueryList) => mediaQuery.matches);

			// if no queries match, return default height
			return index === -1 ? defaultValue : valueList[index];
		}
		
		const [value, setValue] = useState(getValue());

		useEffect(() => {
			const handler = () => setValue(getValue);

			mediaQueryList.forEach((mediaQuery: MediaQueryList) => mediaQuery.addEventListener('change', handler));

			return () => mediaQueryList.forEach((mediaQuery: MediaQueryList) => {
				mediaQuery.removeEventListener('change', handler)
			});
		}, []);

		return value;
	}