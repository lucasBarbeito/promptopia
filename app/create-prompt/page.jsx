"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Router, useRouter } from "next/navigation";

import Form from "@components/Form";

const CreatePrompt = () => {

  const router = useRouter()
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const createPrompt = async (event) => {
    // Con esto lo que hacemos es prevenir del comportamoiento default del browser, al enviar un form, que seria hacer un reload
    event.preventDefault();
    setSubmitting(true);
    try{

      const response = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user._id,
          tag: post.tag
        })
      })

      if (response.ok){
        router.push('/')
      }

    }catch(error){
      console.log(error);
    }finally{
      setSubmitting(false)
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
