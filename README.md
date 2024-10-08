## Getting Started

### Prerequisites

Before running the project, ensure you have the following installed:

- **Node.js** (v12+)
- **Vite**
- A Firebase project setup with Firestore

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/task-management-app.git
    cd task-management-app
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up Firebase:**

   Create a `.env` file in the root directory of your project and add your Firebase credentials (from Firebase Console):

    ```bash
    VITE_FIREBASE_API_KEY=your_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
    VITE_FIREBASE_PROJECT_ID=your_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
    VITE_FIREBASE_APP_ID=your_app_id
    VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
    ```

4. **Run the application locally:**

    ```bash
    npm run dev
    ```

   The application should now be running at `http://localhost:3000`.

5. **Deploy the application to Vercel:**

   The live version of this application is deployed and running at:

   **[kanban-board-one-tawny.vercel.app](https://kanban-board-one-tawny.vercel.app)**

   Any changes pushed to the main branch of your repository will automatically deploy to Vercel.
