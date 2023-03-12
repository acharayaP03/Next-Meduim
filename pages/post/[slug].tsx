
import  { sanityClient, urlFor } from "../../sanity";
import {Posts} from "../../typings";
import {GetStaticProps} from "next";
import Navigation from "../../components/Navigation";
import PortableText from "react-portable-text";

interface Props {
    post: Posts
}


interface Text extends {

}



/**
 * this built in function will allow next js to prebuild the path when next js loads
 */

export const getStaticPaths = async () => {
    const query = `
        *[_type == "post"]{
          _id,
            slug{
              current
            }
        }
    `;

    const posts = await sanityClient.fetch(query);

    // retrieve params from posts
    const paths = posts.map((post: Posts) => ({
        params: {
            slug: post.slug.current
        }
    }))
    return{
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) =>{
    const query = `
        *[_type == "post" && slug.current == $slug][0]{
          _id,
            _createdAt,
            title,
            author -> {
              name,
              image
            },
            description,
            mainImage,
            slug,
            body
        }
    `;

    const post = await sanityClient.fetch(query ,{
        slug: params?.slug
    });

    if(!post){
        return {
            notFound: true
        }
    };

    return {
        props: {
            post
        },
        revalidate: 60 // updates cache every 60 seconds,
    }
}

export default function Post ({ post }: Props) {

    return (
            <>
                <div className="border-black border-b-[1px] sticky">
                    <Navigation />
                </div>
                <main className="max-w-7xl mx-auto mt-[80px]">
                    <img src={urlFor(post.mainImage).url()} alt="banner image" className="w-full h-[700px] object-cover"/>
                    <div>
                        <h1 className="mt-10 text-[32px]">{ post.title }</h1>
                    </div>
                    <div className="flex items-center space-x-5 mt-2">
                        <img src={urlFor(post.author.image).url()} alt="author image" className="h-12 w-12 rounded-full"/>
                        <p className="text-sm font-extralight">Posted by <span className="text-gray-600">{ post.author.name }</span> Publised at { new Date(post._createdAt).toLocaleString()}</p>
                    </div>

                    <h3 className="text-gray-400 text-[18px] font-light mt-6">{ post.description }</h3>

                    <div>
                        <PortableText

                        />
                    </div>
                </main>
            </>
    )
}

