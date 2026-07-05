import {type Tag as TagData} from "../App"

type tagProps = {
    tagData: TagData
}

function Tag({tagData}:tagProps) {
    return (
        <div id={tagData.id} className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border ${tagData.bgClass} ${tagData.borderClass}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${tagData.dotClass}`} />
            <p className={`text-xs font-semibold tracking-wide ${tagData.textClass}`}>{tagData.name}</p>
        </div>
    )
}

export default Tag