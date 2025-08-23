
# BUILT WITH CHATANDBUILD

# PPMKFriends

PPMKFriends is a modern social networking platform built with React, TypeScript, and Supabase. It provides a comprehensive social experience with features for connecting with friends, sharing content, and building communities.

## Features

- **User Authentication**: Secure login/signup with password change requirements for first-time users
- **Social Feed**: Share posts with text and images, view friends' updates
- **Communities**: Create and join communities around shared interests
- **Marketplace**: Buy and sell items within the platform
- **Events**: Create and attend events
- **Messaging**: Direct messaging between users
- **Broadcast**: Send announcements to your network
- **Notifications**: Real-time notifications for platform activities
- **Profile Management**: Customizable user profiles with avatars and bios
- **Admin Panel**: Administrative tools for platform management
- **Search**: Find and connect with other users
- **Dark/Light Theme**: Toggle between themes for better user experience

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Components**: Radix UI primitives with shadcn/ui
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **State Management**: React Query (TanStack Query)
- **Routing**: React Router DOM
- **Forms**: React Hook Form with Zod validation
- **Charts**: Recharts
- **Icons**: Lucide React

## Prerequisites

- Node.js 18 or higher
- npm or yarn package manager
- Supabase account and project

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ppmkfriends
```

2. Install dependencies:
```bash
npm install
```

3. Set up Supabase:
   - Create a new project at [supabase.com](https://supabase.com)
   - Copy your project URL and anon key
   - Run the migrations in the `supabase/migrations` folder

4. Configure environment variables:
   - Set up your Supabase configuration in `src/integrations/supabase/client.ts`

5. Start the development server:
```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   └── FeedItems/      # Feed-specific components
├── pages/              # Route components
├── hooks/              # Custom React hooks
├── integrations/       # Third-party integrations
│   └── supabase/       # Supabase client and types
├── lib/                # Utility functions
├── services/           # API services
└── utils/              # Helper utilities

supabase/
├── migrations/         # Database migrations
├── functions/          # Edge functions
└── config.toml        # Supabase configuration
```

## Database Schema

The application uses several main tables:
- `profiles` - User profile information
- `posts` - User posts and content
- `communities` - Community data
- `events` - Event information
- `marketplace_items` - Marketplace listings
- `notifications` - User notifications
- `messages` - Direct messages

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting: `npm run lint`
5. Submit a pull request

## License

This project is private and proprietary.

## Support

For support or questions, please contact the development team.