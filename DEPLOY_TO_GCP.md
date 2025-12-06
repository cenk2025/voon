# Deploying to Google Cloud

You can deploy this application to Google Cloud using two main methods: **Firebase Hosting** (recommended for simplicity) or **Google Cloud Run** (recommended for containerization/enterprise).

## Option 1: Firebase Hosting (Recommended)
Firebase Hosting is optimized for static web apps like this React application.

### Prerequisites
1. Create a project at [console.firebase.google.com](https://console.firebase.google.com).
2. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

### Steps
1. **Login to Firebase**:
   ```bash
   firebase login
   ```

2. **Initialize the project**:
   ```bash
   firebase init hosting
   ```
   - Select **"Use an existing project"** (choose the one you created).
   - Public directory: `dist` (Vite's build output).
   - Configure as a single-page app? **Yes**.
   - Set up automatic builds and deploys with GitHub? (Optional).

3. **Build and Deploy**:
   ```bash
   npm run build
   firebase deploy
   ```

---

## Option 2: Google Cloud Run (Containerized)
Cloud Run allows you to run the application in a container. I have already created the `Dockerfile` and `nginx.conf` for you.

### Prerequisites
1. Install the [Google Cloud SDK](https://cloud.google.com/sdk/docs/install).
2. Enable the **Cloud Run API** and **Artifact Registry API** in your Google Cloud Console.

### Steps
1. **Login to Google Cloud**:
   ```bash
   gcloud auth login
   gcloud config set project [YOUR_PROJECT_ID]
   ```

2. **Build and Submit the Container**:
   This command builds the Docker image and uploads it to Google Container Registry (GCR) or Artifact Registry.
   ```bash
   gcloud builds submit --tag gcr.io/[YOUR_PROJECT_ID]/story-magic-app
   ```

3. **Deploy to Cloud Run**:
   ```bash
   gcloud run deploy story-magic-app \
     --image gcr.io/[YOUR_PROJECT_ID]/story-magic-app \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated
   ```

4. **Access the App**:
   The command will output a Service URL (e.g., `https://story-magic-app-xyz-uc.a.run.app`). Click it to view your live app!

## Summary
- Use **Firebase Hosting** for the fastest, cheapest, and easiest deployment.
- Use **Cloud Run** if you need to integrate with other GCP services in a private VPC or require a containerized environment.
