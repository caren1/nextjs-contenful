import { createClient } from 'contentful'
import Image from 'next/image'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
})

export const getStaticPaths = async () => {
  const res = await client.getEntries({
    content_type: 'recipe',
  })

  const paths = res.items.map((item) => {
    return {
      params: {
        slug: item.fields.slug
      }
    }
  })

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps ({ params }) {

  const { items } = await client.getEntries({
    content_type: 'recipe',
    'fields.slug':params.slug
  })

  return {
    props: {
      recipe: items[0]
    }
  }
}

export default function RecipeDetails({ recipe }) {

  const { featuredImage, title, cookingTime, ingredients, method } = recipe.fields;

  return (
    <div className="card">
      <div className="banner">
        <Image 
        src={`https:${featuredImage.fields.file.url}`}
        width={featuredImage.fields.file.details.image.width}
        height={featuredImage.fields.file.details.image.height}
        />
        <h2>{title}</h2>
      </div>
      <div className="info">
        <p>Takes about {cookingTime} mins to cook.</p>
        <h3>ingredients :</h3>
        
          {ingredients.map(ingredient => (
            <span key={ingredient}>
              {ingredient}
            </span>
          ))}
      </div>

      <div className="method">
        <h3>Method:</h3>
          <div>{documentToReactComponents(method)}</div>
      </div>

      <style jsx>{`
         .card {
          transform: rotateZ(-1deg);
        }
        .content {
          background: #fff;
          box-shadow: 1px 3px 5px rgba(0,0,0,0.1);
          margin: 0;
          position: relative;
          top: -40px;
          left: -10px;
        }
        .info {
          padding: 16px;
        }
        .info h4 {
          margin: 4px 0;
          text-transform: uppercase;
        }
        .info p {
          margin: 0;
          color: #777;
        }
        .actions {
          margin-top: 20px;
          display: flex;
          justify-content: flex-end;
        }
        .actions a {
          color: #fff;
          background: #f01b29;
          padding: 16px 24px;
          text-decoration: none;
        }
      `}
      </style>
    </div>
  )
}