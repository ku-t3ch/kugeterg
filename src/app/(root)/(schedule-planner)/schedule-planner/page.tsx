"use client"

import Link from 'next/link';

import Logo from '@/app/_components/Logo/Logo';
import {
    ModalCourseChildren, ModalCourseDetailTitle
} from '@/app/_components/ModalCourse/ModalCourse';
import TableCourse from '@/app/_components/TableCourse/TableCourse';
import { type Course } from '@/types/responses/IGroupCourseResponse';
import { ActionIcon, AppShell, Burger, Button, Code, Group, Paper, ScrollArea, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { IconChevronLeft, IconEye, IconEyeOff, IconTrash } from '@tabler/icons-react';

import ExploreCourse from './_components/ExploreCourse/ExploreCourse';
import useCoursePlanningStore from './_store/useCoursePlanningStore';
import ScheduleHeader from './_components/ScheduleHeader/ScheduleHeader';
import { ConfirmDeleteModalData } from '@/configs/common/ModalData/ModalData';

export default function Page() {
    const [opened, { toggle }] = useDisclosure();
    const coursePlanningStore = useCoursePlanningStore()

    const onRemoveCourses = (course: Course) => {
        modals.openConfirmModal({
            ...ConfirmDeleteModalData,
            children: <>Are you sure you want to remove <Code>{course.subject_code} {course.subject_name_en}</Code> ?</>,
            onConfirm: () => {
                coursePlanningStore.removeCourses(course)
                modals.closeAll()
            }
        })
    }

    const onShowDetail = (course: Course) => {
        modals.open({
            title: <ModalCourseDetailTitle course={course} />,
            children: <ModalCourseChildren course={course}
                actions={
                    <Button variant='light' leftSection={<IconTrash size={16} />} color="red" onClick={() => onRemoveCourses(course)}>
                        Remove
                    </Button>
                }
            />,
        })
    }

    const onHidden = (course: Course) => {
        coursePlanningStore.onHidden(course)
    }

    const onShow = (course: Course) => {
        coursePlanningStore.onShow(course)
    }

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 400, breakpoint: "xs", collapsed: { mobile: !opened } }}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md" align='center' justify="space-between">
                    <Group align='center' gap="md">
                        <Link href={'/'} className="flex items-center">
                            <ActionIcon variant='subtle' onClick={toggle}>
                                <IconChevronLeft />
                            </ActionIcon>
                        </Link>
                        <Logo element=": วางแผนตารางเรียน" />
                    </Group>
                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                </Group>
            </AppShell.Header>
            <AppShell.Navbar component={ScrollArea} p="xs">
                <ExploreCourse />
            </AppShell.Navbar>
            <AppShell.Main>
                <Stack gap={"xs"}>
                    <ScheduleHeader />
                    <div className='overflow-x-auto'>
                        <TableCourse
                            onClick={onShowDetail}
                            scheduleData={coursePlanningStore.getCourses()} />
                    </div>
                    <Stack gap={5}>
                        {coursePlanningStore.getCoursesUnique().map((course, i) => (
                            <Paper key={i} withBorder p="sm">
                                <Group justify='space-between'>
                                    <Group>
                                        {
                                            course.is_hidden ?
                                                <ActionIcon variant="light" onClick={() => onShow(course)}>
                                                    <IconEyeOff />
                                                </ActionIcon>
                                                :
                                                <ActionIcon variant="light" onClick={() => onHidden(course)}>
                                                    <IconEye />
                                                </ActionIcon>
                                        }
                                        <Stack gap={0}>
                                            <Text>{course.subject_code}</Text>
                                            <Text>{course.subject_name_en}</Text>
                                            <Text>Sec {course.section_code}</Text>
                                        </Stack>
                                    </Group>

                                    <Group gap="xs">
                                        <Button onClick={() => onRemoveCourses(course)} color="red" variant="light" leftSection={<IconTrash size={16} />}>
                                            Remove
                                        </Button>
                                    </Group>
                                </Group>
                            </Paper>
                        ))}
                    </Stack>
                </Stack>
            </AppShell.Main>
        </AppShell>
    );
}
