import { ExamData } from '../types';

/* ===================== COURSES ===================== */

export const coursesData = [
  {
    id: 'toan',
    title: 'Toán',
    subCourses: [
      { id: 'toan-1-5', title: 'Toán Lớp 1-5', image: 'https://picsum.photos/seed/toan1/400/300' },
      { id: 'toan-6-9', title: 'Toán Lớp 6-9', image: 'https://picsum.photos/seed/toan2/400/300' },
      { id: 'toan-10-12', title: 'Toán Lớp 10-12', image: 'https://picsum.photos/seed/toan3/400/300' },
      { id: 'toan-chuyen', title: 'Ôn thi vào trường chuyên cấp 2,3, đại học', image: 'https://picsum.photos/seed/toan4/400/300' }
    ]
  },
  {
    id: 'tieng-anh',
    title: 'Tiếng Anh',
    subCourses: [
      { id: 'ta-sgk', title: 'Tiếng Anh theo SGK', image: 'https://picsum.photos/seed/ta1/400/300' },
      { id: 'ta-giao-tiep', title: 'Tiếng Anh giao tiếp', image: 'https://picsum.photos/seed/ta2/400/300' },
      { id: 'ta-chuyen', title: 'Luyện thi chuyên 2-3, đại học', image: 'https://picsum.photos/seed/ta3/400/300' },
      { id: 'ta-ielts', title: 'IELTS', image: 'https://picsum.photos/seed/ta4/400/300' },
      { id: 'ta-vao-10', title: 'Luyện thi vào 10', image: 'https://picsum.photos/seed/ta5/400/300' }
    ]
  }
];

/* ===================== TEACHERS ===================== */

export const teachersData = [
  { id: 1, name: 'Cô Nguyễn Thị A', subject: 'Toán', image: 'https://picsum.photos/seed/teacher1/200/200', desc: '10 năm kinh nghiệm luyện thi' },
  { id: 2, name: 'Thầy Trần Văn B', subject: 'Tiếng Anh', image: 'https://picsum.photos/seed/teacher2/200/200', desc: 'IELTS 8.5, chuyên gia giao tiếp' }
];

/* ===================== EXAMS (METADATA) ===================== */
/**
 * Dùng cho danh sách đề thi (list view)
 * KHÔNG chứa câu hỏi
 */

export const examsData = {
  'ta-sgk': [
    {
      id: 'exam-ta6',
      title: 'Đề kiểm tra Tiếng Anh Lớp 6 - Giữa kì 1',
      timeLimit: 2700
    }
  ],
  'ta-vao-10': [
    {
      id: 'exam_kata_01',
      title: 'Bài kiểm tra số 1 - Ngữ pháp & Nghe',
      timeLimit: 1800
    }
  ]
};

/* ===================== FULL EXAM DATA ===================== */
/**
 * Map examId → ExamData
 * Dùng khi làm bài
 */

