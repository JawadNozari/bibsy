import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

export default function UserDetailsDialog(
    open: boolean
) {
	return (
		<Dialog>
			<DialogTrigger>Open</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>User Details</DialogTitle>
					<DialogDescription>This is a description</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}
