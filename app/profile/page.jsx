"use client"

import {useState, useEffect} from "react";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import Profile from "@components/Profile";
import {session} from "@node_modules/next-auth/core/routes";
import {data} from "@node_modules/autoprefixer";

const MyProfile = () => {
    // data rename to session
    const {data: session} = useSession()
    const [posts, setPosts] = useState([])
    const router = useRouter()
    const handleEdit = (post) => {
        router.push(`update-prompt?id=${post._id}`)
    }

    const handleDelete = async (post) => {
        const hasConfirmed = confirm("Are you sure that you want to delete this post?")

        if (hasConfirmed) {
            try {
                await fetch(`api/prompt/${post._id.toString()}`, {
                    method: 'DELETE'
                })

                const filteredPosts = posts.filter((filteredPost) => filteredPost._id !== post._id)

                setPosts(filteredPosts)

            } catch (e) {
                console.log(e)
            }
        }

    }

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`)
            const data = await response.json()

            setPosts(data)
        }


        if (session?.user.id) fetchPosts()
    }, [])
    return (
        <Profile
            name="My"
            desc="Welcome to your personalized profile page"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfile