import React from "react"
import { GetServerSideProps } from "next"
import ReactMarkdown from "react-markdown"
import Router from "next/router"
import Layout from "../../components/Layout"
import { PostProps } from "../../components/Post"
import prisma from "../../lib/prisma"

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  })
  return {
    props: JSON.parse(JSON.stringify(post)),
  }
}

const Post: React.FC<PostProps> = (props) => {
  let title = props.title
  if (!props.published) {
    title = `${title} (Draft)`
  }

  async function publishPost(id: string): Promise<void> {
    await fetch(`/api/posts/${id}`, {
      method: "PUT",
    })
    await Router.push("/")
  }

  async function deletePost(id: string): Promise<void> {
    await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    })
    await Router.push("/")
  }

  return (
    <Layout>
      <div>
        <h2>{title}</h2>
        <p>By {props?.author?.name || "Unknown author"}</p>
        <ReactMarkdown children={props.content} />
        {!props.published && (
          <div className="actions">
            <button onClick={() => publishPost(props.id)}>Publish</button>
            <button onClick={() => deletePost(props.id)}>Delete</button>
          </div>
        )}
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  )
}

export default Post
