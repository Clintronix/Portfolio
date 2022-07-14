import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import sanityClient from "../Client.js"


export default function Post() {
        const [postData, setPost] = useState(null);

        useEffect(() => {
            sanityClient
                .fetch(`*[_type == "post"] | order(_createdAt desc){
                    title,
                    slug,
                    publishedAt,
                    mainImage{
                        asset->{
                            _id,
                            url
                        },
                        alt
                    }
                }`
            )
            .then((data) => setPost(data))
            .catch(console.error)
        }, []);

        return (
            <main className="p-12">
                <section className="container mx-auto">
                    <div></div>
                    <h1 className="text-6xl cursive flex justify-center brdr">
                        Recent research:
                    </h1>
                    <h2 className="text-lg text-gray-600 flex justify-center mb-12">
                        Here's what I have been working on!
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 p-12">
                        {postData && postData.map((post, index) => (
                        <article className="mr-10 mb-16">

                            <p>{new Date(post.publishedAt).toLocaleDateString()}</p>
                            <Link to={"/post/" + post.slug.current} key={post.slug.current}>
                                <span className="block h-64 realtive rounded shadow leading-snug bg-white border-l-8 border-green-400 -z-1" key={index}>
                                    <img 
                                        src={post.mainImage.asset.url}
                                        alt={post.mainImage.alt}
                                        className="w-full h-full rounded-r object-cover"
                                    />
                                    <span className="relative flex justify-end items-end pr-4 pb-4">
                                        <h3 className="text-sm text-gray-800 px-3 py-4 bg-red-700 text-red-100 bg-opacity-75 rounded">{post.title}</h3>
                                    </span>
                                </span>
                            </Link>
                        </article>
                        ))}
                    </div>
                </section>
            </main>
        )
    }