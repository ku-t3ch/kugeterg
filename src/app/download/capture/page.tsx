"use client";

import TableTheme from '@/app/_components/TableTheme';
import { useSearchParams } from 'next/navigation';
import { api } from '@/trpc/react';

export default function Page() {
    const searchParams = useSearchParams()

    const id = searchParams.get("id");
    const theme = searchParams.get("theme");

    const courseFromRedis = api.download.getCourseFromRedis.useQuery({ id: id?.toString() ?? "" })

    return (
        <TableTheme isExport={true} scheduleData={courseFromRedis.data ?? []} theme={theme?.toString()} />
    );
}
