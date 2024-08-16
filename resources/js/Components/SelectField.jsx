import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function SelectField(
    { className = "", isFocused = false, ...props },
    ref
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <select
            {...props}
            className={
                "w-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-stone-700 focus:border-transparent rounded-md shadow-sm " +
                className
            }
            ref={input}
        >
            {props.children}
        </select>
    );
});
