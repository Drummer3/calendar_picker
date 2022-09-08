import Link from 'next/link'
import buttons from '../styles/LinkButton.module.scss'

type LinkButtonTypes = {
	to: string
	name: string
	color: 'blue' | 'green' | 'indigo'
}

export default function LinkButton({
	to,
	name,
	color = 'blue',
}: LinkButtonTypes) {
	return (
		<Link href={to}>
			<a
				className={buttons[`link-button-${color}`]}
			>
				{name}
			</a>
		</Link>
	)
}
