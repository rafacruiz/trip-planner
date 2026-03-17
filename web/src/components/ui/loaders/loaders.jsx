
export default function Loading({text = 'Cargando...'}) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm z-50">
            <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="mt-3 text-gray-700">{ text }</span>
            </div>
        </div>
    );
}