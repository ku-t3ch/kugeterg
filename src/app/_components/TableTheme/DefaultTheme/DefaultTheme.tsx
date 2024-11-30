"use client";

import React from "react";
import clsx from "clsx";
import _ from "lodash";
import { Text } from "@mantine/core";
import dayColors from "utils/dayColors";
import { days, getGridRepeat, getPosition, hours, maxIndex } from "utils/tableUtils";
import { type ITableCourseProps } from "@/types/ITableCourseProps";

const DefaultTheme = (props: ITableCourseProps) => {
    const gridRepeat = getGridRepeat(props.scheduleData)
    const maxIndexData = maxIndex(props.scheduleData)

    const widthClass = `w-full`;
    const heightClass = `h-[80px]`;
    return (
        <div className="min-w-fit" id="capture">
            <div className={clsx("flex flex-col w-full")}>
                <div className={`grid`} style={{
                    gridTemplateColumns: `repeat(${gridRepeat + 2}, minmax(50px, 1fr))`
                }}>
                    <div className={clsx("border-b border-r border-l border-t col-span-2 border-[#e3e5f8] bg-[#fafaff] p-2 font-semibold", widthClass)}>
                        Day/Time
                    </div>
                    {hours.slice(0, maxIndexData).map((hour) => (
                        <React.Fragment key={hour}>
                            <div className={clsx("col-span-2 flex border-b border-t border-r border-[#e3e5f8] bg-[#fafaff] pl-1 items-center text-center", widthClass)}>
                                {hour}
                            </div>
                        </React.Fragment>
                    ))}
                </div>
                {days.map((day) => (
                    <div className="relative" key={day}>
                        <div className={`grid`} style={{
                            gridTemplateColumns: `repeat(${gridRepeat + 2}, minmax(50px, 1fr))`
                        }}>
                            <div className={clsx("border-r flex items-center justify-center border-l col-span-2 border-[#e3e5f8] bg-[#fafaff] p-2 font-semibold", "border-b", widthClass, heightClass)}>
                                {day}
                            </div>
                            {hours.slice(0, maxIndexData).map((hour) => (
                                <div className={clsx("col-span-2 border-r border-[#e3e5f8]", "border-b", widthClass, heightClass)} key={hour} />
                            ))}
                        </div>
                        <div className={`grid absolute z-10 top-0 left-0 right-0 bottom-0`} key={day} style={{
                            gridTemplateColumns: `repeat(${gridRepeat + 2}, minmax(50px, 1fr))`
                        }}>
                            {_.sortBy(props.scheduleData.filter(course => course.day_w.trim() === day), (course) => course.time_start).map((course, index) => {
                                const day_w = course.day_w.trim();
                                const dayColor = dayColors[day_w];

                                return (
                                    <div onClick={() => {
                                        if (props.onClick) {
                                            props.onClick(course);
                                        }
                                    }} key={`${index}_${course.section_id}_${day}_${course.subject_code}`} className={clsx("w-full border rounded-md px-1 flex-col flex items-center justify-center", heightClass, dayColor?.bg, dayColor?.border, dayColor?.text, props.onClick && dayColor?.bgHover, props.onClick && "cursor-pointer")} style={{
                                        gridColumn: `${getPosition(course.time_from!)}/${getPosition(course.time_to!)}`,
                                    }} >
                                        <Text fw={600} lineClamp={1}>{course.subject_code}</Text>
                                        <Text fw={600} size="sm" lineClamp={1}>{course.subject_name_en}</Text>
                                        <Text fw={400} size="xs" lineClamp={1}>{course.room_name_en} | Sec {course.section_code}</Text>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DefaultTheme;
