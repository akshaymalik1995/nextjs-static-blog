import Navbar from "./Navbar";
import Footer from "./Footer";
export default function Layout({ children }) {
    return (
        <>
            <div className="min-h-screen flex flex-col justify-between">
            <Navbar />
            <main  className="container flex-grow mx-auto p-5">
                {children}
            </main>
            <Footer />
            </div>
        </>
    )
}