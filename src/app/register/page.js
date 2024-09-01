'use client';

import { useState, useEffect } from "react"; // Import useEffect here
import InputComponent from "@/components/FormElements/InputComponent";
import SelectComponent from "@/components/FormElements/SelectComponent";
import { registrationFormControls } from "@/utilis";
import { registeredNewUser } from "@/services/register";

const initialFormData = {
    name: '',
    email: '',
    password: '',
    role: 'customer'
};

export default function Register() {
    const [formData, setFormData] = useState(initialFormData);
    const [isRegistered, setIsRegistered] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    function isFormValid() {
        return formData.name.trim() !== '' &&
               formData.email.trim() !== '' &&
               formData.password.trim() !== '';
    }

    async function handleRegisterOnSubmit() {
        if (!isFormValid()) {
            setError('Please fill in all fields.');
            return;
        }

        setLoading(true);
        setError('');
        try {
            const data = await registeredNewUser(formData);
            console.log(data);
            setIsRegistered(true);
        } catch (err) {
            console.error('Registration failed:', err);
            setError('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    // Clear error when formData changes or when registration is successful
    useEffect(() => {
        if (isRegistered) {
            setError('');
        }
    }, [isRegistered]);

    return (
        <div className="bg-white relative">
            <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-8 mr-auto xl:px-5 lg:flex-row">
                <div className="flex flex-col justify-center items-center w-full pr-10 pl-10 lg:flex-row">
                    <div className="w-full mt-10 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
                        <div className="flex flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
                            <p className="w-full text-4xl font-medium text-center font-serif">
                                {isRegistered
                                    ? "Registration Successful!"
                                    : "Sign up for an account"
                                }
                            </p>
                            {isRegistered ? (
                                <button
                                    className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide"
                                >
                                    Login
                                </button>
                            ) : (
                                <div className="w-full mt-6 relative space-y-8">
                                    {registrationFormControls.map((controlItem) => {
                                        const { componentType, id, type, placeholder, label, options } = controlItem;
                                        return componentType === 'input' ? (
                                            <InputComponent
                                                key={id} // Use a unique identifier
                                                type={type}
                                                placeholder={placeholder}
                                                label={label}
                                                onChange={(event) => {
                                                    setFormData(prevFormData => ({
                                                        ...prevFormData,
                                                        [id]: event.target.value
                                                    }));
                                                }}
                                                value={formData[id]}
                                            />
                                        ) : componentType === 'select' ? (
                                            <SelectComponent
                                                key={id} // Use a unique identifier
                                                options={options}
                                                label={label}
                                                onChange={(event) => {
                                                    setFormData(prevFormData => ({
                                                        ...prevFormData,
                                                        [id]: event.target.value
                                                    }));
                                                }}
                                                value={formData[id]}
                                            />
                                        ) : null;
                                    })}
                                    {error && <p className="text-red-500">{error}</p>}
                                    <button
                                        className="disabled:opacity-50 inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide"
                                        disabled={!isFormValid() || loading}
                                        onClick={handleRegisterOnSubmit}
                                    >
                                        {loading ? 'Registering...' : 'Register'}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
