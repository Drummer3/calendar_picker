import CalendarInput from '../components/CalendarInput'

export default function Calendar() {
	return (
		<main className="center-container">
			<CalendarInput maxYear={2030} minYear={2020} />
		</main>
	)
}
