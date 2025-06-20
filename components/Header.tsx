import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";

const Header: React.FC = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isActive = (pathname: string) => router.pathname === pathname;

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left navigation */}
          <div className="flex items-center space-x-8">
            <Link href="/">
              <a className="text-xl font-bold text-gray-900 hover:text-primary-600 transition-colors">
                BlogApp
              </a>
            </Link>
            
            <nav className="hidden md:flex space-x-6">
              <Link href="/">
                <a className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive("/")
                    ? "bg-primary-100 text-primary-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}>
                  Feed
                </a>
              </Link>
              {session && (
                <Link href="/drafts">
                  <a className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive("/drafts")
                      ? "bg-primary-100 text-primary-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}>
                    My Drafts
                  </a>
                </Link>
              )}
            </nav>
          </div>

          {/* Right navigation */}
          <div className="flex items-center space-x-4">
            {status === "loading" && (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600"></div>
                <span className="ml-2 text-sm text-gray-600">Loading...</span>
              </div>
            )}

            {!session && status !== "loading" && (
              <button
                onClick={() => signIn()}
                className="btn-primary"
              >
                Sign In
              </button>
            )}

            {session && (
              <div className="flex items-center space-x-4">
                <div className="hidden sm:flex items-center space-x-2">
                  {session.user?.image && (
                    <img
                      src={session.user.image}
                      alt="Profile"
                      className="h-8 w-8 rounded-full"
                    />
                  )}
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">{session.user?.name}</p>
                    <p className="text-gray-500 text-xs">{session.user?.email}</p>
                  </div>
                </div>
                
                <Link href="/create">
                  <a className="btn-primary">
                    New Post
                  </a>
                </Link>
                
                <button
                  onClick={() => signOut()}
                  className="btn-secondary"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
