"use client"

import { Link } from "@/i18n/routing";
import { useMediaQuery } from "@mantine/hooks";

interface Props {
    element?: React.ReactNode;
}

export default function Logo({ element }: Props) {
    const isMobile = useMediaQuery("(max-width: 768px)");
    return (
        <Link href="/">
            <span className="text-xl font-bold text-blue-600">
                KU Get Reg
            </span>
        </Link>
    )
}