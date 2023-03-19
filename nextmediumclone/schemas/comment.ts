import {defineField, defineType} from 'sanity'

export default defineType({
    name: 'comment',
    type: 'document',
    title: 'Comment',
    fields: [
        defineField({
            name: 'name',
            type: 'string',
        }),
        defineField({
            title: 'Approved',
            name: 'approved',
            type: 'boolean',
            description: 'Comments wont show till you approve it'
        }),
        defineField({
            name: 'email',
            type: 'string',
        }),
        defineField({
            name: 'comment',
            type: 'string',
        }),
        defineField({
            name: 'post',
            type: 'reference',
            to:[{ type: 'post'}]
        }),
    ]
})