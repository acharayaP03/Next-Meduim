import { createClient } from "next-sanity";
import imageUrlBuilder  from '@sanity/image-url';


export const config = {
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    appVersion: "2021-03-25",
    useCdn: process.env.NODE_ENV === "production"
}

export  const sanityClient = createClient(config);
// @ts-ignore
export const urlFor = ( source: string ) => imageUrlBuilder(config).image(source);
// export const userCurrentUser = createCurrentUser(config)