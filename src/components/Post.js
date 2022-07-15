import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import sanityClient from "../Client.js"
import { Button, Tile } from 'carbon-components-react'

import createImageUrlBuilder from "@sanity/image-url";


const builder = createImageUrlBuilder(sanityClient);

function urlFor(source) {
    return builder.image(source)
}


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
                    <h1 className="text-5xl cursive flex justify-center">
                        Recent research:
                    </h1>
                    <h2 className="text-lg text-gray-600 flex justify-center mb-12">
                        Here's what I have been working on!
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 p-12">
                        {postData && postData.map((post, index) => (
                        <Tile className="mr-10 mb-16">

                            <p>{new Date(post.publishedAt).toLocaleDateString()}</p>
                            <Link to={"/post/" + post.slug.current} key={post.slug.current}>
                                <span className="w-42 block h-64 realtive rounded shadow leading-snug bg-white border-l-8 border-green-400 md:w-auto" key={index}
                                style={{
                                    backgroundImage: 
                                `url(` + urlFor(post.mainImage).width(800).url() + `)`,
                                    height:'200px',
                                    fontSize:'50px',
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                }}>
                                    <Button className="">
                                        <h3 className="w-16 text-sm font-bold text-white lg:w-max">{post.title}</h3>
                                    </Button>
                                </span>
                            </Link>
                        </Tile>
                        ))}
                    </div>
                </section>
            </main>
        )
    }