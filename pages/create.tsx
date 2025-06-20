import React, { useState } from "react"
import Layout from "../components/Layout"
import Router from "next/router"
import { useSession } from "next-auth/react"

const Draft: React.FC = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const { data: session } = useSession()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")
    
    try {
      const body = { title, content }
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      
      if (response.ok) {
        await Router.push("/drafts")
      } else {
        const errorData = await response.json()
        setError(errorData.error || "Failed to create post")
      }
    } catch (error) {
      setError("Network error occurred")
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!session) {
    return (
      <Layout>
        <div>
          <h1>Access Denied</h1>
          <p>You need to be logged in to create a post.</p>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div>
        <form onSubmit={submitData}>
          <h1>New Draft</h1>
          {error && (
            <div className="error">
              {error}
            </div>
          )}
          <input
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            type="text"
            value={title}
          />
          <textarea
            cols={50}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            rows={8}
            value={content}
          />
          <input 
            disabled={!content || !title || isSubmitting} 
            type="submit" 
            value={isSubmitting ? "Creating..." : "Create"} 
          />
          <a className="back" href="#" onClick={() => Router.push("/")}>
            or Cancel
          </a>
        </form>
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type="text"],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type="submit"] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }

        .error {
          background: #ffebee;
          color: #c62828;
          padding: 1rem;
          border-radius: 0.25rem;
          margin: 0.5rem 0;
          border: 1px solid #ef5350;
        }
      `}</style>
    </Layout>
  )
}

export default Draft