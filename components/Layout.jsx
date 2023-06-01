import Navbar from "./Navbar";
import Footer from "./Footer";
export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            <main  className="container mx-auto p-5">
                {children}
            </main>
            <Footer />
            
        </>
    )
}