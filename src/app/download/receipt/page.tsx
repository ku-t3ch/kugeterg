"use client";
import { useSearchParams } from "next/navigation";

import TableCourse from "@/app/_components/TableCourse/TableCourse";
import { auth } from "@/server/auth";
import { api } from "@/trpc/server";

export default function Page() {
  const searchParams = useSearchParams();

  const screenType = searchParams.get("screenType");
  const major = searchParams.get("major");
  const id = searchParams.get("id");

  return (
    <div id="capture" className="flex flex-col p-3">
      {/* {apiRoute.results &&
        apiRoute.results.length > 0 &&
        apiRoute.results[0]?.course && (
          <TableCourse scheduleData={apiRoute.results[0]?.course} />
        )}
      <div className="flex justify-between">
        <div>
          Generate by:{" "}
          <span className="font-semibold">kugetreg.teerut.com</span>
        </div>
        <div>
          {session?.user.student.majorCode} -{" "}
          {session?.user.student.majorNameEn}
        </div>
      </div> */}
    </div>
  );
}