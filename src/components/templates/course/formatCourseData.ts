import { LEVEL_OPTIONS, SUBJECT_OPTIONS } from "./course";

interface FormattedCourse {
  id: string;
  courseTitle: {
    title: string;
    thumbnail: string;
  };
  lesson: string;
  subject: string;
  duration: string;
  level: string;
  updatedAt: string;
}

const formatCourseData = (data: any[]): FormattedCourse[] => {
  return data.map((item) => ({
    id: item.id,
    courseTitle: {
      title: item.courseTitle,
      thumbnail: item.thumbnails[0],
    },
    lesson: formatLesson(item.modules),
    subject: formatSubject(item.subject),
    duration: `${item.duration} hours`,
    level: formatLevel(item.level),
    updatedAt: formatDate(item.updatedAt),
  }));
};

const formatLesson = (modules: any[]) => {
  const getTotalLessonCount = modules.reduce((total, module) => total + module.lessons.length, 0);
  return getTotalLessonCount > 1 ? `${getTotalLessonCount} Lessons` : `${getTotalLessonCount} Lesson`;
}

const formatSubject = (subject: string): string => {
  const subjectOption = SUBJECT_OPTIONS.find(
    (option) => option.value === subject
  );
  return subjectOption ? subjectOption.label : "invalid subject";
};

const formatLevel = (level: string): string => {
  const levelOption = LEVEL_OPTIONS.find((option) => option.value === level);
  return levelOption ? levelOption.label : "invalid level";
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export { formatCourseData };
