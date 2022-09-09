import Image from 'next/image'
import { MouseEvent, useEffect, useRef, useState } from 'react'
import profilePhoto from '../assets/simpsons.jpeg'
import styles from '../styles/ProfilePhoto.module.scss'
export default function PhotoEditor() {
	const [scale, setScale] = useState(1000)
	const [mousePosition, setMousePosition] = useState([0, 0])
	const [imageOffset, setImageOffset] = useState([0, 0])

	const handleDragging = (e: MouseEvent) =>
		setImageOffset([e.clientX - mousePosition[0], e.clientY - mousePosition[1]])

	const handleDraggingStart = (e: MouseEvent) =>
		setMousePosition([e.clientX, e.clientY])

	return (
		<div className="w-screen h-screen flex justify-center items-center backdrop-brightness-75">
			<div className="bg-white py-8 px-32 rounded-xl">
				<h1 className="font-semibold text-xl text-center">Profile photo</h1>
				<p className="text-center my-4">
					Add or change the current profile photo
				</p>
				<label htmlFor="fileInput">
					<p className="bg-white w-max mx-auto block cursor-pointer text-center px-6 py-3 border-2 rounded-xl border-neutral-700 hover:bg-neutral-200 duration-150">
						Add photo
					</p>
				</label>
				<input type="file" id="fileInput" name="fileInput" className="hidden" />
				<div
					className="relative my-4 mx-auto w-96 aspect-square overflow-hidden"
					draggable
					onDragStart={handleDraggingStart}
					onDragOver={handleDragging}
				>
					<div className="absolute flex justify-center items-center inset-0 z-50 backdrop-brightness-50">
						<div className="w-[96%] h-[96%] rounded-full backdrop-brightness-200"></div>
					</div>
					<Image
						className="rounded-md"
						alt="Profile Photo"
						src={profilePhoto}
						layout="fill"
						objectFit="cover"
						style={{
							transform: `translate(${imageOffset[0]}px, ${
								imageOffset[1]
							}px) scale(${scale / 1000})`,
						}}
						quality={100}
					/>
				</div>
				<div className="text-neutral-500 gap-2 flex justify-between items-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6 cursor-pointer"
						onClick={() => {
							if (scale > 1000) setScale((prev) => prev - 50)
						}}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M19.5 12h-15"
						/>
					</svg>
					<input
						onChange={(e) => setScale(Number(e.target.value))}
						className={styles.slider}
						type="range"
						min="1000"
						max="2000"
						value={scale}
						name=""
						id=""
					/>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6 cursor-pointer"
						onClick={() => {
							if (scale < 2000) setScale((prev) => prev + 50)
						}}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M12 4.5v15m7.5-7.5h-15"
						/>
					</svg>
				</div>
				<div className="flex gap-4 mt-8">
					<button className="flex-1 py-4 bg-white border-2 border-neutral-700 rounded-xl hover:bg-neutral-200 duration-150">
						Cancel
					</button>
					<button className="flex-1 py-4 bg-orange-500 text-white rounded-xl hover:bg-orange-600 duration-150">
						Save changes
					</button>
				</div>
			</div>
		</div>
	)
}
