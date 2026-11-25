import React from 'react';

const FleetInAction: React.FC = () => {
    return (
        <section className="w-full py-16 px-4 bg-white">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        FLEET IN ACTION
                    </h2>
                    <p className="text-3xl md:text-4xl font-bold text-blue-600">
                        FORCEV
                    </p>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-6 grid-rows-5 gap-4 h-[600px]">
                    {/* Main large image - spans 6 columns, 3 rows */}
                    <div className="col-span-6 row-span-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl overflow-hidden relative">

                        <img
                            src="/images/1.JPG"
                            alt="Main Fleet Operations"
                            className="w-full h-full object-cover"
                        />

                    </div>

                    {/* Three equal boxes in bottom row - each spans 2 columns, 2 rows */}
                    <div className="col-span-2 row-span-2 row-start-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden relative">
                        <img
                            src="/images/2.JPG"
                            alt="Main Fleet Operations"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="col-span-2 row-span-2 col-start-3 row-start-4 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl overflow-hidden relative">
                        <img
                            src="/images/3.JPG"
                            alt="Main Fleet Operations"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="col-span-2 row-span-2 col-start-5 row-start-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl overflow-hidden relative">
                        <img
                            src="/images/4.JPG"
                            alt="Main Fleet Operations"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FleetInAction;