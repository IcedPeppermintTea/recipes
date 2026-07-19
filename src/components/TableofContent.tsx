import { type TableofContent as ToC } from "../App";

type tableProps = {
    tocData: ToC
    selectRecipe: (id: string) => void
}

function TableofContent({tocData, selectRecipe}: tableProps) {
    return (
        <nav className="w-full max-w-xs ml-6 md:ml-10 bg-white rounded-2xl border border-cyan-100 shadow-sm p-5 md:sticky md:top-8">
            <h2 className="text-xs font-bold tracking-widest text-cyan-600 uppercase mb-4 pb-3 border-b border-cyan-100 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                Table of Contents
            </h2>
            <ul className="space-y-0.5">
                {tocData.map((recipe, index) => (
                    <li key={recipe.id}>
                        <button onClick={() => selectRecipe(recipe.id)}
                            type="button"
                            className="group w-full flex items-baseline gap-3 text-left text-slate-600 hover:text-cyan-800 py-2 px-2 rounded-lg hover:bg-cyan-50 transition-all duration-150"
                        >
                            <span className="text-xs font-mono text-cyan-300 group-hover:text-cyan-500 transition-colors">
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            <span className="text-sm leading-snug group-hover:underline underline-offset-2 decoration-cyan-300">
                                {recipe.title}
                            </span>
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default TableofContent