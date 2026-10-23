import { SiC, SiCplusplus, SiJavascript,SiPython,SiPostman,SiMaterialdesign,SiGeeksforgeeks,SiLeetcode,SiMongodb, SiHtml5, SiCss, SiReact, SiTailwindcss, SiNodedotjs, SiExpress, SiMysql, SiPostgresql, SiJson, SiGit, SiGithub } from 'react-icons/si'
import { FaJava } from 'react-icons/fa'
import { VscVscode } from 'react-icons/vsc'
import { Webhook, ArrowLeftRight, Database, Puzzle, Brain, Users, Shuffle, BookOpen, ShoppingBag, ListChecks,Trophy, Globe } from 'lucide-react'

// ---- Edit links here. Empty string = shown as "unavailable" in the UI. ----
export const links = {
  github: "https://github.com/kamesh-06-06",
  linkedin: "https://www.linkedin.com/in/kamesh-kamalakannan", 
  email: "kameshkamalakannan6@gmail.com",
  phone: "+91 9361782205",
  resume: "/resume.pdf",
};

export const profile = {
  name: 'Kamesh Kamalakannan',
  location: 'Kumbakonam, Tamil Nadu, India',
  roles: ['Full Stack Developer', 'Backend Developer', 'Frontend Developer', 'Problem Solver'],
  intro: "I'm a final-year B.Sc. Computer Science student passionate about building modern, scalable, and user-friendly web applications. I enjoy developing responsive frontend interfaces, creating RESTful APIs, and solving real-world problems through technology.",
  about: [
    'I am Kamesh Kamalakannan, a final-year B.Sc. Computer Science student at SASTRA Deemed to be University.',
    'I am an aspiring Full Stack and Backend Developer with knowledge of React.js, JavaScript, Node.js, Express.js, MySQL, PostgreSQL, and RESTful API development.',
    'I enjoy transforming ideas into functional applications and continuously exploring new technologies to improve my development skills.',
    'My goal is to start my career as a software developer, contribute to meaningful projects, and grow into a skilled software engineer.',
  ],
  keywords: ['React.js', 'JavaScript', 'Node.js', 'Express.js', 'MySQL', 'PostgreSQL', 'RESTful API', 'Full Stack', 'Backend'],
  details: [
    ['Name', 'Kamesh Kamalakannan'], ['Location', 'Kumbakonam, Tamil Nadu'], ['Degree', 'B.Sc. Computer Science'],
    ['University', 'SASTRA Deemed to be University'], ['Graduation', '2027'], ['Career Interest', 'Full Stack / Backend Development'],
  ],
}

export const nav = ['Home', 'About', 'Skills'/*,'Education'*/, 'Projects', /*'Certifications',*/ 'Contact']

export const skillCategories = [
  {
    name: "Languages",
    items: [
      {n: "C", i: SiC, d: "Foundational systems-level programming."},

      {
        n: "C++",
        i: SiCplusplus,
        d: "Object-oriented programming and data structures.",
      },
      {n: "Java", i: FaJava, d: "Object-oriented programming language."},
      {
        n: "JavaScript",
        i: SiJavascript,
        d: "Language of the web, used on frontend and backend.",
      },
      {n: "Python", i: SiPython, d: "High level programming language."},
    ],
  },
  {
    name: "Frontend",
    items: [
      {n: "HTML5", i: SiHtml5, d: "Semantic page structure."},
      {n: "CSS3", i: SiCss, d: "Responsive layouts and styling."},
      {n: "React.js", i: SiReact, d: "Component-based user interfaces."},
      {n: "Tailwind CSS", i: SiTailwindcss, d: "Utility-first styling."},
      // {n: "Materialdesign", i: SiMaterialdesign, d: "Utility-first styling."},
    ],
  },
  {
    name: "Backend",
    items: [
      {
        n: "Node.js",
        i: SiNodedotjs,
        d: "JavaScript runtime for server-side apps.",
      },
      {n: "Express.js", i: SiExpress, d: "Building REST APIs on Node.js."},
    ],
  },
  {
    name: "Databases",
    items: [
      {n: "MySQL", i: SiMysql, d: "Relational database used in TaskFlow."},
      {n: "MongoDb", i: SiMongodb, d: "No SQL."},
      {n: "PostgreSQL", i: SiPostgresql, d: "Relational database and SQL."},
    ],
  },
  {
    name: "APIs & Web",
    items: [
      {n: "Postman", i: SiPostman, d: "Testing APIs."},
      {n: "REST APIs", i: Webhook, d: "Designing resource-based endpoints."},
      {n: "JSON", i: SiJson, d: "Data interchange format."},
      {
        n: "HTTP Methods",
        i: ArrowLeftRight,
        d: "GET, POST, PUT, DELETE semantics.",
      },
      {n: "CRUD", i: Database, d: "Create, read, update, delete operations."},
    ],
  },
  {
    name: "Tools",
    items: [
      {n: "Git", i: SiGit, d: "Version control."},
      {n: "GitHub", i: SiGithub, d: "Code hosting and collaboration."},
      {n: "VS Code", i: VscVscode, d: "Primary code editor."},
    ],
  },
];

