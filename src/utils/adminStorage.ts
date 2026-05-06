import { Student, Teacher, Course, AboutUs } from '../types';
import { teachersData, coursesData } from '../data/mockData';

const STORAGE_KEYS = {
  STUDENTS: 'admin_students',
  TEACHERS: 'admin_teachers',
  COURSES: 'admin_courses',
  ABOUT_US: 'admin_aboutUs',
};

/* ===================== STUDENTS ===================== */
export const getStudents = (): Student[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.STUDENTS);
  return stored ? JSON.parse(stored) : [];
};

export const saveStudents = (students: Student[]): void => {
  localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
};

export const addStudent = (student: Omit<Student, 'id'>): Student => {
  const students = getStudents();
  const newStudent: Student = {
    ...student,
    id: `student_${Date.now()}`,
  };
  students.push(newStudent);
  saveStudents(students);
  return newStudent;
};

export const updateStudent = (id: string, updates: Partial<Student>): void => {
  const students = getStudents();
  const index = students.findIndex((s) => s.id === id);
  if (index !== -1) {
    students[index] = { ...students[index], ...updates };
    saveStudents(students);
  }
};

export const deleteStudent = (id: string): void => {
  const students = getStudents().filter((s) => s.id !== id);
  saveStudents(students);
};

/* ===================== TEACHERS ===================== */
export const getTeachers = (): Teacher[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.TEACHERS);
  if (stored) {
    return JSON.parse(stored);
  }
  // Return mock data as default
  return teachersData;
};

export const saveTeachers = (teachers: Teacher[]): void => {
  localStorage.setItem(STORAGE_KEYS.TEACHERS, JSON.stringify(teachers));
};

export const addTeacher = (teacher: Omit<Teacher, 'id'>): Teacher => {
  const teachers = getTeachers();
  const newTeacher: Teacher = {
    ...teacher,
    id: `teacher_${Date.now()}`,
  };
  teachers.push(newTeacher);
  saveTeachers(teachers);
  return newTeacher;
};

export const updateTeacher = (id: string | number, updates: Partial<Teacher>): void => {
  const teachers = getTeachers();
  const index = teachers.findIndex((t) => t.id === id);
  if (index !== -1) {
    teachers[index] = { ...teachers[index], ...updates };
    saveTeachers(teachers);
  }
};

export const deleteTeacher = (id: string | number): void => {
  const teachers = getTeachers().filter((t) => t.id !== id);
  saveTeachers(teachers);
};

/* ===================== COURSES ===================== */
export const getCourses = (): Course[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.COURSES);
  if (stored) {
    return JSON.parse(stored);
  }
  // Return mock data as default
  return coursesData;
};

export const saveCourses = (courses: Course[]): void => {
  localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
};

export const addCourse = (course: Course): Course => {
  const courses = getCourses();
  courses.push(course);
  saveCourses(courses);
  return course;
};

export const updateCourse = (id: string, updates: Partial<Course>): void => {
  const courses = getCourses();
  const index = courses.findIndex((c) => c.id === id);
  if (index !== -1) {
    courses[index] = { ...courses[index], ...updates };
    saveCourses(courses);
  }
};

export const deleteCourse = (id: string): void => {
  const courses = getCourses().filter((c) => c.id !== id);
  saveCourses(courses);
};

export const addExamToCourse = (
  courseId: string,
  subCourseId: string,
  exam: { id: string; title: string; timeLimit: number }
): void => {
  const courses = getCourses();
  const course = courses.find((c) => c.id === courseId);
  if (course) {
    const subCourse = course.subCourses.find((sc) => sc.id === subCourseId);
    if (subCourse) {
      // Store exams separately in localStorage if needed
      const examsKey = `admin_exams_${subCourseId}`;
      const exams = localStorage.getItem(examsKey);
      const examList = exams ? JSON.parse(exams) : [];
      examList.push(exam);
      localStorage.setItem(examsKey, JSON.stringify(examList));
    }
  }
};

/* ===================== ABOUT US ===================== */
export const getAboutUs = (): AboutUs => {
  const stored = localStorage.getItem(STORAGE_KEYS.ABOUT_US);
  return stored
    ? JSON.parse(stored)
    : {
        mission:
          'Tại Kata Edu, chúng tôi tin rằng mỗi học sinh đều có một tiềm năng về hạn. Sứ mệnh của chúng tôi là khơi dậy niềm đam mê mê học tập, cung cấp mỗi trường giáo dục tiên tiến và đối ngũ giáo viên tận tâm để giúp các em phát triển toàn diện về cả trí tuệ lẫn nhân cách.',
        vision: 'Trở thành hệ thống giáo dục hàng đầu Việt Nam.',
        studentsCount: 10000,
        coursesCount: 50,
      };
};

export const saveAboutUs = (aboutUs: AboutUs): void => {
  localStorage.setItem(STORAGE_KEYS.ABOUT_US, JSON.stringify(aboutUs));
};
