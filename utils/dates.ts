// returns the season as a string, getNextSeason is false by default, if getNextSeason is true, return next season
export const getSeason = ({getNextSeason = false }: { getNextSeason?: boolean }): string => {
	const month = new Date().getMonth();

	if (month === 0 || month === 1 || month === 2) {
		return getNextSeason ? 'SPRING' : 'WINTER';
	} else if (month >= 3 && month <= 5) {
		return getNextSeason ? 'SUMMER' : 'SPRING';
	} else if (month >= 6 && month <= 8) {
		return getNextSeason ? 'FALL' : 'SUMMER';
	} else {
		return getNextSeason ? 'WINTER' : 'FALL';
	}
}

export const getYear = (season: string) => {
	const month = new Date().getMonth();

	if  (month >= 9 && season == 'WINTER') {
		return new Date().getFullYear() + 1;
	} else {
      return new Date().getFullYear();
   }
}