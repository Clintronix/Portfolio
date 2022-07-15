import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import sanityClient from "../Client.js"
import createImageUrlBuilder from "@sanity/image-url";
//import BlockContent from "@sanity/block-content-to-react"

import { Button, Tile } from 'carbon-components-react'


const builder = createImageUrlBuilder(sanityClient);

function urlFor(source) {
    return builder.image(source)
}

export default function Home() {
        const [heroData, setHero] = useState(null);

        useEffect(() => {
            sanityClient
                .fetch(`*[_type == "hero"]{
                title,
                   mainImage{
                        asset->{
                            _id,
                            url
                        },
                        alt
                    },
                    description,
                }`
            )
            .then((data) => setHero(data))
            .catch(console.error)
        }, []);

        return (
            <>{heroData && heroData.map((hero, index) => (
                <div className="hero flex items-center justify-center" 
                style={{
                    backgroundImage: 
                `url(` + urlFor(hero.mainImage).width(800).url() + `)`,
                    height:'500px',
                    width:'800px',
                    fontSize:'50px',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                }}>
                    <Tile className="h-96 w-96 flex items-center justify-center text-center">
                        <h3 className="p-4">{hero.title}</h3>
                <p className="p-8">{hero.description}</p>
                <Link to="/projects"><Button className="">Projects</Button></Link>
                    </Tile>
                </div>
                ))}
                </>
                
                
        )
    }
   

    