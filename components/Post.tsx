import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type PostProps = {
  id: string;
  title: string;
  author: {
    name: string;
  } | null;
  content: string;
  published: boolean;
  createdAt?: string;
  updatedAt?: string;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author && post.author.name ? post.author.name : "Unknown author";
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const truncateContent = (content: string, maxLength: number = 200) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };

  return (
    <article 
      className="card p-6 cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
      onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}
    >
      {/* Status Badge */}
      <div className="flex items-center justify-between mb-4">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          post.published 
            ? "bg-green-100 text-green-800" 
            : "bg-yellow-100 text-yellow-800"
        }`}>
          {post.published ? "Published" : "Draft"}
        </span>
        {post.createdAt && (
          <time className="text-sm text-gray-500">
            {formatDate(post.createdAt)}
          </time>
        )}
      </div>

      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 hover:text-primary-600 transition-colors">
        {post.title}
      </h2>

      {/* Author */}
      <div className="flex items-center mb-4">
        <div className="flex-shrink-0">
          <div className="h-8 w-8 bg-primary-600 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-white">
              {authorName.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-900">
            {authorName}
          </p>
        </div>
      </div>

      {/* Content Preview */}
      <div className="prose prose-sm text-gray-600 mb-4">
        <ReactMarkdown>{truncateContent(post.content)}</ReactMarkdown>
      </div>

      {/* Read More */}
      <div className="flex items-center justify-between">
        <span className="text-primary-600 text-sm font-medium hover:text-primary-700 transition-colors">
          Read more →
        </span>
        {post.updatedAt && post.updatedAt !== post.createdAt && (
          <span className="text-xs text-gray-400">
            Updated {formatDate(post.updatedAt)}
          </span>
        )}
      </div>
    </article>
  );
};

export default Post;
