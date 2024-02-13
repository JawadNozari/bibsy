import Loading from "@/app/loading";
import React, { Suspense } from "react";

// Define a component that takes some time to load
const DelayedComponent = () => {
	// Simulate a delay with setTimeout
	return new Promise((resolve) => setTimeout(resolve, 3000)).then(() => {
		return (
			<div className="flex justify-center items-center h-screen w-screen ">
				Delayed Component Loaded
			</div>
		);
	});
};

// Wrap your component in Suspense and specify the loading component
const App = () => {
	return (
		<Suspense fallback={<Loading />}>
			<DelayedComponent />
		</Suspense>
	);
};

export default App;