export const examDataMap: Record<string, ExamData> = {
  'exam_kata_01': {
    id: 'exam_kata_01',
    title: 'Bài kiểm tra số 1 - Ngữ pháp & Nghe',
    timeLimit: 1800,
    questions: [
    {
      id: 'q1',
      type: 'multiple-choice',
      questionContent: 'Choose the correct word to complete the sentence:\n"She _____ to the store every morning."',
      options: ['go', 'goes', 'going', 'gone'],
      correctAnswer: 'goes',
      explanation: 'Với chủ ngữ là ngôi thứ 3 số ít "She" và thì hiện tại đơn (dấu hiệu: "every morning"), động từ "go" phải thêm "es" thành "goes".'
    },
    {
      id: 'q2',
      type: 'listening',
      questionContent: 'Listen to the audio and select the fruit the speaker is talking about.',
      media: {
        type: 'audio',
        url: 'https://actions.google.com/sounds/v1/alarms/beep_short.ogg' // Mock audio url
      },
      options: ['Apple', 'Banana', 'Orange', 'Mango'],
      correctAnswer: 'Apple',
      explanation: 'Trong đoạn băng, người nói nhắc đến "A red fruit that keeps the doctor away", ám chỉ quả táo (Apple).'
    },
    {
      id: 'q3',
      type: 'word-ordering',
      questionContent: 'Sắp xếp các từ sau thành câu hoàn chỉnh:',
      options: ['playing', 'is', 'He', 'football', 'now'],
      correctAnswer: ['He', 'is', 'playing', 'football', 'now'],
      explanation: 'Đây là câu thì hiện tại tiếp diễn. Cấu trúc đúng là: Chủ ngữ (He) + to be (is) + V-ing (playing) + Tân ngữ (football) + Trạng từ thời gian (now).'
    },
    {
      id: 'q4',
      type: 'multiple-choice',
      passage: 'NAUGHTY BILLY\nBilly lives in a flat in the city with her family. Last Saturday was a very hot day and her family decided to stay at home. Billy didn\'t have anyone to play with. She asked her dad, but he had to wash the car. She didn\'t ask her mum, because she was in the living room with one of her friends. Billy thought, "Perhaps Jane will play with me." But her elder sister was doing her homework. Billy went downstairs to the kitchen. She took three things out of the fridge: the milk, a bottle of orange juice and some lemonade. It was difficult to choose, so Billy put all three of them in one glass. Then she took it upstairs and put it down on Jane\'s desk. Jane picked up the drink and tasted it. "Oh no, Billy!" she laughed, "This is horrible!". "Hahaha. Come here and play with me." said Billy.',
      questionContent: 'Why didn\'t Billy ask her mother to play with her?',
      options: [
        'A. Because her mother was watching TV.',
        'B. Because her mother was washing the car.',
        'C. Because her mother was not at home.',
        'D. Because her mother was in the living room with her friend.'
      ],
      correctAnswer: 'D. Because her mother was in the living room with her friend.',
      explanation: 'Trong bài có câu: "She didn’t ask her mum, because she was in the living room with one of her friends."'
    },
    {
      id: 'q5',
      type: 'multiple-choice',
      passage: 'NAUGHTY BILLY\nBilly lives in a flat in the city with her family. Last Saturday was a very hot day and her family decided to stay at home. Billy didn\'t have anyone to play with. She asked her dad, but he had to wash the car. She didn\'t ask her mum, because she was in the living room with one of her friends. Billy thought, "Perhaps Jane will play with me." But her elder sister was doing her homework. Billy went downstairs to the kitchen. She took three things out of the fridge: the milk, a bottle of orange juice and some lemonade. It was difficult to choose, so Billy put all three of them in one glass. Then she took it upstairs and put it down on Jane\'s desk. Jane picked up the drink and tasted it. "Oh no, Billy!" she laughed, "This is horrible!". "Hahaha. Come here and play with me." said Billy.',
      questionContent: 'Who is Jane?',
      options: [
        'A. She is Billy\'s elder sister.',
        'B. She is Billy\'s younger sister.',
        'C. She is Billy\'s friend.',
        'D. She is Billy\'s mother.'
      ],
      correctAnswer: 'A. She is Billy\'s elder sister.',
      explanation: 'Trong bài có đề cập: "Perhaps Jane will play with me." But her elder sister was doing her homework. Suy ra Jane là chị gái (elder sister).'
    },
    {
      id: 'q6',
      type: 'multiple-choice',
      passage: 'NAUGHTY BILLY\nBilly lives in a flat in the city with her family. Last Saturday was a very hot day and her family decided to stay at home. Billy didn\'t have anyone to play with. She asked her dad, but he had to wash the car. She didn\'t ask her mum, because she was in the living room with one of her friends. Billy thought, "Perhaps Jane will play with me." But her elder sister was doing her homework. Billy went downstairs to the kitchen. She took three things out of the fridge: the milk, a bottle of orange juice and some lemonade. It was difficult to choose, so Billy put all three of them in one glass. Then she took it upstairs and put it down on Jane\'s desk. Jane picked up the drink and tasted it. "Oh no, Billy!" she laughed, "This is horrible!". "Hahaha. Come here and play with me." said Billy.',
      questionContent: 'What was Jane doing when Billy asked her to play with?',
      options: [
        'A. She was watching TV.',
        'B. She was doing the housework.',
        'C. She was doing her homework.',
        'D. She was talking on the phone.'
      ],
      correctAnswer: 'C. She was doing her homework.',
      explanation: 'Trong đoạn văn có mô tả lúc Billy định rủ Jane chơi cùng: "But her elder sister was doing her homework." (Nhưng chị gái cô đang làm bài tập về nhà).'
    },
    {
      id: 'q7',
      type: 'multiple-choice',
      passage: 'NAUGHTY BILLY\nBilly lives in a flat in the city with her family. Last Saturday was a very hot day and her family decided to stay at home. Billy didn\'t have anyone to play with. She asked her dad, but he had to wash the car. She didn\'t ask her mum, because she was in the living room with one of her friends. Billy thought, "Perhaps Jane will play with me." But her elder sister was doing her homework. Billy went downstairs to the kitchen. She took three things out of the fridge: the milk, a bottle of orange juice and some lemonade. It was difficult to choose, so Billy put all three of them in one glass. Then she took it upstairs and put it down on Jane\'s desk. Jane picked up the drink and tasted it. "Oh no, Billy!" she laughed, "This is horrible!". "Hahaha. Come here and play with me." said Billy.',
      questionContent: 'Which of the following statements is NOT TRUE?',
      options: [
        'A. Billy gave her sister a glass of orange juice.',
        'B. It was hot last Saturday.',
        'C. Billy took three things from the fridge: some lemonade, a bottle of orange juice and the milk.',
        'D. Billy lived with her family in the city.'
      ],
      correctAnswer: 'A. Billy gave her sister a glass of orange juice.',
      explanation: 'Dữ kiện A không đúng vì Billy không đưa riêng nước cam mà đã trộn lẫn 3 thức uống (milk, orange juice, lemonade) vào chung một ly: "...so Billy put all three of them in one glass."'
    },
    {
      id: 'q8',
      type: 'fill-in-the-blank',
      questionContent: 'Viết lại câu sau sao cho nghĩa không đổi:\nAre there 63 provinces and cities in your country?',
      correctAnswer: 'Does your country have 63 provinces and cities?',
      explanation: 'Sử dụng cấu trúc "Does [subject] have..." thay thế cho "Are there..."'
    },
    {
      id: 'q9',
      type: 'fill-in-the-blank',
      questionContent: 'Viết lại câu sau sao cho nghĩa không đổi:\nWhat is the distance between Noi Bai airport and your house?',
      correctAnswer: 'How far is it from Noi Bai airport to your house?',
      explanation: 'Sử dụng cấu trúc "How far is it from [A] to [B]?" để hỏi về khoảng cách.'
    },
    {
      id: 'q10',
      type: 'fill-in-the-blank',
      questionContent: 'Dùng từ gợi ý trong ngoặc để viết lại câu:\nWe go to school at seven fifteen every morning. (QUARTER)',
      correctAnswer: 'We go to school at a quarter past seven every morning.',
      explanation: '"7:15" được đọc là "a quarter past seven".'
    },
    {
      id: 'q11',
      type: 'fill-in-the-blank',
      questionContent: 'Tìm và sửa LỖI SAI trong câu (nhập câu hoàn chỉnh):\nLaura is the same age to me.',
      correctAnswer: 'Laura is the same age as me.',
      explanation: 'Thành ngữ đúng là "the same age as" không phải "the same age to".'
    }
  ]
  }
};