# Scribe - Medium-Style Blogging Platform

A beautiful, modern blogging platform built with React, Apollo Client, and GraphQL.

## Features

- 📝 **Rich Article Editor** - Write and publish beautiful stories
- 🔐 **Authentication** - Secure user login and signup
- 📚 **Article Feed** - Browse and discover stories
- 👤 **User Profiles** - Manage your content
- 🎨 **Beautiful UI** - Sleek, Medium-inspired design
- ⚡ **GraphQL Integration** - Powered by Apollo Client

## Getting Started

### Prerequisites

- Node.js & npm installed
- GraphQL backend running (see backend setup below)

### Installation

1. Clone the repository:
```sh
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
```

2. Install dependencies:
```sh
npm install
```

3. Configure your GraphQL endpoint:
```sh
cp .env.example .env
```

Edit `.env` and set your GraphQL endpoint:
```
VITE_GRAPHQL_ENDPOINT=http://localhost:4000/graphql
```

4. Start the development server:
```sh
npm run dev
```

The app will be available at http://localhost:8080

## GraphQL Backend Setup

Your GraphQL backend should be running and accessible. The app expects these GraphQL operations:

### Queries
- `posts` - Get all posts
- `post(id: Int!)` - Get single post
- `userPosts(userId: Int!)` - Get user's posts
- `user(id: Int!)` - Get user details
- `currentUser` - Get current authenticated user

### Mutations
- `createUser(name: String!, email: String!, password: String!)` - Create new user
- `login(email: String!, password: String!)` - User login
- `createPost(title: String!, content: String!)` - Create new post
- `updatePost(id: Int!, title: String, content: String)` - Update post
- `deletePost(id: Int!)` - Delete post

## Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **GraphQL Client**: Apollo Client
- **Routing**: React Router v6
- **State Management**: React Query + Apollo Cache
- **Build Tool**: Vite

## Project Structure

```
src/
├── components/       # Reusable UI components
├── pages/           # Page components
├── lib/             # Utilities and configurations
│   ├── apollo.ts    # Apollo Client setup
│   ├── auth.ts      # Authentication utilities
│   └── graphql/     # GraphQL queries and mutations
└── hooks/           # Custom React hooks
```

## Deployment

This project can be deployed using Lovable's built-in deployment:

1. Click the "Publish" button in the Lovable editor
2. Your app will be deployed to a Lovable subdomain
3. Optionally connect a custom domain in Project Settings

## Environment Variables

- `VITE_GRAPHQL_ENDPOINT` - Your GraphQL API endpoint

## Contributing

This project was built with [Lovable](https://lovable.dev) - an AI-powered development platform.

## License

MIT
