import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useTheme } from "next-themes";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";

const GoogleSignInButton = () => {
	const { theme } = useTheme();
	const loginWithGoogle = () => signIn("google");
	// get email from google
	return (
		<Button variant="link" onClick={loginWithGoogle}>
			<Avatar>
				<AvatarImage
					src={
						theme === "dark" ? "/icons/google.png" : "/icons/google_dark.png"
					}
					alt="profile picture"
					width={45}
					height={45}
				/>
			</Avatar>
		</Button>
	);
};

export default GoogleSignInButton;
