import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

type variant = "default" | "destructive";
export default function InfoAlert(
	title: string | undefined,
	message: string,
	type: variant,
) {
	return (
		<div className="fixed top-0 right-0 p-4">
			<Alert variant={type}>
				<AlertCircle className="h-5 w-5" />
				<AlertTitle>{title}</AlertTitle>
				<AlertDescription>{message}</AlertDescription>
			</Alert>
		</div>
	);
}
