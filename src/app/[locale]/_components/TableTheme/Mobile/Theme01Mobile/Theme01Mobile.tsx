"use client";

import React from "react";
import clsx from "clsx";
import _ from "lodash";
import { Group, Paper, Stack, Text } from "@mantine/core";
import { type ITableCourseProps } from "@/types/ITableCourseProps";
import { convertKeyToDate } from "utils/daysMap";
import { convertKeyToColor } from "utils/colorsMap";

const Theme01Mobile = (props: ITableCourseProps) => {
    return (
        <div className={clsx("min-w-[40rem] flex flex-col gap-3", props.isExport && "p-3")}>
            {
                props.isExport && <div className="flex justify-center">
                    <Text size="xl" fw={700}>{props.major}</Text>
                </div>
            }
            <div className="grid grid-cols-2 gap-3">
                {_.sortBy(props.scheduleData, (course) => convertKeyToDate(course.day_w.trim())?.value).map((course, index) => (
                    <Paper key={index} withBorder p="sm" pos="relative" onClick={() => props.onClick?.(course)}>
                        <div className="flex gap-3">
                            <div className={clsx("w-[8px] h-[75px] rounded-md")} style={{ backgroundColor: convertKeyToColor(course.day_w)?.textHex }} />
                            <Stack gap={0} w={"100%"}>
                                <Group justify="space-between" gap={0}>
                                    <Text fw={700}>{course.subject_code}</Text>
                                    <Text c="dimmed">หมู่เรียน {course.section_code}</Text>
                                </Group>
                                <Text lineClamp={1} c="dimmed">{course.subject_name_th}</Text>
                                <Group justify="space-between">
                                    <Group gap={3}>
                                        <Text fw={700}>{_.isEmpty(course.day_w) ? "NONE" : course.day_w}</Text>
                                        <Text>|</Text>
                                        <Text>{course.time_from} - {course.time_to}</Text>
                                        <Text>|</Text>
                                        <Text c="dimmed">{course.section_type_th}</Text>
                                    </Group>
                                </Group>
                                <div className="w-fit bottom-0 right-2 absolute">
                                    <Text size="xs" c="dimmed">{course.room_name_th}</Text>
                                </div>
                            </Stack>
                        </div>
                    </Paper>
                ))}
            </div>
            <div className="flex justify-center">
                {
                    props.isExport &&
                    <div>
                        Generated by : <span className="font-semibold">kugetreg.teerut.com</span>
                    </div>
                }
            </div>
        </div >
    );
};

export default Theme01Mobile;