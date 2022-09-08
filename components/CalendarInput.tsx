import moment from 'moment'
import { useEffect, useState } from 'react'
import type { KeyboardEvent } from 'react'

type CalendarInputProps = {}

export default function CalendarInput({}: CalendarInputProps) {
	const [showCalendar, setShowCalendar] = useState(true)
	const [calendarValue, setCalendarValue] = useState(moment())
	const [calendarDisplay, setCalendarDisplay] = useState(
		moment().format('DD/MM/YYYY')
	)

	function handleKeyUp(e: KeyboardEvent<HTMLInputElement>) {
		if (e.key === 'Backspace') {
			let value = calendarDisplay
			if (value[value.length - 1] === '/')
				value = value.slice(0, value.length - 2)
			else value = value.slice(0, value.length - 1)

			setCalendarDisplay(value)
			return
		}

		if (!/[0-9]/.test(e.key) || calendarDisplay.length >= 10) return
		if (calendarDisplay.length === 2 || calendarDisplay.length === 5)
			setCalendarDisplay((prev) => prev + `/${e.key}`)
		else setCalendarDisplay((prev) => prev + e.key)
	}

	useEffect(() => {
		setCalendarDisplay(calendarValue.format('DD/MM/YYYY'))
	}, [calendarValue])

	useEffect(() => {
		if (calendarDisplay.length === 10)
			setCalendarValue(moment(calendarDisplay, 'DD/MM/YYYY'))
	}, [calendarDisplay])

	return (
		<div className="relative">
			<label className="flex py-1 px-4 border-neutral-900 items-center justify-between border rounded-xl">
				<div>
					<p className="text-neutral-500 text-xs">Date</p>
					<input
						className="border-0 focus:ring-0 rounded-xl p-0"
						type="text"
						onKeyDown={handleKeyUp}
						onFocus={() => setShowCalendar(true)}
						value={calendarDisplay}
					/>
				</div>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-6 h-6"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
					/>
				</svg>
			</label>
			{showCalendar && (
				<div className="absolute w-max p-4 rounded-xl shadow-lg">
					<div className="flex justify-between">
						<button
							onClick={() =>
								setCalendarValue((prev) => moment(prev).add(-1, 'M'))
							}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M15.75 19.5L8.25 12l7.5-7.5"
								/>
							</svg>
						</button>
						<p> {moment(calendarValue, 'MM').format('MMM YYYY')} </p>
						<button
							onClick={() =>
								setCalendarValue((prev) => moment(prev).add(1, 'M'))
							}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M8.25 4.5l7.5 7.5-7.5 7.5"
								/>
							</svg>
						</button>
					</div>
					<div className="grid gap-1 grid-cols-7 mt-4">
						<div className="calendar-week-day">Mo</div>
						<div className="calendar-week-day">Tu</div>
						<div className="calendar-week-day">We</div>
						<div className="calendar-week-day">Th</div>
						<div className="calendar-week-day">Fr</div>
						<div className="calendar-week-day">Sa</div>
						<div className="calendar-week-day">Su</div>
						{moment(calendarValue).startOf('month').day()
							? [
									...Array(moment(calendarValue).startOf('month').day() - 1),
							  ].map((idx) => <div key={idx}></div>)
							: null}

						{[...Array(calendarValue.daysInMonth())].map((e, idx) => (
							<div
								key={e}
								className="calendar-day"
								onClick={() =>
									setCalendarValue(
										moment(
											`${(idx + 1).toString().padStart(2, '0')}/${(
												calendarValue.month() + 1
											)
												.toString()
												.padStart(2, '0')}/${calendarValue.year()}`,
											'DD/MM/YYYY'
										)
									)
								}
							>
								{idx + 1}
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	)
}
