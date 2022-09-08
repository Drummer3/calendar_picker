import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import LinkButton from '../components/LinkButton'

const Home: NextPage = () => {
	return (
		<main className="center-container">
			<LinkButton to="/calendar" name="Calendar" color="green" />
		</main>
	)
}

export default Home
