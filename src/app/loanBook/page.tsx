"use client"
import React, { useEffect, useState } from "react"

interface User {
	id: number
	password: string
	firstName: string
	lastName: string
	email: string
	phone: string
	image: string
	qrCode: number
}

interface ApiResponse {
	staffUsers: User[]
	studentUsers: User[]
}

export default function Home() {
	const [apiData, setApiData] = useState<ApiResponse[]>([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("/api/getUsers")
				const data: ApiResponse = await response.json()
				setApiData((prevData) => [...prevData, data])
			} catch (error) {
				console.error(error)
			}
		}

		fetchData()
	}, [])

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<p>Next.js</p>
			{apiData.map((data, index) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
				<div key={index}>
					<p>Staff Users:</p>
					{data.staffUsers.map((staff) => (
						<p key={staff.id}>{staff.firstName}</p>
					))}

					<p>Students Users:</p>
					{data.studentUsers.map((student) => (
						<p key={student.id}>{student.firstName}</p>
					))}
				</div>
			))}
		</main>
	)
}
