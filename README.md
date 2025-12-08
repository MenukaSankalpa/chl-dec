# 🎄 Christmas Greetings — Next.js + Tailwind + MongoDB

A modern, deployable Next.js application for sharing Christmas greetings. Features a beautiful form for submitting holiday wishes, animated greeting cards, confetti effects, and MongoDB Atlas integration.

![Christmas Greetings App](https://github.com/user-attachments/assets/9849cace-0a38-4bbc-89b2-de1260d3358c)

## ✨ Features

- 📝 **Interactive Form**: Submit name, designation, and greeting message
- 🎨 **Modern UI**: Built with Tailwind CSS for a beautiful, responsive design
- ✨ **Smooth Animations**: Framer Motion for delightful page transitions and card animations
- 🎉 **Confetti Effect**: Celebrate submissions with canvas-confetti
- 💾 **MongoDB Integration**: Store greetings in MongoDB Atlas
- ⚡ **Next.js API Routes**: Serverless API for GET/POST operations
- 🚀 **Vercel-Ready**: Optimized for deployment on Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (free tier works great!)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MenukaSankalpa/chl-dec.git
   cd chl-dec
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```bash
   cp .env.local.example .env.local
   ```
   
   Then edit `.env.local` and add your MongoDB connection string:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
   ```
   
   **To get your MongoDB URI:**
   - Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free cluster
   - Click "Connect" → "Connect your application"
   - Copy the connection string and replace `<password>` with your database user password

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Language**: TypeScript
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Database**: [MongoDB](https://www.mongodb.com/) with official Node.js driver
- **Effects**: [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)

## 🏗️ Project Structure

```
chl-dec/
├── app/
│   ├── api/
│   │   └── greetings/
│   │       └── route.ts       # API endpoints for GET/POST greetings
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Main page with form and greetings list
├── lib/
│   └── mongodb.ts             # MongoDB connection utility
├── public/                    # Static assets
├── .env.local.example         # Environment variables template
└── vercel.json                # Vercel deployment configuration
```

## 🚀 Deployment to Vercel

1. **Push your code to GitHub**

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository

3. **Add Environment Variables**
   - In Vercel project settings, add `MONGODB_URI`
   - Paste your MongoDB connection string

4. **Deploy!**
   - Vercel will automatically build and deploy your app
   - Your app will be live at `https://your-project.vercel.app`

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 📝 API Endpoints

### GET `/api/greetings`
Fetches the latest 50 greetings, sorted by creation date (newest first).

**Response:**
```json
{
  "greetings": [
    {
      "_id": "...",
      "name": "John Doe",
      "designation": "Software Engineer",
      "message": "Merry Christmas!",
      "createdAt": "2024-12-08T..."
    }
  ]
}
```

### POST `/api/greetings`
Submits a new greeting.

**Request Body:**
```json
{
  "name": "John Doe",
  "designation": "Software Engineer",
  "message": "Wishing everyone a wonderful Christmas!"
}
```

**Validation:**
- All fields are required
- Max length: 100 chars (name, designation), 500 chars (message)

## 🎨 Customization

### Modify Colors
Edit `app/page.tsx` to change the color scheme. Current theme uses:
- Red (`red-500`, `red-600`) for primary actions
- Green (`green-500`, `green-600`) for secondary elements
- Gradient backgrounds for a festive look

### Adjust Animations
Modify Framer Motion settings in `app/page.tsx`:
```typescript
initial={{ opacity: 0, y: -20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}
```

### Change Confetti Settings
Customize confetti in the `handleSubmit` function:
```typescript
confetti({
  particleCount: 100,
  spread: 70,
  origin: { y: 0.6 },
});
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/MenukaSankalpa/chl-dec/issues).

## 👨‍💻 Author

**Menuka Sankalpa**
- GitHub: [@MenukaSankalpa](https://github.com/MenukaSankalpa)

---

Made with ❤️ and ☕ for the holiday season! 🎄
