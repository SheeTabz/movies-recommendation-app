'use client';

export default function StudioLogos() {
  return (
    <section className="py-8">
      <h3 className="text-white text-xl font-bold mb-6">Our Studios</h3>
      <div className="flex space-x-6">
        {/* Disney */}
        <div className="w-32 h-20 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer relative overflow-hidden">
          <img 
            src="https://natgeostore.ph/cdn/shop/files/NatGeoLogo.png?v=1730176212"
            alt="Disney"
            className="w-full h-full object-contain absolute inset-0 p-2"
          />
        </div>
        
        {/* National Geographic */}
        <div className="w-32 h-20 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer relative overflow-hidden">
          <img 
            src="https://natgeostore.ph/cdn/shop/files/NatGeoLogo.png?v=1730176212"
            alt="National Geographic"
            className="w-full h-full object-contain absolute inset-0 p-2"
          />
        </div>
        
        {/* Star Wars */}
        <div className="w-32 h-20 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer relative overflow-hidden">
          <img 
            src="https://natgeostore.ph/cdn/shop/files/NatGeoLogo.png?v=1730176212"
            alt="Star Wars"
            className="w-full h-full object-contain absolute inset-0 p-2"
          />
        </div>
        
        {/* Marvel */}
        <div className="w-32 h-20 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer relative overflow-hidden">
          <img 
            src="https://natgeostore.ph/cdn/shop/files/NatGeoLogo.png?v=1730176212"
            alt="Marvel"
            className="w-full h-full object-contain absolute inset-0 p-2"
          />
        </div>
      </div>
    </section>
  );
}
