"use client"
import Image from "next/image";
import { Router, useRouter } from "next/navigation";


const NotFound = () => {
    const router = useRouter()

    return (
        <div
            class="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
            <div class="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
                <div class="relative">
                    <div class="absolute">
                        <div class="">
                            <h1 class="my-2 text-gray-800 font-bold text-2xl">
                                It seems like this page cannot be found. However,
                                to brighten your day and not let you leave empty-handed, here's a picture of Messi holding the World Cup
                            </h1>
                            <button
                                class="sm:w-full lg:w-auto my-2 border rounded md py-4 px-8 text-center bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50"
                                onClick={() => {router.push('/')} }
                                >
                                Go back to home page
                            </button>
                        </div>
                    </div>
                    <div>
                        <img src="https://i.ibb.co/G9DC8S0/404-2.png"/>
                    </div>
                </div>
            </div>
            <div>
                <Image src="/assets/images/MessiChiquito.jpg" width={400} height={500} alt="Messi_chiquito"/>
            </div>
        </div>
    )

}


export default NotFound