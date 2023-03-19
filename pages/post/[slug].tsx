
import  { sanityClient, urlFor } from "../../sanity";
import {Posts} from "../../typings";
import {GetStaticProps} from "next";
import Navigation from "../../components/Navigation";
import PortableText from "react-portable-text";
import Comments from "../../components/Comments";
import { useForm, SubmitHandler } from "react-hook-form";

interface Props {
    post: Posts
}

interface FormInput {
    _id: string,
    name: string,
    email: string,
    comment: string
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
            'comment': *[
                _type == "comment" && post._ref == ^._id && approved == true
            ],
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

const onSubmit : SubmitHandler<FormInput> = async (data) => {
    console.log(data)


    try{
         await fetch('/api/createComment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }catch (error){
        console.log(error)
    }
    // fetch('/api/createComment', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(data)
    // }).then(() => {
    //     console.log(data)
    // }).catch((error) => {
    //     console.log('this one errored out....')
    // })
}

export default function Post ({ post }: Props) {
    const { register, handleSubmit, formState: { errors } } = useForm<FormInput>()
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
                            className=""
                            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
                            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
                            content={post.body}
                            serializers={
                                {
                                    h1: (props: any) =>(
                                        <h1 className="text-2xl font-bold my-5" {...props}/>
                                    ),
                                    h2: (props: any) =>(
                                        <h2 className="text-xl font-bold my-5" {...props} />
                                    ),
                                    li: ({children}: any) =>(
                                        <li className="ml-4 list-disc  mt-4">{children}</li>
                                    ),
                                    link: ({ href, children }: any) => (
                                        <a href={href} className="text-blue-500 hover:underline">{ children }</a>
                                    ),
                                    img: ({ }) => (
                                        <img src="" alt=""/>
                                    )
                                }
                            }
                        />
                    </div>
                    <hr className="mt-5 my-r mx-auto border border-yellow-500"/>
                    <div>
                        <form className="flex flex-col p-5 max-w-2xl mx-auto mb-10" onSubmit={handleSubmit(onSubmit)}>
                            <h3 className="text-sm text-yellow-500">Enjoyed this article?</h3>
                            <h3 className="text-3xl font-bold">Leave a comment below.</h3>
                            <hr className="py-3 mt-2"/>

                            <input type="hidden" {...register("_id")} name="_id" value={post._id}/>
                            <div className="block mb-5">
                                <label>
                                    <span className="text-gray-700">Name</span>
                                </label>
                                <input
                                    {...register("name", { required: true })}
                                    type="text"
                                    placeholder="John doe"
                                    className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 focus:ring outline-none"/>
                                { errors.name && (<span className="text-red-500 text-sm">Name field is required!</span>)}
                            </div>
                            <div className="block mb-5">
                                <label>
                                    <span className="text-gray-700">Email</span>
                                </label>
                                <input
                                    {...register("email", { required: true })}
                                    type="text"
                                    placeholder="Type your email here..."
                                    className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 focus:ring outline-none"/>
                                { errors.email && (<span className="text-red-500 text-sm">Email field is required!</span>)}
                            </div>
                            <div>
                                <label>
                                    <span className="text-gray-700">Comments</span>
                                </label>
                                <textarea
                                    {...register("comment", { required: true })}
                                    placeholder="Comments"
                                    rows={8}
                                    className="shadow border rounded py-2 px-3 form-textarea mt-2 block w-full ring-yellow-500 focus:ring outline-none"/>
                                { errors.comment && (<span className="text-red-500 text-sm">Comment field is required!</span>)}
                            </div>

                            <input type="submit" className="mt-5 bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:shadow-outline text-white font-bold py-2 px-4 rounded cursor-pointer"/>
                        </form>
                    </div>
                </main>
            </>
    )
}

