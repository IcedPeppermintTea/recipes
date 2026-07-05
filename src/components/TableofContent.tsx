import { type TableofContent as ToC } from "../App";

type tableProps = {
    tocData: ToC
}

function TableofContent({tocData}: tableProps) {
    return (
        <nav className="w-full max-w-xs">
            <h2 className="text-sm font-semibold tracking-wide text-gray-400 uppercase mb-3">
                Table of Contents
            </h2>
            <ul className="space-y-1">
                {tocData.map(recipe => (
                    <li key={recipe.id}>
                        <button
                            type="button"
                            className="w-full text-left text-cyan-700 hover:text-cyan-900 hover:underline underline-offset-2 decoration-cyan-300 py-1 transition-colors"
                        >
                            {recipe.title}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default TableofContent