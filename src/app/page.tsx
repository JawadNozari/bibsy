"use client";
// import UserList from './userList/page';

export default function Home() {
	return (
		<div className="flex h-screen w-screen justify-center items-center flex-col">
			<div className="font-bold text-2xl mb-10">Hello there</div>
			<div role="alert" className="alert alert-info w-1/2 text-white">
				<span>This page is under construction and will be available soon.</span>
			</div>
			<progress className="progress w-1/2 mt-10" />
		</div>
	);
}
