import { z } from "zod";
const MAX_IMAGE_SIZE = 15728640; // 15MB
const ACCEPTED_IMAGE_TYPES = [
	"image/jpeg",
	"image/jpg",
	"image/png",
	"image/webp",
];
export default function formSchema() {
	return z
		.object({
			firstName: z
				.string()
				.min(2, "firstName is too short.")
				.max(50, "firstName is too long."),
			lastName: z
				.string()
				.min(2, "lastName is too short.")
				.max(50, "lastName is too long."),
			username: z.string().min(1, "Username is required"),
			email: z.string().min(1, "Email is required").email("Invalid email"),
			phoneNumber: z.string().min(1, "Phone number is required"),
			privilege: z.enum(["admin", "staff", "student"]),
			password: z
				.string()
				.min(1, "Password is required")
				.min(8, "Password must be at least 8 characters long"),
			confirmPassword: z
				.string()
				.min(1, "Password is required")
				.min(8, "Password must be at least 8 characters long"),
			image: z
				.any()
				.refine(
					(file) => file?.size <= MAX_IMAGE_SIZE,
					"Max image size is 5MB.",
				)
				.refine(
					(file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
					"Only .jpg, .jpeg, .png and .webp formats are supported.",
				),
			qrCode: z.string().min(1, "QR Code is required"),
		})
		.refine(
			(values) => {
				return values.password === values.confirmPassword;
			},
			{
				message: "Passwords must match!",
				path: ["confirmPassword"],
			},
		);
}
