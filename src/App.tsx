import Tag from "./components/Tag"
import TableofContent from "./components/TableofContent";
import { useState, useEffect } from 'react';
import RecipeCard from "./components/RecipeCard";

/* define the required objects */
export type Tag = {
  id: string,
  name: string,
  bgClass: string,
  textClass: string,
  borderClass: string,
  dotClass:string
}

export const tagRegistry: Tag[] = [
// meal types 
  { id: "breakfast",     name: "Breakfast",     bgClass: "bg-cyan-50",    textClass: "text-cyan-700",    borderClass: "border-cyan-200",    dotClass: "bg-cyan-400" },
  { id: "lunch",         name: "Lunch",         bgClass: "bg-cyan-50",    textClass: "text-cyan-700",    borderClass: "border-cyan-200",    dotClass: "bg-cyan-400" },
  { id: "dinner",        name: "Dinner",        bgClass: "bg-sky-50",     textClass: "text-sky-700",     borderClass: "border-sky-200",     dotClass: "bg-sky-400" },
  { id: "snack",         name: "Snack",         bgClass: "bg-teal-50",    textClass: "text-teal-700",    borderClass: "border-teal-200",    dotClass: "bg-teal-400" },
  { id: "dessert",       name: "Dessert",       bgClass: "bg-pink-50",    textClass: "text-pink-700",    borderClass: "border-pink-200",    dotClass: "bg-pink-400" },
  { id: "drink",         name: "Drink",         bgClass: "bg-blue-50",    textClass: "text-blue-700",    borderClass: "border-blue-200",    dotClass: "bg-blue-400" },

  // attributes 
  { id: "healthy",       name: "Healthy",       bgClass: "bg-emerald-50", textClass: "text-emerald-700", borderClass: "border-emerald-200", dotClass: "bg-emerald-400" },
  { id: "high-protein",  name: "High-Protein",  bgClass: "bg-green-50",   textClass: "text-green-700",   borderClass: "border-green-200",   dotClass: "bg-green-400" },
  { id: "quick",         name: "Quick",         bgClass: "bg-lime-50",    textClass: "text-lime-700",    borderClass: "border-lime-200",    dotClass: "bg-lime-400" },
  { id: "spicy",         name: "Spicy",         bgClass: "bg-orange-50",  textClass: "text-orange-700",  borderClass: "border-orange-200",  dotClass: "bg-orange-400" },

  // effort/practicality 
  { id: "easy",          name: "Easy",          bgClass: "bg-amber-50",   textClass: "text-amber-700",   borderClass: "border-amber-200",   dotClass: "bg-amber-400" },
  { id: "one-pot",       name: "One-Pot",       bgClass: "bg-violet-50",  textClass: "text-violet-700",  borderClass: "border-violet-200",  dotClass: "bg-violet-400" },
  { id: "meal-prep",     name: "Meal-Prep",     bgClass: "bg-indigo-50",  textClass: "text-indigo-700",  borderClass: "border-indigo-200",  dotClass: "bg-indigo-400" },
]

export type Recipe = {
  id: string,
  title: string,
  coverImage: string,
  tags: string[], // the tag id referencing tagRegistry
  ingredients: string[],
  instructions: string[]
}

export type SummaryRecipe = Pick<Recipe, "id"| "title">

// will map to the Manifest json
export type TableofContent = SummaryRecipe[]

function App() {
  // state to control and render Table of Content
  const [toc, setToc] = useState<TableofContent | null>(null)

  // state to control current selected recipe
  const [curRecipe, setCurRecipe] = useState<Recipe | null>(null)

    // load the Table of Content data
    useEffect(() => {
    async function loadManifest() {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}recipe-data/manifest.json`)
        const contentType = response.headers.get("content-type")
        if (!response.ok || !contentType?.includes("application/json")) {
          throw new Error("Something went wrong trying to load manifest.json") 
        }
        const data: TableofContent = await response.json()
        setToc(data)

        if (data.length > 0) {
          selectRecipe(data[0].id) // load first recipe on first page load
        }
      }
      catch (error) {
        console.error(error)
      }   
        
    }
    loadManifest()
  }, [])

  // on toc recipe click - load recipe card
  function selectRecipe(id: string) {
    // use recipe id to request correct json file
    async function loadRecipe(id: string) {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}recipe-data/${id}.json`)
        const contentType = response.headers.get("content-type")
        if (!response.ok || !contentType?.includes("application/json")) {
          throw new Error (`Could not load ${id}.json`)
        }
        const data: Recipe = await response.json()
        // set current recipe to the new json recipe
        setCurRecipe(data)
      }
      catch (error) {
        console.log(error)
      }
    }

    loadRecipe(id)
  }

  return (
    <div className="flex flex-row items-start gap-6 p-6">
      {toc !== null ? <TableofContent tocData={toc} selectRecipe={selectRecipe}/> : null}
      {curRecipe !== null ? <RecipeCard recipeData={curRecipe} /> : null}
    </div>
  )
}

export default App