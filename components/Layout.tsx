import React, { ReactNode } from "react";
import Header from "./Header";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {children}
    </main>
    
    {/* Footer */}
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">
            © 2025 BlogApp. Built with Next.js and Tailwind CSS.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
              Privacy
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
);

export default Layout;
