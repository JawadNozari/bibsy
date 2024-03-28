import {
	BookKey,
	BookPlus,
	LibraryBig,
	UserCog,
	UserPlus,
	Users,
} from "lucide-react";

const dashboardConfig = {
	sidebarNav: [
		{
			title: "Books",
			href: "/library/Books",
			icon: <LibraryBig />,
			subMenu: [
				{
					title: "All Books",
					href: "/library/Books",
				},
				{
					title: "Borrowed Books",
					href: "/library/BorrowedBooks",
				},
			],
		},
		{
			title: "Register User",
			href: "/Admin/Register/User",
			icon: <UserPlus />,
		},
		{
			title: "Register Book",
			href: "/registerBook",
			icon: <BookPlus />,
		},
		{
			title: "User List",
			href: "/Admin/UserList",
			icon: <Users />,
		},
		{
			title: "Loan Book",
			href: "/loanBook",
			icon: <BookKey />,
		},
		{
			title: "Profile",
			href: "/profile",
			icon: <UserCog />,
		},
	],
};
export default dashboardConfig;
