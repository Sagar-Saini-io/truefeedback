TrueFeedback
TrueFeedback is a full-stack web application designed to provide a platform for anonymous feedback. Users can sign up, create a unique profile link, and receive messages from others without revealing the sender's identity. The application leverages AI to suggest messages, enhancing the user experience.

Features
Anonymous Messaging: Send and receive feedback without revealing identities.

User Authentication: Secure sign-up and sign-in process.

OTP Verification: Email-based One-Time Password (OTP) verification for account security.

Personalized Profile Links: Each user gets a unique public link to share for receiving messages.

AI-Powered Message Suggestions: Utilize AI to generate insightful and engaging message prompts.

Dashboard: Manage received messages, toggle message acceptance, and copy your unique link.

Responsive Design: Optimized for various screen sizes (mobile, tablet, desktop).

Technologies Used
TrueFeedback is built as a full-stack MERN application, utilizing a powerful combination of modern web technologies:

Frontend:

Next.js 15.3.4: A React framework for building fast, scalable, and SEO-friendly web applications.

React 19: A JavaScript library for building user interfaces.

Shadcn/ui: A collection of reusable components built with Radix UI and Tailwind CSS, providing a beautiful and accessible UI.

Zod: A TypeScript-first schema declaration and validation library, used for robust form validation.

React Hook Form: A performant, flexible, and extensible forms library for React, integrated with Zod for validation.

Tailwind CSS 4: A utility-first CSS framework for rapidly building custom designs.

Lucide React: A collection of beautiful and customizable open-source icons.

Embla Carousel React: A lightweight, dependency-free, and flexible carousel library.

Motion: A production-ready animation library for React.

Sonner: A toast library for displaying notifications.

Backend:

Node.js: JavaScript runtime environment.

Express.js (implied by MERN stack): A fast, unopinionated, minimalist web framework for Node.js.

MongoDB: A NoSQL database for flexible data storage.

Mongoose: An ODM (Object Data Modeling) library for MongoDB and Node.js.

NextAuth.js (Auth.js): Flexible authentication for Next.js applications, supporting various authentication strategies.

Bcryptjs: A library for hashing passwords securely.

Axios: Promise-based HTTP client for the browser and Node.js.

Resend: For sending transactional emails, specifically for OTP verification.

OpenAI / @ai-sdk/openai: Integration with AI models for generating message suggestions.

Development Tools:

TypeScript 5: A superset of JavaScript that adds static typing.

ESLint 9: For linting and maintaining code quality.

Turbopack: A faster-than-Webpack bundler for Next.js development.

Getting Started
Follow these steps to set up and run the TrueFeedback project locally.

Prerequisites
Node.js (v18 or higher recommended)

npm or yarn

MongoDB Atlas account (or local MongoDB instance)

Resend API Key

OpenAI API Key

Installation
Clone the repository:

git clone https://github.com/Sagar-Saini-io/TrueFeedback.git
cd TrueFeedback

Install dependencies:

npm install

# or

yarn install

Set up environment variables:
Create a .env.local file in the root of your project and add the following environment variables:

MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=a_long_random_string_for_nextauth_security
NEXTAUTH_URL=http://localhost:3000

RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=your_verified_resend_email_address # e.g., onboarding@yourdomain.com

OPENAI_API_KEY=your_openai_api_key

# If using a specific OpenAI model, you might also need:

# OPENAI_MODEL=gpt-4o

MONGODB_URI: Your MongoDB connection string (e.g., from MongoDB Atlas).

NEXTAUTH_SECRET: Generate a strong random string (e.g., using openssl rand -base64 32).

NEXTAUTH_URL: The URL where your application will run (for local development, it's usually http://localhost:3000).

RESEND_API_KEY: Your API key from Resend for sending emails.

EMAIL_FROM: A verified email address in your Resend account that will be used as the sender.

OPENAI_API_KEY: Your API key for OpenAI.

Running the Development Server
npm run dev

# or

yarn dev

Open http://localhost:3000 in your browser to see the application.

Building for Production
npm run build

# or

yarn build

This command will create an optimized production build of your application in the .next folder.

Running the Production Server
npm start

# or

yarn start

This will run the compiled production build.

Project Structure (Conceptual)
.
├── public/ # Static assets (images, favicon)
├── src/
│ ├── app/ # Next.js App Router pages and layouts
│ │ ├── api/ # API routes (for backend logic)
│ │ │ ├── auth/ # Authentication routes (NextAuth.js)
│ │ │ └── messages/ # API for sending/receiving messages
│ │ ├── (auth)/ # Authentication related pages (e.g., sign-in, sign-up)
│ │ ├── (dashboard)/ # User dashboard pages
│ │ ├── u/[username]/ # Public profile pages for receiving messages
│ │ └── layout.tsx # Root layout
│ ├── components/ # Reusable React components (Shadcn/ui, custom)
│ ├── lib/ # Utility functions, helpers (e.g., DB connection, AI logic)
│ ├── models/ # Mongoose schemas/models (e.g., User, Message)
│ ├── emails/ # React Email templates for OTP
│ ├── types/ # TypeScript type definitions
│ └── styles/ # Global styles, Tailwind CSS config
├── .env.local # Environment variables (local)
├── next.config.ts # Next.js configuration
├── package.json # Project dependencies and scripts
├── tsconfig.json # TypeScript configuration
└── README.md # This file
