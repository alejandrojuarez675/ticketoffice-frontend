const categories = [
    { name: "Conciertos", image: "https://example.com/concerts.jpg" },
    { name: "Teatro", image: "https://example.com/theater.jpg" },
    { name: "Deportes", image: "https://example.com/sports.jpg" },
    { name: "Familiar", image: "https://example.com/family.jpg" },
    { name: "Festivales", image: "https://example.com/festivals.jpg" },
    { name: "Foros", image: "https://example.com/forums.jpg" },
    { name: "Museos", image: "https://example.com/museums.jpg" },
    { name: "Experiencias", image: "https://example.com/experiences.jpg" }
];

export default function EventCategories() {
    return (
        <div className="my-8">
            <h2 className="text-3xl font-bold text-center mb-6">Categorías</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {categories.map((category, index) => (
                    <div key={index} className="relative overflow-hidden bg-gray-800 text-white rounded-lg shadow-md transition-transform duration-200 hover:scale-105">
                        <img src={category.image} alt={category.name} className="w-full h-40 object-cover" />
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                            <span className="text-lg font-semibold">{category.name}</span>
                        </div>
                        <div className="absolute bottom-2 right-2">
                            <a 
                                href={`/main/events?category=${category.name}`} 
                                className="bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-semibold">
                                +
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}