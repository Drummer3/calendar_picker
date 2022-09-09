import type { NextPage } from 'next'
import LinkButton from '../components/LinkButton'

const Home: NextPage = () => {
	return (
		<main className="center-container">
			<LinkButton to="/calendar" name="Calendar" color="green" />
			<LinkButton to="/profile-photo" name="Profile Photo" color="indigo" />
		</main>
	)
}

export default Home
