
import { ButtonAdd, Navbar } from "../../ui";

import { motion } from 'motion/react';

const pageTransition = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: { duration: 0.3, ease: 'easeInOut' }
};

function LayoutPage ({ children }) {
    
    return (
        <motion.div
            {...pageTransition} 
            className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100">
            
            <Navbar />

            <main className="max-w-7xl mx-auto px-6 py-12">
                { children }
            </main>

            <ButtonAdd/>
            
        </motion.div>
    );
}

export default LayoutPage;