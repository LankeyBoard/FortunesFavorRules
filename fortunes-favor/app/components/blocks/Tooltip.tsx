type TooltipProps = {
    message: string,
    children: JSX.Element
}

export default function Tooltip({ message, children }: TooltipProps) {
    return (
    <div className="group relative flex">
        {children}
        <text className="absolute top-10 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">{message}</text>
    </div>
    )
}
