
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function MyMap({ coordinates }) {

    const position = [coordinates[0], coordinates[1]];

    return (
        <MapContainer center={ position } zoom={ 10 } style={{ height: '400px', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
            />
            <Marker position={position}>
                <Popup>My location 🌍</Popup>
            </Marker>
        </MapContainer>
    );
}

function MapSection({ trip, user, revealReached }) {

    return (
        <>
            { (trip.isSurprise && !revealReached) ?
                <div className="
                    h-72
                    rounded-2xl
                    bg-gradient-to-br
                    from-indigo-100
                    to-purple-100
                    flex
                    flex-col
                    items-center
                    justify-center
                    gap-2
                ">
                    <div className="text-4xl"> 🔒 </div>

                    <p className="text-sm text-indigo-600 font-medium">
                        Map locked until reveal
                    </p>
                </div>
            :
                <>
                    { !trip.country?.location?.coordinates?.length ? (
                        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Trip map</h2>

                            <div className="h-72 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 
                                flex items-center justify-center text-blue-500 text-sm">
                                🗺 Map is not available for this trip yet.
                            </div>
                        </section>)
                    : 
                        (<section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 z-0 relative">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Trip map</h2>

                            <div className='w-full h-64 rounded-xl overflow-hidden'>
                                { MyMap(trip.country.location) }
                            </div>
                        </section>)
                    }
                </>
            }
        </>
    );
}

export default MapSection;