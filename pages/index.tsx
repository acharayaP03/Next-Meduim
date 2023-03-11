import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header'
import {sanityClient, urlFor} from "../sanity";
import {Posts} from "../typings";
import Link from "next/link";

interface Props {
    post: [Posts]
}
const Home = ({ post }: Props) => {
    console.log(post)
  return (
    <div>
      <Head>
        <title>Next Medium</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2">
            {
                post && post.length ?
                post.map( p => (
                    <Link href={`/post/${p.slug.current}`} key={p._id} className="border rounded-2xl">
                        <div className="group cursor-pointer overflow-hidden">
                            <img
                                src={urlFor(p.mainImage).url()!}
                                loading="lazy"
                                className="h-[400px]w-full object-cover overflow-hidden rounded-t-2xl group-hover:scale-105 transition-transform duration-300 ease-in-out "/>
                            <div className="flex justify-between p-2 overflow-hidden">

                                <div className="overflow-hidden">
                                    <h3 className="truncate font-bold text-gray-800">{p.title}</h3>
                                    <p className="mt-2">{p.description}</p>
                                    <p className="mt-2 flex justify-between items-center">
                                        <span className="text-gray-400">{ p.author.name}</span>
                                        <img src={urlFor(p.author.image).url()!} alt="Author" className="h-12 w-12 rounded-full"/>
                                    </p>
                                </div>

                            </div>
                        </div>
                    </Link>
                ))
                : <p>hmmm... no post yet...</p>
            }
        </div>
    </div>
  )
}



export const getServerSideProps = async () =>{
    const queryString = `
        *[_type == "post"]{
          _id,
            title,
            author -> {
              name,
              image
            },
            description,
            mainImage,
            slug
        }
    `;

    const post = await sanityClient.fetch(queryString);

    return {
        props: {
            post
        }
    }
}

export default Home
