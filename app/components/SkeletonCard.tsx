const SkeletonCard = () =>{
    return (
        <div className="bg-gray-300 flex flex-col items-center dark:bg-gray-600 shadow-md rounded-xl p-4 animate-pulse">
            <div className="w-24 h-24 bg-gray-400 rounded-full mb-4"></div> {/* Imagen circular */}
            <div className="w-3/4 h-6 bg-gray-400 rounded mb-2"></div> {/* Nombre */}
            <div className="w-2/3 h-4 bg-gray-400 rounded"></div> {/* Email */}
        </div>
    );
  }
export default SkeletonCard;