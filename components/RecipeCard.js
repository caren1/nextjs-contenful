import React from 'react'
import Link from 'next/link'

export default function RecipeCard({ recipe }) {

    const { title, slug, cookingTime, thumbnail } = recipe.fields;
    return (
        <div className="card">
            <div className="featured">
                {/* img + thumb  */}
            </div>
            <div className="content">
                <div className="info">
                    <h4>{title}</h4>
                    <p>Approx. {cookingTime} mins. </p>
                </div>
                <div className="actions">
                    <Link href={`/recipes/${slug}`}><a>Cook this</a></Link>
                </div>
            </div>
        </div>
    )
}
