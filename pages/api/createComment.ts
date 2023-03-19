// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {createClient} from "@sanity/client"


const config = {
    dataset: process.env.NEXT_PUBLIC_DATA_SET,
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    useCdn: process.env.NODE_ENV === "production",
    token: process.env.NEXT_PUBLIC_DATA_SET,
}

const client = createClient(config);


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { _id, name, email, comment } = JSON.parse(req.body);
    console.log(req.body)
    try{
        await client.create({
            _type: 'comment',
            post: {
                _type: 'reference',
                _ref: _id
            },
            name,
            email,
            comment
        });

        return res.status(200).json({message: 'Comment submitted.'})
    } catch (error){
        return res.status(400).json({ message: "Couldn't create your comment!"})
    }
}
