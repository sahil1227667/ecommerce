'use client';

import { useState } from "react";
import { loginFormControls } from "@/utilis";
import InputComponent from "@/components/FormElements/InputComponent";
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        // Add your form submission logic here
        console.log('Form submitted:', formData);
    }

    return (
        <div className="bg-white relative">
            <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-8 mr-auto xl:px-5 lg:flex-row">
                <div className="flex flex-col justify-center items-center w-full pr-10 pl-10 lg:flex-row">
                    <div className="w-full mt-10 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
                        <div className="flex flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
                            <p className="w-full text-4xl font-medium text-center font-serif">
                                Login
                            </p>
                            <form className="w-full mt-6 relative space-y-8" onSubmit={handleSubmit}>
                                {loginFormControls.map((controlItem) => {
                                    const { componentType, id, type, placeholder, label } = controlItem;
                                    return componentType === 'input' ? (
                                        <InputComponent
                                            key={id} // Use a unique identifier
                                            type={type}
                                            placeholder={placeholder}
                                            label={label}
                                            name={id} // Ensure name matches formData keys
                                            onChange={handleChange}
                                            value={formData[id] || ''}
                                        />
                                    ) : null;
                                })}
                                <button
                                    type="submit"
                                    className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide"
                                >
                                    Login
                                </button>
                                <div className="flex flex-col gap-2">
                                    <p>New to the website?</p>
                                    <button
                                        type="button"
                                        className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide"
                                        onClick={() => router.push("/register")}
                                    >
                                        Register
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
