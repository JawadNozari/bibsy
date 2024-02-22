type AlertType =
	| "alert-success"
	| "alert-danger"
	| "alert-warning"
	| "alert-info"
	| "alert-error";

export default function Alert({
	message,
	alertType,
}: { message: string; alertType: AlertType }) {
	return (
		<>
			<div role="alert" className={`alert ${alertType} text-white `}>
				<span>{message}</span>
			</div>
		</>
	);
}
