import {connectToDB} from "@utils/database"
import Prompt from "@models/prompt";

export const GET  = async (request, {params}) => {

    try {
        await connectToDB()
        // Aca el params funciona medio como en rails, donde se cargan por asi decirse si tenemos una ruta dinamica
        // que vendria a ser el id en este caso. Despues en el punto find, tambien funciona parecido a rails donde en vez de
        // tener el find_by() aca es solo find.
        const prompts = await Prompt.find({creator: params.id}).populate('creator');

        return new Response(JSON.stringify(prompts), {status: 200})
    } catch (error) {
        return new Response(JSON.stringify(error), {status: 500})

    }
}