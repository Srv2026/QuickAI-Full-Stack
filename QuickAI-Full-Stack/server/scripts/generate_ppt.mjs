import PptxGenJS from 'pptxgenjs'
import fs from 'fs'
import path from 'path'

const pptx = new PptxGenJS()
pptx.author = 'QuickAI'
pptx.company = 'QuickAI'
pptx.title = 'QuickAI Full-Stack Project'

const addTitle = (slide, title) => {
  slide.addText(title, { x: 0.5, y: 0.4, w: 9, h: 1, fontSize: 36, bold: true })
}

const addBullets = (slide, bullets) => {
  slide.addText(
    bullets.map(t => ({ text: t, options: { bullet: true, fontSize: 20 } })),
    { x: 0.7, y: 1.2, w: 8.6, h: 5 }
  )
}

{
  const slide = pptx.addSlide()
  addTitle(slide, 'QuickAI Full-Stack — Overview')
  addBullets(slide, [
    'AI-powered tools for content and images',
    'React (Vite) frontend, Express backend',
    'Auth via Clerk, data via Neon PostgreSQL',
    'Cloudinary and Clipdrop for image workflows',
    'Subscription model: free and premium'
  ])
}

{
  const slide = pptx.addSlide()
  addTitle(slide, 'Architecture')
  addBullets(slide, [
    'Client: React + Vite (port 5173)',
    'Server: Express (port 3000)',
    'Auth: Clerk (middleware and UI)',
    'Database: Neon PostgreSQL (serverless)',
    'Media: Cloudinary, Image Gen: Clipdrop'
  ])
}

{
  const slide = pptx.addSlide()
  addTitle(slide, 'Technology Stack')
  addBullets(slide, [
    'Frontend: React, Vite, Tailwind, Router, Axios',
    'Backend: Node.js, Express, Clerk Express, Multer',
    'Services: Cloudinary, Neon, Clipdrop, Gemini',
    'Tooling: ESLint, Nodemon'
  ])
}

{
  const slide = pptx.addSlide()
  addTitle(slide, 'Key Features')
  addBullets(slide, [
    'Article and blog title generation',
    'Text-to-image generation',
    'Background and object removal',
    'Resume review from PDF',
    'Dashboard and community publishing',
    'Likes and plan-based access'
  ])
}

{
  const slide = pptx.addSlide()
  addTitle(slide, 'Frontend Structure')
  addBullets(slide, [
    'Components: Navbar, Hero, AiTools, Plan, Sidebar',
    'Pages: Home, Dashboard, Community, tools suite',
    'Layout: protected routes with Clerk',
    'Global styles via Tailwind'
  ])
}

{
  const slide = pptx.addSlide()
  addTitle(slide, 'Backend Structure')
  addBullets(slide, [
    'Routes: /api/ai, /api/user',
    'Controllers: aiController, userController',
    'Middleware: auth with plan and usage checks',
    'Configs: cloudinary, db, multer'
  ])
}

{
  const slide = pptx.addSlide()
  addTitle(slide, 'API Overview')
  addBullets(slide, [
    'Auth header: Bearer Clerk token',
    'AI endpoints: generate-article, blog-title, image ops, resume-review',
    'User endpoints: user creations, published, toggle like'
  ])
}

{
  const slide = pptx.addSlide()
  addTitle(slide, 'Environment Variables')
  addBullets(slide, [
    'Client: VITE_CLERK_PUBLISHABLE_KEY, VITE_BASE_URL',
    'Server: CLERK_SECRET_KEY, DATABASE_URL',
    'Cloudinary: CLOUDINARY_CLOUD_NAME, API_KEY, API_SECRET',
    'AI: GEMINI_API_KEY, CLIPDROP_API_KEY'
  ])
}

{
  const slide = pptx.addSlide()
  addTitle(slide, 'Setup & Run')
  addBullets(slide, [
    'Install deps in client and server',
    'Set .env files for client and server',
    'Start server (npm run server) and client (npm run dev)',
    'Access: http://localhost:5173 with backend at 3000'
  ])
}

{
  const slide = pptx.addSlide()
  addTitle(slide, 'Security & Best Practices')
  addBullets(slide, [
    'Auth protected routes via Clerk',
    'Plan-based feature gating and usage tracking',
    'Recommend input validation and rate limiting',
    'Use HTTPS and secure key management in production'
  ])
}

{
  const slide = pptx.addSlide()
  addTitle(slide, 'Demo Flow')
  addBullets(slide, [
    'Sign in with Clerk and access dashboard',
    'Use AI tools: generate text and images',
    'Publish creations to community and like content',
    'Review usage and plan status'
  ])
}

{
  const slide = pptx.addSlide()
  addTitle(slide, 'Future Enhancements')
  addBullets(slide, [
    'User profiles, comments, templates',
    'PDF/Markdown export and versioning',
    'Analytics, admin panel, payments',
    'Tests, CI/CD, monitoring, API docs'
  ])
}

const outName = 'QuickAI_Project_Presentation.pptx'
const outPath = path.resolve(process.cwd(), outName)
const hasPowerpoint = () => true
await pptx.writeFile({ fileName: outName })
if (!fs.existsSync(outPath)) {
  process.exitCode = 1
}
