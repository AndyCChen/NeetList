import { GetServerSideProps, GetServerSidePropsContext } from "next"


const DisplayBySort = () => {
	return (
		<div>Stuff</div>
	)
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
	let sort_by: string;

	if (!context.params) {
		return {
			notFound: true,
		}
	}

	if (context.params.sort_by == 'this-season') sort_by = context.params.sort_by
	else if (context.params.sort_by == 'popular') sort_by = context.params.sort_by
	else if (context.params.sort_by == 'next-season') sort_by = context.params.sort_by
	else {
		return {
			notFound: true
		}
	}

	console.log(sort_by);

	return {
		props: {

		}
	}
}

export default DisplayBySort