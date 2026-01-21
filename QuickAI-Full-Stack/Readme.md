# QuickAI Full-Stack Project - Detailed Report

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Technology Stack](#technology-stack)
4. [Features](#features)
5. [Project Structure](#project-structure)
6. [API Documentation](#api-documentation)
7. [Database Schema](#database-schema)
8. [Authentication & Authorization](#authentication--authorization)
9. [Environment Configuration](#environment-configuration)
10. [Key Components](#key-components)
11. [Dependencies](#dependencies)
12. [Setup & Installation](#setup--installation)
13. [Deployment Configuration](#deployment-configuration)
14. [Usage Guide](#usage-guide)
15. [Security Features](#security-features)
16. [Future Enhancements](#future-enhancements)

---

## Project Overview

**QuickAI** is a comprehensive full-stack AI-powered web application that provides users with various AI-driven tools and services. The platform enables users to generate articles, create blog titles, generate images, remove backgrounds from images, remove objects from images, and review resumes using advanced AI models.

### Key Highlights
- **AI-Powered Content Generation**: Leverages Google's Gemini 2.0 Flash model for text generation
- **Image Processing**: Uses Clipdrop API and Cloudinary for image generation and manipulation
- **User Management**: Integrated with Clerk for authentication and user management
- **Subscription Model**: Supports free and premium subscription tiers with usage limits
- **Community Features**: Users can publish creations and interact with community content

---

## Architecture

The project follows a **client-server architecture** with clear separation of concerns:

```
┌─────────────────┐
│   React Client  │  (Frontend - Port 5173)
│   (Vite + React)│
└────────┬────────┘
         │ HTTP/REST API
         │
┌────────▼────────┐
│  Express Server │  (Backend - Port 3000)
│   (Node.js)     │
└────────┬────────┘
         │
    ┌────┴────┬──────────┬──────────────┐
    │         │          │              │
┌───▼───┐ ┌──▼───┐ ┌────▼────┐ ┌──────▼──────┐
│Clerk  │ │Neon  │ │Cloudinary│ │Clipdrop API │
│Auth   │ │PostgreSQL│ │Storage │ │Image Gen   │
└───────┘ └──────┘ └─────────┘ └─────────────┘
```

### Architecture Patterns
- **RESTful API**: Backend exposes REST endpoints
- **Component-Based UI**: React components for modular frontend
- **Middleware Pattern**: Authentication and authorization middleware
- **Service Layer**: Controllers handle business logic

---

## Technology Stack

### Frontend
- **React 19.1.0**: UI library
- **Vite 7.0.0**: Build tool and dev server
- **React Router DOM 7.6.3**: Client-side routing
- **Tailwind CSS 4.1.11**: Utility-first CSS framework
- **Axios 1.10.0**: HTTP client
- **Clerk React 5.32.3**: Authentication UI components
- **React Hot Toast 2.5.2**: Toast notifications
- **React Markdown 10.1.0**: Markdown rendering
- **Lucide React 0.525.0**: Icon library

### Backend
- **Node.js**: Runtime environment
- **Express 5.1.0**: Web framework
- **Clerk Express 1.7.4**: Authentication middleware
- **Neon Serverless 1.0.1**: PostgreSQL database client
- **Cloudinary 2.7.0**: Image storage and manipulation
- **Multer 2.0.1**: File upload handling
- **OpenAI SDK 5.8.2**: AI API client (configured for Gemini)
- **PDF Parse 1.1.1**: PDF text extraction
- **Axios 1.10.0**: HTTP client for external APIs
- **CORS 2.8.5**: Cross-origin resource sharing
- **Dotenv 17.0.1**: Environment variable management

### External Services
- **Clerk**: Authentication and user management
- **Neon PostgreSQL**: Serverless PostgreSQL database
- **Cloudinary**: Image storage and transformation
- **Google Gemini API**: AI text generation
- **Clipdrop API**: AI image generation

---

## Features

### 1. **Article Generation**
   - Generate full-length articles from prompts
   - Configurable article length (max_tokens)
   - Saves generated content to database
   - Free tier: 10 uses, Premium: Unlimited

### 2. **Blog Title Generation**
   - Generate creative blog titles from topics
   - Quick generation with optimized token usage
   - Free tier: 10 uses, Premium: Unlimited

### 3. **Image Generation**
   - Text-to-image generation using Clipdrop API
   - Images stored in Cloudinary
   - Option to publish to community
   - Premium feature only

### 4. **Background Removal**
   - Remove backgrounds from uploaded images
   - Uses Cloudinary's AI background removal
   - Premium feature only

### 5. **Object Removal**
   - Remove specific objects from images
   - Uses Cloudinary's generative AI
   - Premium feature only

### 6. **Resume Review**
   - Upload PDF resume for AI review
   - Extracts text from PDF
   - Provides constructive feedback
   - File size limit: 5MB
   - Premium feature only

### 7. **User Dashboard**
   - View all user creations
   - Track total creations count
   - Display active subscription plan
   - Recent creations timeline

### 8. **Community Features**
   - Browse published creations
   - Like/unlike creations
   - Community feed of shared content

### 9. **Subscription Management**
   - Free tier with 10 usage limit
   - Premium tier with unlimited access
   - Usage tracking via Clerk metadata
   - Plan-based feature access

---

## Project Structure

```
QuickAI-Full-Stack/
│
├── client/                          # Frontend Application
│   ├── public/                      # Static assets
│   │   ├── favicon.svg
│   │   ├── gradientBackground.png
│   │   └── vite.svg
│   ├── src/
│   │   ├── assets/                  # Images, icons, assets
│   │   │   ├── ai_gen_img_*.png
│   │   │   ├── logo.svg
│   │   │   ├── profile_img_*.png
│   │   │   └── assets.js
│   │   ├── components/              # Reusable React components
│   │   │   ├── AiTools.jsx         # AI tools showcase
│   │   │   ├── CreationItem.jsx    # Creation display card
│   │   │   ├── Footer.jsx          # Footer component
│   │   │   ├── Hero.jsx            # Hero section
│   │   │   ├── Navbar.jsx          # Navigation bar
│   │   │   ├── Plan.jsx            # Pricing plans
│   │   │   ├── Sidebar.jsx         # Dashboard sidebar
│   │   │   └── Testimonial.jsx     # Testimonials section
│   │   ├── pages/                  # Page components
│   │   │   ├── Home.jsx            # Landing page
│   │   │   ├── Layout.jsx          # Protected layout wrapper
│   │   │   ├── Dashboard.jsx       # User dashboard
│   │   │   ├── WriteArticle.jsx    # Article generation page
│   │   │   ├── BlogTitles.jsx      # Blog title generation
│   │   │   ├── GenerateImages.jsx  # Image generation
│   │   │   ├── RemoveBackground.jsx # Background removal
│   │   │   ├── RemoveObject.jsx    # Object removal
│   │   │   ├── ReviewResume.jsx    # Resume review
│   │   │   └── Community.jsx       # Community feed
│   │   ├── App.jsx                 # Main app component
│   │   ├── main.jsx                # Entry point
│   │   └── index.css               # Global styles
│   ├── index.html                  # HTML template
│   ├── package.json                # Frontend dependencies
│   ├── vite.config.js              # Vite configuration
│   ├── eslint.config.js            # ESLint configuration
│   └── vercel.json                 # Vercel deployment config
│
├── server/                          # Backend Application
│   ├── configs/                    # Configuration files
│   │   ├── cloudinary.js           # Cloudinary setup
│   │   ├── db.js                   # Database connection
│   │   └── multer.js               # File upload config
│   ├── controllers/                # Request handlers
│   │   ├── aiController.js         # AI feature controllers
│   │   └── userController.js      # User feature controllers
│   ├── middlewares/                # Express middlewares
│   │   └── auth.js                 # Authentication middleware
│   ├── routes/                     # API routes
│   │   ├── aiRoutes.js             # AI endpoints
│   │   └── userRoutes.js           # User endpoints
│   ├── server.js                   # Express server entry point
│   ├── package.json                # Backend dependencies
│   └── vercel.json                 # Vercel deployment config
│
├── SETUP.md                        # Setup instructions
├── START_SERVERS.bat               # Windows startup script
└── PROJECT_REPORT.md               # This file
```

---

## API Documentation

### Base URL
- **Development**: `http://localhost:3000`
- **Production**: Configure via environment variables

### Authentication
All protected routes require Clerk authentication token in the header:
```
Authorization: Bearer <clerk_token>
```

### AI Routes (`/api/ai`)

#### 1. Generate Article
- **Endpoint**: `POST /api/ai/generate-article`
- **Auth**: Required
- **Body**:
  ```json
  {
    "prompt": "string",
    "length": number
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "content": "generated article text"
  }
  ```
- **Limits**: Free (10 uses), Premium (unlimited)

#### 2. Generate Blog Title
- **Endpoint**: `POST /api/ai/generate-blog-title`
- **Auth**: Required
- **Body**:
  ```json
  {
    "prompt": "topic or description"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "content": "generated blog titles"
  }
  ```
- **Limits**: Free (10 uses), Premium (unlimited)

#### 3. Generate Image
- **Endpoint**: `POST /api/ai/generate-image`
- **Auth**: Required (Premium only)
- **Body**:
  ```json
  {
    "prompt": "image description",
    "publish": boolean
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "content": "cloudinary_image_url"
  }
  ```

#### 4. Remove Image Background
- **Endpoint**: `POST /api/ai/remove-image-background`
- **Auth**: Required (Premium only)
- **Content-Type**: `multipart/form-data`
- **Body**: `image` (file)
- **Response**:
  ```json
  {
    "success": true,
    "content": "cloudinary_image_url"
  }
  ```

#### 5. Remove Image Object
- **Endpoint**: `POST /api/ai/remove-image-object`
- **Auth**: Required (Premium only)
- **Content-Type**: `multipart/form-data`
- **Body**:
  - `image` (file)
  - `object` (string) - object to remove
- **Response**:
  ```json
  {
    "success": true,
    "content": "cloudinary_image_url"
  }
  ```

#### 6. Resume Review
- **Endpoint**: `POST /api/ai/resume-review`
- **Auth**: Required (Premium only)
- **Content-Type**: `multipart/form-data`
- **Body**: `resume` (PDF file, max 5MB)
- **Response**:
  ```json
  {
    "success": true,
    "content": "resume review feedback"
  }
  ```

### User Routes (`/api/user`)

#### 1. Get User Creations
- **Endpoint**: `GET /api/user/get-user-creations`
- **Auth**: Required
- **Response**:
  ```json
  {
    "success": true,
    "creations": [...]
  }
  ```

#### 2. Get Published Creations
- **Endpoint**: `GET /api/user/get-published-creations`
- **Auth**: Required
- **Response**:
  ```json
  {
    "success": true,
    "creations": [...]
  }
  ```

#### 3. Toggle Like Creation
- **Endpoint**: `POST /api/user/toggle-like-creation`
- **Auth**: Required
- **Body**:
  ```json
  {
    "id": "creation_id"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Creation Liked" | "Creation Unliked"
  }
  ```

---

## Database Schema

### `creations` Table
Stores all user-generated content and creations.

```sql
CREATE TABLE creations (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    prompt TEXT,
    content TEXT NOT NULL,
    type VARCHAR(50) NOT NULL,  -- 'article', 'blog-title', 'image', 'resume-review'
    publish BOOLEAN DEFAULT false,
    likes TEXT[] DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Fields**:
- `id`: Primary key (auto-increment)
- `user_id`: Clerk user ID
- `prompt`: User input/prompt
- `content`: Generated content or image URL
- `type`: Type of creation
- `publish`: Whether published to community
- `likes`: Array of user IDs who liked
- `created_at`: Creation timestamp

---

## Authentication & Authorization

### Authentication Provider: Clerk
- **Frontend**: `@clerk/clerk-react` for UI components
- **Backend**: `@clerk/express` for middleware

### Authentication Flow
1. User signs in via Clerk UI
2. Clerk provides JWT token
3. Frontend includes token in API requests
4. Backend validates token via Clerk middleware
5. User metadata extracted for plan/usage tracking

### Authorization Levels

#### Free Tier
- 10 uses total for article/blog title generation
- Usage tracked in Clerk `privateMetadata.free_usage`
- No access to premium features

#### Premium Tier
- Unlimited usage
- Access to all features:
  - Image generation
  - Background removal
  - Object removal
  - Resume review
- Plan checked via `has({plan: 'premium'})`

### Middleware (`server/middlewares/auth.js`)
- Extracts user ID from Clerk token
- Checks premium plan status
- Tracks free usage count
- Attaches plan and usage to request object

---

## Environment Configuration

### Server Environment Variables (`.env` in `server/`)

```env
# Clerk Authentication
CLERK_SECRET_KEY=sk_test_...

# Database (Neon PostgreSQL)
DATABASE_URL=postgresql://user:password@host/database

# Cloudinary Image Storage
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# AI Services
GEMINI_API_KEY=your_gemini_api_key_here
CLIPDROP_API_KEY=your_clipdrop_api_key_here

# Server Configuration
PORT=3000
```

### Client Environment Variables (`.env` in `client/`)

```env
# Clerk Authentication (Publishable Key)
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...

# Backend API URL
VITE_BASE_URL=http://localhost:3000
```

### API Key Sources
1. **Clerk**: https://clerk.com
2. **Neon Database**: https://neon.tech
3. **Cloudinary**: https://cloudinary.com
4. **Gemini API**: https://makersuite.google.com/app/apikey
5. **Clipdrop API**: https://clipdrop.co/api

---

## Key Components

### Frontend Components

#### 1. **Layout.jsx**
- Protected route wrapper
- Handles authentication state
- Provides sidebar navigation
- Responsive mobile menu

#### 2. **Dashboard.jsx**
- User's main dashboard
- Displays creation statistics
- Shows recent creations
- Plan status indicator

#### 3. **Home.jsx**
- Landing page
- Hero section
- AI tools showcase
- Testimonials
- Pricing plans
- Footer

#### 4. **CreationItem.jsx**
- Displays individual creation
- Shows creation type, content preview
- Handles image/text display
- Timestamp display

#### 5. **Sidebar.jsx**
- Navigation menu
- Links to all AI tools
- Community access
- User profile integration

### Backend Components

#### 1. **aiController.js**
- `generateArticle()`: Article generation logic
- `generateBlogTitle()`: Blog title generation
- `generateImage()`: Image generation via Clipdrop
- `removeImageBackground()`: Background removal
- `removeImageObject()`: Object removal
- `resumeReview()`: PDF parsing and review

#### 2. **userController.js**
- `getUserCreations()`: Fetch user's creations
- `getPublishedCreations()`: Community feed
- `toggleLikeCreation()`: Like/unlike functionality

#### 3. **auth.js Middleware**
- Validates Clerk authentication
- Checks subscription plan
- Tracks free usage
- Attaches user context to requests

---

## Dependencies

### Frontend Dependencies
```json
{
  "@clerk/clerk-react": "^5.32.3",
  "@tailwindcss/vite": "^4.1.11",
  "axios": "^1.10.0",
  "lucide-react": "^0.525.0",
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "react-hot-toast": "^2.5.2",
  "react-markdown": "^10.1.0",
  "react-router-dom": "^7.6.3",
  "tailwindcss": "^4.1.11"
}
```

### Backend Dependencies
```json
{
  "@clerk/express": "^1.7.4",
  "@neondatabase/serverless": "^1.0.1",
  "axios": "^1.10.0",
  "cloudinary": "^2.7.0",
  "cors": "^2.8.5",
  "dotenv": "^17.0.1",
  "express": "^5.1.0",
  "multer": "^2.0.1",
  "openai": "^5.8.2",
  "pdf-parse": "^1.1.1"
}
```

### Dev Dependencies
- **Frontend**: ESLint, Vite plugins, TypeScript types
- **Backend**: Nodemon for development

---

## Setup & Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database (Neon recommended)
- API keys for all services

### Installation Steps

1. **Clone the repository** (if applicable)

2. **Install server dependencies**:
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**:
   ```bash
   cd client
   npm install
   ```

4. **Configure environment variables**:
   - Create `.env` in `server/` directory
   - Create `.env` in `client/` directory
   - Add all required variables (see Environment Configuration)

5. **Set up database**:
   - Create PostgreSQL database on Neon
   - Create `creations` table (see Database Schema)
   - Update `DATABASE_URL` in server `.env`

6. **Run the application**:

   **Option 1: Using batch file (Windows)**
   ```bash
   .\START_SERVERS.bat
   ```

   **Option 2: Manual start**
   ```bash
   # Terminal 1 - Server
   cd server
   npm run server

   # Terminal 2 - Client
   cd client
   npm run dev
   ```

7. **Access the application**:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

---

## Deployment Configuration

### Vercel Configuration

Both `client/` and `server/` directories contain `vercel.json` for deployment configuration.

### Deployment Considerations
- Environment variables must be set in deployment platform
- Database connection string for production
- CORS configuration for production domain
- File upload limits
- API rate limiting (recommended)

---

## Usage Guide

### For End Users

1. **Sign Up/Sign In**: Use Clerk authentication
2. **Free Tier**: Limited to 10 article/blog title generations
3. **Upgrade to Premium**: Access all features
4. **Generate Content**: Use various AI tools from sidebar
5. **View Dashboard**: See all your creations
6. **Community**: Browse and like published creations

### For Developers

1. **API Integration**: Use provided endpoints with Clerk tokens
2. **Custom Features**: Extend controllers in `server/controllers/`
3. **UI Components**: Modify React components in `client/src/components/`
4. **Styling**: Use Tailwind CSS classes
5. **Database**: Query via Neon serverless client

---

## Security Features

1. **Authentication**: Clerk JWT-based authentication
2. **Authorization**: Plan-based feature access
3. **File Upload Limits**: 5MB limit for resume uploads
4. **Environment Variables**: Sensitive data in `.env` files
5. **CORS**: Configured for cross-origin requests
6. **Input Validation**: Server-side validation (recommended to enhance)
7. **SQL Injection Protection**: Parameterized queries via Neon client

### Security Recommendations
- Add rate limiting
- Implement input sanitization
- Add request validation middleware
- Implement file type validation
- Add error handling for sensitive information
- Use HTTPS in production
- Implement API key rotation

---

## Future Enhancements

### Potential Features
1. **User Profiles**: Enhanced user profile pages
2. **Comments System**: Comments on published creations
3. **Export Functionality**: Download creations as PDF/Markdown
4. **Templates**: Pre-built prompts and templates
5. **History & Versioning**: Version history for creations
6. **Analytics Dashboard**: Usage analytics for users
7. **Batch Processing**: Process multiple items at once
8. **API Rate Limiting**: Prevent abuse
9. **Webhook Support**: Real-time updates
10. **Mobile App**: React Native version
11. **Admin Panel**: Content moderation and user management
12. **Payment Integration**: Stripe/PayPal for subscriptions
13. **Email Notifications**: Creation completion emails
14. **Search Functionality**: Search creations and community
15. **Tags & Categories**: Organize creations

### Technical Improvements
1. **TypeScript Migration**: Add type safety
2. **Unit Tests**: Jest/Vitest test suite
3. **E2E Tests**: Playwright/Cypress tests
4. **CI/CD Pipeline**: Automated testing and deployment
5. **Error Monitoring**: Sentry integration
6. **Performance Optimization**: Caching, lazy loading
7. **Database Indexing**: Optimize queries
8. **API Documentation**: Swagger/OpenAPI docs
9. **GraphQL Support**: Alternative to REST
10. **WebSocket**: Real-time features

---

## Conclusion

QuickAI is a well-structured full-stack application that demonstrates modern web development practices. It integrates multiple third-party services, implements a subscription model, and provides a comprehensive set of AI-powered features. The codebase is organized, modular, and ready for further development and scaling.

### Project Strengths
- ✅ Clean architecture and separation of concerns
- ✅ Modern tech stack
- ✅ Comprehensive feature set
- ✅ Good use of third-party services
- ✅ Responsive UI design
- ✅ Authentication and authorization

### Areas for Improvement
- ⚠️ Add input validation and sanitization
- ⚠️ Implement comprehensive error handling
- ⚠️ Add unit and integration tests
- ⚠️ Implement rate limiting
- ⚠️ Add API documentation (Swagger)
- ⚠️ Enhance security measures
- ⚠️ Add logging and monitoring

---


