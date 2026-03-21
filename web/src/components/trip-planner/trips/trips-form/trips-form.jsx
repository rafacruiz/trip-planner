
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as ServicesApi from '../../../../services/api-services';
import SelectCountry from "../../../ui/select-country/select-country";
import { Alert } from "../../../ui";
import { BounceLoader } from "react-spinners";

const validations = {
    title: { 
        required: 'Title is required',
    },
    country: {
        code: { 
            required: 'Country is required',
        }
    },
    city: {
        required: 'City is required',
    },
    startDate: {
        required: 'Date start is required',
    },
    endDate: {
        required: 'Date end is required',
    },
    revealDate: {
        validate: (value, formValues) => {
            if (formValues.isSurprise && !value) {
                return "Reveal Date is required";
            }
          return true;
        }
    }
}

function TripsForm() {
  
    const [serverError, setServerError] = useState(null);
    const [success, setSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        clearErrors,
        reset,
        watch,
        formState: { isSubmitting, errors, isValid },
    } = useForm({ mode: "onChange" });

    const handleOnSubmit = async (data) => {
        try {
            await ServicesApi.createTrip(data);
            setSuccess(true);
            
            reset();
            
            setTimeout(() => {
                setSuccess(false);
            }, 1800);
        } catch (err) {
            if (err?.status === 400){
                const apiErrors = err.response?.data;
                setServerError(apiErrors);
            } else {
                console.log(err?.message);
                setSuccess(false);
                setServerError(err.response?.data?.message || "Ops! Unknown Error");
            }
        }
    };

    const isSurprise = watch("isSurprise");

    return (
        <div className="flex justify-center px-4 py-10">
            <form
                onSubmit={handleSubmit(handleOnSubmit)}
                className="
                w-full max-w-3xl
                bg-white
                border border-gray-200
                rounded-3xl
                shadow-md
                px-6 py-8
                flex flex-col gap-6
                hover:shadow-xl
                transition-all"
            >
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Create a new trip ✈️
                    </h1>

                    <p className="text-sm text-gray-500 mt-1">
                        Plan your next adventure with friends
                    </p>
                </div>

                { serverError && <Alert message={ serverError } center /> }

                <div>
                    <label className="text-sm text-gray-600 font-medium">
                        Trip Title
                    </label>

                    <input
                        type="text"
                        id="title"
                        placeholder="Summer in Japan"
                        className={`
                        mt-1 w-full px-4 py-3
                        rounded-xl
                        bg-gray-50
                        border border-transparent
                        text-sm
                        focus:outline-none
                        focus:bg-white
                        focus:border-blue-300
                        focus:ring-2 focus:ring-blue-100 ${
                            errors.title
                            ? "border-red-400 focus:ring-red-400"
                            : "border-gray-200 focus:ring-blue-500"
                        }`}
                        { ...register("title", validations.title) }

                    />
                  
                    { errors.title && (
                        <p className="mt-1 text-sm text-red-500">
                            { errors.title.message }
                        </p>
                    )}
                </div>

                <div>
                    <label className="text-sm text-gray-600 font-medium">
                        Country 🌍
                    </label>

                    <select
                        id="country"
                        placeholder="Japan"
                        className={`
                        mt-1 w-full px-4 py-3
                        rounded-xl
                        bg-gray-50
                        border border-transparent
                        text-sm
                        focus:outline-none
                        focus:bg-white
                        focus:border-blue-300
                        focus:ring-2 focus:ring-blue-100 ${
                            errors.country?.code
                            ? "border-red-400 focus:ring-red-400"
                            : "border-gray-200 focus:ring-blue-500"
                        }`}
                        { ...register("country.code", validations.country?.code) }
                    >
                        <SelectCountry name={ false }/>
                    </select>

                    { errors.country?.code && (
                        <p className="mt-1 text-sm text-red-500">
                            { errors.country?.code.message }
                        </p>
                    )}
                </div>

                <div>
                    <label className="text-sm text-gray-600 font-medium">
                        Trip City
                    </label>

                    <input
                        type="text"
                        id="city"
                        placeholder="Tokyo"
                        className={`
                        mt-1 w-full px-4 py-3
                        rounded-xl
                        bg-gray-50
                        border border-transparent
                        text-sm
                        focus:outline-none
                        focus:bg-white
                        focus:border-blue-300
                        focus:ring-2 focus:ring-blue-100 ${
                            errors.city
                            ? "border-red-400 focus:ring-red-400"
                            : "border-gray-200 focus:ring-blue-500"
                        }`}
                        { ...register("city", validations.city) }

                    />
                  
                    { errors.city && (
                        <p className="mt-1 text-sm text-red-500">
                            { errors.city.message }
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm text-gray-600 font-medium">
                            Start Date 📅
                        </label>

                        <input
                        type="date"
                        id="startDate"
                        className={`
                            mt-1 w-full px-4 py-3
                            rounded-xl
                            bg-gray-50
                            border border-transparent
                            focus:outline-none
                            focus:bg-white
                            focus:border-blue-300
                            focus:ring-2 focus:ring-blue-100 ${
                                errors.startDate
                                ? "border-red-400 focus:ring-red-400"
                                : "border-gray-200 focus:ring-blue-500"
                            }`}
                            { ...register("startDate", validations.startDate) }
                        />

                        { errors.startDate && (
                            <p className="mt-1 text-sm text-red-500">
                                { errors.startDate.message }
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="text-sm text-gray-600 font-medium">
                            End Date 📅
                        </label>

                        <input
                        type="date"
                        id="endDate"
                        className={`
                            mt-1 w-full px-4 py-3
                            rounded-xl
                            bg-gray-50
                            border border-transparent
                            focus:outline-none
                            focus:bg-white
                            focus:border-blue-300
                            focus:ring-2 focus:ring-blue-100 ${
                                errors.endDate
                                ? "border-red-400 focus:ring-red-400"
                                : "border-gray-200 focus:ring-blue-500"
                            }`}
                            { ...register("endDate", validations.endDate) }
                        />

                        { errors.endDate && (
                            <p className="mt-1 text-sm text-red-500">
                                { errors.endDate.message }
                            </p>
                        )}
                    </div>
                </div>

                <div>
                    <label className="text-sm text-gray-600 font-medium">
                        Description
                    </label>

                    <textarea
                        id="description"
                        rows={4}
                        placeholder="Tell something about your trip..."
                        className={`
                            mt-1 w-full px-4 py-3
                            rounded-xl
                            bg-gray-50
                            border border-transparent
                            focus:outline-none
                            focus:bg-white
                            focus:border-blue-300
                            focus:ring-2 focus:ring-blue-100`}
                            { ...register("description", validations.description) }
                    />

                    { errors.description && (
                        <p className="mt-1 text-sm text-red-500">
                            { errors.description.message }
                        </p>
                    )}
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-200">
                    <div>
                        <p className="text-sm font-medium text-gray-700">
                            🎁 Surprise Trip
                        </p>

                        <p className="text-xs text-gray-500">
                            Hide destination until reveal date
                        </p>
                    </div>

                    <input
                        type="checkbox"
                        name="isSurprise"
                        className={`accent-blue-600 w-5 h-5`}
                        { ...register("isSurprise", validations.isSurprise) }
                    />
                </div>

                {isSurprise && (
                    <div>
                        <label className="text-sm text-gray-600 font-medium">
                            Reveal Date 📅
                        </label>

                        <input
                        type="date"
                        name="revealDate"
                        className={`
                            mt-1 w-full px-4 py-3
                            rounded-xl
                            bg-blue-50
                            border border-blue-200
                            focus:outline-none
                            focus:ring-2 focus:ring-blue-200 ${
                            errors.revealDate
                                ? "border-red-400 focus:ring-red-400"
                                : "border-gray-200 focus:ring-blue-500"
                            }`}
                            { ...register("revealDate", validations.revealDate) }
                        />

                        { errors.revealDate && (
                            <p className="mt-1 text-sm text-red-500">
                                { errors.revealDate.message }
                            </p>
                        )}
                    </div>
                )}

                { success && (
                    <Alert message="Trip created successfully ✈️" center />
                )}

                <button
                    type="submit"
                    disabled={ !isValid }
                    className="
                    mt-4
                    w-full py-3
                    rounded-2xl
                    bg-gradient-to-r from-blue-600 to-indigo-600
                    text-white font-semibold
                    shadow-md
                    hover:shadow-lg
                    hover:scale-[1.02]
                    active:scale-[0.98]
                    transition-all duration-300"
                >
                    <span 
                        className="flex items-center justify-center gap-2 cursor-pointer" 
                    >
                        {isSubmitting && <BounceLoader size={18} color="#fff" />}
                        {isSubmitting ? "Creating..." : "Create Trip ✈️"}
                    </span>
                </button>
            </form>
        </div>
    );
}

export default TripsForm;