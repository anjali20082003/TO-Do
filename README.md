# SNM Task Management System

A modern, responsive To-Do List application built with React, TypeScript, and localStorage for efficient task management.

## 🚀 Features

### ✨ Core Features
- **Multi-User Support** - Complete user authentication system with localStorage
- **Task Management** - Create, edit, delete, and track tasks with priorities
- **User-Specific Data** - Each user has isolated task storage
- **Responsive Design** - Modern UI that works on desktop and mobile
- **Dark/Light Theme** - Toggle between themes for better user experience
- **Real-time Statistics** - Dashboard with completion rates and progress tracking

### 🔐 Authentication System
- **Sign Up** - New users get empty task lists to start with
- **Sign In** - Existing users see their saved tasks immediately
- **Session Persistence** - Stay logged in across browser sessions
- **Email/Username Login** - Flexible login with email or username
- **Secure Storage** - User data isolated in localStorage

### 📊 Task Features
- **Priority Levels** - High, Medium, Low priority tasks
- **Task Filtering** - Filter by status, priority, or search terms
- **Completion Tracking** - Mark tasks as complete/incomplete
- **Task Statistics** - Visual progress indicators and completion rates
- **Deadline Management** - Set and track task deadlines

## 🛠️ Technology Stack

- **Frontend Framework:** React 18.3.1
- **Language:** TypeScript 5.5.3
- **Build Tool:** Vite 5.4.2
- **Styling:** Tailwind CSS 3.4.1
- **Form Handling:** React Hook Form 7.62.0 + Zod 4.1.8
- **Routing:** React Router DOM 7.9.1
- **Icons:** Lucide React 0.344.0
- **State Management:** React Context API
- **Storage:** localStorage

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

### Linting

```bash
npm run lint
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Auth/           # Authentication forms
│   ├── Layout/         # Navigation and layout components
│   ├── Tasks/          # Task-related components
│   └── UI/             # Generic UI components
├── contexts/           # React Context providers
│   ├── AuthContext.tsx # User authentication state
│   └── ThemeContext.tsx # Theme management
├── hooks/              # Custom React hooks
│   ├── useTasks.ts     # Task management logic
│   └── useMeetings.ts  # Meeting management logic
├── pages/              # Main page components
│   ├── Dashboard.tsx   # Main dashboard
│   ├── Tasks.tsx       # Task management page
│   ├── Profile.tsx     # User profile
│   └── Auth.tsx        # Authentication page
├── types/              # TypeScript type definitions
└── App.tsx             # Main application component
```

## 🎯 Usage

### For New Users
1. Click "Sign Up" to create an account
2. Fill in your details (email, username, password)
3. Start with an empty dashboard
4. Click "Create Your First Task" to begin

### For Existing Users
1. Sign in with your email/username and password
2. Your saved tasks will load immediately
3. Continue managing your tasks from where you left off

### Task Management
1. **Create Tasks** - Click "Create New Task" button
2. **Set Priority** - Choose High, Medium, or Low priority
3. **Add Deadlines** - Set due dates for your tasks
4. **Filter Tasks** - Use filters to find specific tasks
5. **Track Progress** - View completion statistics on dashboard

## 🔒 Security Features

- **User Isolation** - Each user's data is completely separate
- **Password Protection** - Secure login system
- **Session Management** - Proper login/logout handling
- **Input Validation** - Form validation with Zod schemas
- **Duplicate Prevention** - Prevents duplicate email/username registration

## 🎨 UI/UX Features

- **Modern Design** - Clean, professional interface
- **Responsive Layout** - Works on all device sizes
- **Dark/Light Theme** - User preference saved
- **Smooth Animations** - Enhanced user experience
- **Toast Notifications** - Real-time feedback
- **Loading States** - Clear loading indicators

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop** - Full-featured interface
- **Tablet** - Adapted layout for medium screens
- **Mobile** - Touch-friendly interface with collapsible navigation

## 🚀 Deployment

This project can be deployed to any static hosting service:

- **Vercel** (Recommended)
- **Netlify**
- **GitHub Pages**
- **Firebase Hosting**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Lucide for the beautiful icons
- Vite for the fast build tool