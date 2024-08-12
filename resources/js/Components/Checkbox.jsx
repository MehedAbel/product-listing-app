export default function Checkbox({ className = "", ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                "rounded border-gray-300 shadow-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-700" +
                className
            }
        />
    );
}
