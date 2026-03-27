
import { ButtonAdd, Navbar } from "../../ui";

function LayoutPage ({ children }) {
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100">
            
            <Navbar />

            <main className="max-w-7xl mx-auto px-6 py-12">
                { children }
            </main>

            <ButtonAdd/>
        </div>
    );
}

export default LayoutPage;