import { Link as ScrollLink } from 'react-scroll';
export default function Headings({ headings }) {
    if (!headings || headings.length < 2 ) return null;
    const headingTabs = {
        2 : "ml-2",
        3 : "ml-4",
        4 : "ml-6",
        5 : "ml-8",
        6 : "ml-10",
    }
    return (
        <>
          
                <div className="my-8">
                    <div className="text-gray-500 text-sm">
                        <h3 className="text-gray-700 font-semibold dark:text-gray-100 text-lg mb-2">Table of Contents</h3>
                        <div className="">
                            {headings.map((heading, index) => (
                                <div key={index} className={`${headingTabs[heading.level]} my-1`}>
                                    <ScrollLink
                                        to={heading.id}
                                        smooth={true}
                                        duration={500}
                                        className="hover:text-gray-700 dark:text-gray-200 dark:hover:text-gray-400  cursor-pointer"
                                    >
                                      &bull;  {heading.text}
                                    </ScrollLink>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
        </>

    )
}