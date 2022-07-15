import React, { useEffect, useState } from "react"
//import { Link } from "react-router-dom"
import sanityClient from "../Client.js"
import createImageUrlBuilder from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react"


const builder = createImageUrlBuilder(sanityClient);

function urlFor(source) {
    return builder.image(source)
}

export default function About() {
        const [authorData, setAuthor] = useState(null);

        useEffect(() => {
            sanityClient
                .fetch(`*[_type == "author"]{
                   name,
                   slug,
                   bio,
                   image{
                        asset->{
                            _id,
                            url
                        },
                        alt
                    }
                }`
            )
            .then((data) => setAuthor(data))
            .catch(console.error)
        }, []);

        return (
            <main className="p-12 overflow-auto">
                <section className="container mx-auto">
                {authorData && authorData.map((author, index) => (
                    <article className="relative rounded-lg shadow-xl bg-white p-16">
                        <h1 className="cursive text-6xl flex align-center justify-center">{author.name}</h1>
                        <img 
                            src={urlFor(author.image).width(200).url()}
                            alt={author.name}
                            className="rounded-full"
                        />
                        <div className="px-16 lg:px-48 py-12 lg:py-20 prose lg:prose-xl max-w-full">
                        <BlockContent className="prose"
                        blocks={author.bio}
                        projectId="7qz818p3"
                        dataset="production"
                        />
                        </div>
                    </article>
                    ))}
                </section>
            </main>
        )
    }