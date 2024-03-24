import type * as React from "react";

import { cn } from "@/lib/utils";

export function Footer({ className }: React.HTMLAttributes<HTMLElement>) {
	return (
		<footer className={cn("w-full border-t-2", { className })}>
			<div className="container flex flex-col items-center justify-center gap-4 py-5 md:h-12 md:flex-row md:py-0">
				<div className="flex items-center gap-4 px-12 md:flex-row md:gap-2 md:px-0">
					<span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-nowrap">
						<a href="https://github.com/jawadnozari/bibsy"> © 2024 Bibsy</a>
					</span>
				</div>
			</div>
		</footer>
	);
}
