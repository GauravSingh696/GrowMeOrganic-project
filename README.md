# Advanced PrimeReact DataTable with Persistent Selection

This project is a feature-rich data table built with React, TypeScript, and PrimeReact. It demonstrates advanced functionalities like server-side pagination and persistent row selection while displaying artwork data from the Art Institute of Chicago's public API.

---
## 🚀 Live Demo

**[Insert Your Deployed Netlify Link Here]**

---
## ✨ Key Features

* **Server-Side Pagination**: Data is fetched from the server for each page, ensuring the application is fast and scalable, even with millions of records.
* **Persistent Row Selection**: Selections are remembered across all pages. You can select rows on page 1, navigate to page 5, select more rows, and the application will keep track of all of them.
* **Custom Selection Panel**: A dedicated panel shows a summary of all selected items from all pages, with the ability to deselect items directly from the panel.
* **Advanced Header Controls**: A custom table header allows for unique actions, such as selecting the top 'N' rows on the current page.
* **Horizontally Scrollable**: The table can be scrolled horizontally to view all columns without breaking the page layout, and the scrollbar is hidden for a cleaner look.
* **Modern Tech Stack**: Built with Vite for a blazing-fast development experience, TypeScript for type safety, and Tailwind CSS for utility-first styling.


*Suggestion: Add a screenshot or a GIF of your final application here!*

---
## 🛠️ Tech Stack

* **Framework**: [React](https://react.dev/)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **Build Tool**: [Vite](https://vitejs.dev/)
* **UI Components**: [PrimeReact](https://primereact.org/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **API Calls**: [Axios](https://axios-http.com/)

---
## ⚙️ Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### **Prerequisites**
Make sure you have Node.js (version 18.x or higher) and npm installed on your system.

### **Installation & Setup**

1.  **Clone the repository** (or download the code files into a project folder):
    ```bash
    git clone [your-repository-url]
    ```

2.  **Navigate to the project directory**:
    ```bash
    cd [your-project-folder-name]
    ```

3.  **Install the dependencies**:
    ```bash
    npm install
    ```

### **Running the Application**

To start the development server, run the following command:
```bash
npm run dev