export const education = [{
  school: 'SASTRA Deemed to be University', degree: 'B.Sc. Computer Science', years: '2024 – 2027', score: '74%', place: 'Kumbakonam, Tamil Nadu',
}]

// github / demo / image: leave '' until real URLs / files exist
export const projects = [
  {
    id: "quiz",
    title: "Student Quiz Competition Website",
    subtitle: "Online Quiz & Competition Platform",
    category: "Full Stack",
    icon: Trophy,
    image: "/images/quiz.png",
    github: "",
    demo: "",
    stack: [
      "React.js",
      "Tailwind CSS",
      "JavaScript",
      "Node.js",
      "Express.js",
      "MySQL",
    ],
    description:
      "Developed a full-stack online quiz competition platform that allows students to participate in timed MCQ-based quizzes, receive instant results, and track their performance through an interactive and responsive interface.",
    features: [
      "Student registration and secure login.",
      "Interactive multiple-choice quiz interface.",
      "Timed quizzes with automatic submission.",
      "Automatic score calculation and instant results.",
      "Leaderboard to display top-performing students.",
      "Admin panel for managing quizzes and questions.",
      "RESTful API integration with Node.js and Express.js.",
      "MySQL database for storing users, questions, and results.",
      "Responsive design across mobile, tablet, and desktop devices.",
    ],
  },
  {
    id: "taskflow",
    title: "TaskFlow",
    subtitle: "Task Management System",
    category: "Full Stack",
    featured: true,
    icon: ListChecks,
    image: "/images/taskflow.png",
    github: "",
    demo: "",
    stack: ["React.js", "Node.js", "Express.js", "MySQL", "REST API", "JWT"],
    description:
      "Developed a full-stack task management application that allows users to organize tasks, update task status, and track deadlines through a user-friendly dashboard.",
    features: [
      "Create, Read, Update, Delete tasks.",
      "RESTful API development using Express.js.",
      "MySQL database integration.",
      "JWT-based authentication.",
      "Task status and deadline tracking.",
      "Interactive task dashboard.",
      "Responsive frontend.",
    ],
  },
  {
    id: "ecart",
    title: "E-Cart",
    subtitle: "E-Commerce Web Application",
    category: "Frontend",
    icon: ShoppingBag,
    image: "/images/eCart-icon.png",
    github: "https://github.com/Kamesh-06-06/e-cart",
    demo: "https://e-cart-kamesh15.vercel.app",
    stack: ["React.js", "Tailwind CSS", "JavaScript"],
    description:
      "Developed a modern, responsive e-commerce web application featuring dynamic product listings, product search, shopping cart functionality, and smooth navigation.",
    features: [
      "Responsive product listing interface.",
      "Dynamic product search and filtering.",
      "Shopping cart using React Context API.",
      "Add, remove, and update product quantities.",
      "Multi-page navigation using React Router.",
      "Order information stored using browser LocalStorage.",
      "Mobile-friendly UI with interactive components.",
    ],
  },
];

export const certifications = [
  { title: 'Database Management Systems (DBMS)', provider: 'NPTEL', year: '2026', url: '', image: '/images/nptel.jpg' },
  { title: 'React Foundation', provider: 'Simplilearn SkillUp', year: '2026', url: '', image: '' },
]

export const softSkills = [
  // {n: "LeetCode", i: SiLeetcode},
  // {n: "Geeksforgeeks", i: SiGeeksforgeeks},
  {n: "Problem Solving", i: Puzzle},
  {n: "Logical Thinking", i: Brain},
  {n: "Team Collaboration", i: Users},
  {n: "Adaptability", i: Shuffle},
  {n: "Willingness to Learn", i: BookOpen},
];
