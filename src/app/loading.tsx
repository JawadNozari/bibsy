export default function Loading() {
	return (
		<div className="flex flex-col items-center justify-center gap-4 h-screen w-screen m-5">
			<div className="skeleton h-3/6 w-3/4" />
			<div className="skeleton h-4 w-1/2" />
			<div className="skeleton h-4 w-3/4" />
			<div className="skeleton h-4 w-3/4" />
		</div>
	);
}
