import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { clerkMiddleware, requireAuth } from '@clerk/express'
import aiRouter from './routes/aiRoutes.js';
import connectCloudinary from './configs/cloudinary.js';
import userRouter from './routes/userRoutes.js';

const app = express()

// Check for required environment variables
const requiredEnvVars = {
    'CLERK_SECRET_KEY': process.env.CLERK_SECRET_KEY,
    'CLOUDINARY_CLOUD_NAME': process.env.CLOUDINARY_CLOUD_NAME,
    'CLOUDINARY_API_KEY': process.env.CLOUDINARY_API_KEY,
    'CLOUDINARY_API_SECRET': process.env.CLOUDINARY_API_SECRET,
    'DATABASE_URL': process.env.DATABASE_URL,
};

const missingVars = Object.entries(requiredEnvVars)
    .filter(([key, value]) => !value)
    .map(([key]) => key);

if (missingVars.length > 0) {
    console.error('❌ Missing required environment variables:');
    missingVars.forEach(v => console.error(`   - ${v}`));
    console.error('\n📝 Please create a .env file in the server/ directory.');
    console.error('   See SETUP.md for instructions.\n');
    // Continue anyway for development, but features may not work
}

// Try to connect Cloudinary, but don't fail if env vars are missing
try {
    if (process.env.CLOUDINARY_CLOUD_NAME) {
        await connectCloudinary();
        console.log('✅ Cloudinary connected');
    } else {
        console.warn('⚠️  Cloudinary not configured (image features will not work)');
    }
} catch (error) {
    console.warn('⚠️  Cloudinary connection failed:', error.message);
}

app.use(cors())
app.use(express.json())

// Only use Clerk middleware if secret key is present
if (process.env.CLERK_SECRET_KEY) {
    app.use(clerkMiddleware())
    console.log('✅ Clerk middleware enabled');
} else {
    console.warn('⚠️  Clerk not configured (authentication will not work)');
}

app.get('/', (req, res)=>res.send('Server is Live!'))

// Only require auth if Clerk is configured
if (process.env.CLERK_SECRET_KEY) {
    app.use(requireAuth())
    app.use('/api/ai', aiRouter)
    app.use('/api/user', userRouter)
} else {
    console.warn('⚠️  API routes disabled (Clerk authentication required)');
    app.get('/api/status', (req, res) => res.json({ 
        status: 'Server running but authentication not configured',
        message: 'Please set CLERK_SECRET_KEY in .env file'
    }));
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`\n🚀 Server is running on port ${PORT}`);
    console.log(`   http://localhost:${PORT}\n`);
    if (missingVars.length > 0) {
        console.log('⚠️  Server started with missing configuration.');
        console.log('   Some features may not work properly.\n');
    }
})