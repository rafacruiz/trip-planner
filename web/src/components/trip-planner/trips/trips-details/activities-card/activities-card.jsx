
import { updateStateActivity } from '../../../../../services/api-services';

function ActivitiesCard({ trip, handleCheckToggle }) {

    return (
        <section 
            className={`rounded-2xl shadow-sm border border-gray-100 p-6 ${ !trip.isSurprise
                ? "bg-white" 
                : "bg-gradient-to-br from-indigo-100 to-purple-100" }`
            }
        >
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Activities</h2>
            </div>

            <div 
                className="space-y-3 cursor-pointer">
                { trip.activities.map(activity => (
                    <div
                    onClick={ () => 
                        handleCheckToggle( { 
                            onAction: updateStateActivity, 
                            idValue: activity.id,
                            value: { "completed": true } 
                        })
                    } 
                    key={ activity.id }
                    className="
                        flex items-center justify-between
                        p-4
                        rounded-2xl
                        border border-gray-100
                        bg-gray-50
                        hover:bg-white
                        hover:shadow-sm
                        transition"
                    >
                        <p className={`
                            text-sm font-medium
                            ${activity.completed
                            ? "line-through text-gray-400"
                            : "text-gray-700"}
                        `}>
                            🎯 { activity.title }
                        </p>

                        <input
                            type="checkbox"
                            checked={ activity.completed }
                            readOnly
                            className="
                            w-4 h-4
                            accent-blue-600"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}

export default ActivitiesCard;