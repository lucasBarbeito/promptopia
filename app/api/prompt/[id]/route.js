import {connectToDB} from "@utils/database"
import Prompt from "@models/prompt";
import {request} from "@node_modules/mongodb/src/utils";


// GET
export const GET = async (request, {params}) => {

    try {
        await connectToDB()

        const prompt = await Prompt.findById(params.id).populate('creator');

        if (!prompt) {
            return new Response("Prompt not Found", {status: 404})

        } else {
            return new Response(JSON.stringify(prompt), {status: 200})
        }
    } catch (error) {
        return new Response(JSON.stringify(error), {status: 500})

    }
}

// PATCH
export const PATCH = async (request, {params}) => {

    const {prompt, tag} = await request.json()

    try {
        await connectToDB();
        const exisitingPrompt = await Prompt.findById(params.id);

        if(!exisitingPrompt) return new Response("Prompt not found" , {status: 404})

        exisitingPrompt.prompt = prompt
        exisitingPrompt.tag = tag

        await exisitingPrompt.save()

        return new Response(JSON.stringify(exisitingPrompt), {status: 200})

    } catch (error) {

        return new Response(JSON.stringify(error), {status: 500})

    }

}

// DELETE
export const DELETE = async (request, {params}) => {
    try {
        await connectToDB()
        await Prompt.findByIdAndDelete(params.id)

        return new Response("Prompt deleted succesfully", {status: 200})

    }catch (error) {
        return new Response("Failed to delete Prompt", {status: 500})

    }
}