# AIverse Hub - AI/ML Learning Platform

A comprehensive full-stack educational platform for AI and Machine Learning built with Next.js, TypeScript, and MongoDB.

## Features

- 🎓 **AI/ML Learning Paths** - Structured courses with interactive lessons
- 🔧 **AI Tool Explorer** - Discover and explore cutting-edge AI tools
- 🛡️ **Cyber Threat Simulator** - Practice cybersecurity in safe environments
- 🏆 **Model Leaderboard** - Compare and rank AI model performances
- 🔍 **Semantic Search** - AI-powered search with RAG capabilities
- 🎯 **Career Navigator** - AI-guided career path recommendations
- 💻 **Hackathon Mode** - Curated resources for AI hackathons
- 🤖 **ML Learning Agent** - Interactive AI chatbot for learning guidance

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, MongoDB with Mongoose
- **Authentication**: MongoDB-based authentication with JWT tokens
- **AI Integration**: OpenAI API, Pinecone (vector database)
- **Deployment**: Vercel

## Quick Start

### Prerequisites

- Node.js 18+ 
- MongoDB database
- OpenAI API key

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd aiverse-hub
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.example .env.local
\`\`\`

Fill in your environment variables in `.env.local`.

4. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Environment Variables

Create a `.env.local` file with the following variables:

### Required
- `MONGODB_URI` - MongoDB connection string
- `OPENAI_API_KEY` - OpenAI API key for AI features
- `JWT_SECRET` - Secret key for JWT token signing
- `NEXT_PUBLIC_BACKEND_URL` - URL of your backend server (e.g., http://localhost:3005)

### Optional
- `PINECONE_API_KEY` - For semantic search features
- `PINECONE_ENV` - Pinecone environment

## Deployment to Vercel

### Automatic Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically deploy on every push to main

### Manual Deployment

1. Install Vercel CLI:
\`\`\`bash
npm i -g vercel
\`\`\`

2. Deploy:
\`\`\`bash
vercel
\`\`\`

### Environment Variables Setup

After deployment, add your environment variables in the Vercel dashboard:

1. Go to your project in Vercel dashboard
2. Navigate to Settings → Environment Variables
3. Add all required environment variables from `.env.example`

## Project Structure

\`\`\`
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard pages
│   ├── courses/           # Course pages
│   └── ...               # Other feature pages
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Custom components
├── lib/                  # Utility functions
├── models/               # MongoDB/Mongoose models
└── scripts/              # Database seeding scripts
\`\`\`

## Development

### Database Setup

Run the seeding script to populate your database with sample data:

\`\`\`bash
npm run seed
\`\`\`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
