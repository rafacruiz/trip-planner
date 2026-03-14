
import { Link } from "react-router-dom";

function ButtonAdd() {
    return (
        <Link
            to={''} 
            className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 
                text-white w-14 h-14 rounded-full shadow-xl flex items-center 
                justify-center text-2xl transition hover:scale-105 cursor-pointer">
            +
        </Link>
    );
}

export default ButtonAdd;