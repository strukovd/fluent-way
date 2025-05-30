# English Trainer

## Project Description
A web application built with Vue.js to help users learn English. It aims to provide features for vocabulary training, lesson planning, and tracking learning progress.

## Features
*   **User Authentication:** Secure login for users.
*   **Dashboard/Home Page:** Central navigation and overview.
*   **Vocabulary Learning:**
    *   Browse and learn new English words.
    *   (Potentially: Study words with antonyms - based on initial project notes).
*   **Lesson/Study Plan:** Organize and track learning activities.

## Tech Stack
*   **Frontend:** Vue.js 3
*   **State Management:** Pinia
*   **Routing:** Vue Router
*   **Build Tool:** Vite
*   **Language:** TypeScript
*   **Linting:** ESLint
*   **Styling:** SASS/SCSS (files found in `src/styles`)

## Getting Started

### Prerequisites
*   Node.js (ensure you have a recent version installed, e.g., v18 or v20+)
*   npm (comes with Node.js)

### Installation
1.  Clone the repository:
    ```bash
    git clone <repository_url>
    ```
    (Replace `<repository_url>` with the actual URL of this repository)
2.  Navigate to the project directory:
    ```bash
    cd english-trainer
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```

### Running the Application
1.  Start the development server:
    ```bash
    npm run dev
    ```
2.  Open your browser and navigate to the URL provided by Vite (usually `http://localhost:5173`).

## Available Scripts
*   `npm run dev`: Runs the application in development mode with hot-reloading.
*   `npm run build`: Compiles and minifies the application for production. This includes type checking.
*   `npm run preview`: Serves the production build locally for previewing before deployment.
*   `npm run lint`: Lints the project files using ESLint and attempts to fix issues.
*   `npm run type-check`: Performs static type checking using Vue TypeScript (`vue-tsc`).

## Contributing
Contributions are welcome! If you'd like to improve English Trainer, please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix:
    ```bash
    git checkout -b feature/your-feature-name
    ```
    or
    ```bash
    git checkout -b bugfix/issue-description
    ```
3.  Make your changes and commit them with clear messages.
4.  Push your changes to your forked repository.
5.  Create a Pull Request (PR) to the main repository's `main` (or `master`) branch.

Please ensure your code adheres to the project's linting standards (run `npm run lint` before committing).
