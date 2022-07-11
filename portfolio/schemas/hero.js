export default {
    name: "hero",
    title: "Hero Image",
    type: "document",
    fields: [
        {
          name: 'title',
          title: "Title",
          type: 'string',
        },
        {
            name: 'mainImage',
            title: 'Main image',
            type: 'image',
            options: {
              hotspot: true,
            },
          },
          {
            name: 'description',
            title: "Description",
            type: 'text',
          },
        ],
        preview: {
          select: {
            title: 'title',
            author: 'author.name',
            media: 'mainImage',
          },
          preview: {
            select: {
              title: 'title',
              media: 'image',
            },
          },
        },
      }
      