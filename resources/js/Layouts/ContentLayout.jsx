// export default function ContentLayout({ children }) {
//     return (
//         <div className="w-full py-12">
//             <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
//                 <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
//                     <div className="p-6 text-gray-900 flex flex-col">
//                         {children}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

export default function ContentLayout({ children }) {
    return (
        <div className="w-full py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 text-gray-900 flex flex-col">
                    {children}
                </div>
            </div>
        </div>
    );
}
