import { type SearchParams } from "next/dist/server/request/search-params";

export default async function Page(props: {
  searchParams: Promise<SearchParams>;
}) {
  const { majorCode, majorNameEn, id } = await props.searchParams;

  if (!majorCode || !majorNameEn || !id) {
    return <div>Invalid request</div>;
  }

  console.log("majorCode", majorCode);
  console.log("majorNameEn", majorNameEn);
  console.log("id", id);

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
