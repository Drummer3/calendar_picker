import type { NextPage } from 'next'
import LinkButton from '../components/LinkButton'

const Home: NextPage = () => {
	return (
		<main className="center-container">
			<LinkButton to="/calendar" name="Calendar" color="green" />
		</main>
	)
}

export default Home
