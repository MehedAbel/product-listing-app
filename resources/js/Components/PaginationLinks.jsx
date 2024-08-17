import PaginationLink from "./PaginationLink";

export default function PaginationLinks({
    links = [],
    className = "",
    children,
    ...props
}) {
    return (
        <div
            className={`flex justify-center items-center mt-6 ${className}`}
            {...props}
        >
            {links.map((link, index) => {
                return (
                    <PaginationLink
                        key={index}
                        href={link.url}
                        dangerouslySetInnerHTML={{
                            __html: link.label,
                        }}
                        active={link.active}
                    ></PaginationLink>
                );
            })}
        </div>
    );
}
