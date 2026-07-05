import {type Recipe as RecipeData} from "../App"
import Tag from "./Tag"
import { tagRegistry } from "../App"
import {type Tag as typeTag} from "../App"

type RecipeProp = {
    recipeData: RecipeData
}


function RecipeCard({recipeData}: RecipeProp) {
    return (
        <div id={recipeData.id} className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-cyan-100 p-6 md:p-8 space-y-8">

            {/* Header: title + tags on the left, image on the right */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div className="flex-1 space-y-3">
                    <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
                        {recipeData.title}
                    </h1>

                    <div className="flex flex-wrap gap-2">
                    {recipeData.tags.map((tagId) => { // using each Recipe.tag id - lookup the registry
                        const tagDef: typeTag | undefined = tagRegistry.find((t) => t.id === tagId)
                        if (!tagDef) return null
                        return (
                            <div key={tagId} className="inline-flex">
                                <Tag tagData={tagDef} />
                            </div>
                        )
                        })}
                    </div>
                </div>

                <div className="md:w-64 lg:w-80 shrink-0">
                    <img
                        src={recipeData.coverImage}
                        className="w-full h-48 md:h-56 object-cover rounded-xl border border-cyan-100 shadow-sm"
                    />
                </div>
            </div>

            {/* Ingredients */}
            <div className="bg-cyan-50/50 rounded-xl p-5 border border-cyan-100">
                <h2 className="text-lg font-semibold text-cyan-800 mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                    Ingredients
                </h2>
                <div className="space-y-1.5">
                    {recipeData.ingredients.map(ingredient => (
                        <p className="text-slate-600 leading-relaxed pl-3.5">
                            {ingredient}
                        </p>
                    ))}
                </div>
            </div>

            {/* Instructions */}
            <div className="bg-blue-50/40 rounded-xl p-5 border border-blue-100">
                <h2 className="text-lg font-semibold text-blue-800 mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    Instructions
                </h2>
                <div className="space-y-3">
                    {recipeData.instructions.map(instruction => (
                        <p className="text-slate-600 leading-relaxed pl-3.5">
                            {instruction}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default RecipeCard