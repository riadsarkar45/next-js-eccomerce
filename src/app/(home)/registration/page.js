'use client'
import { AuthContext } from '@/Component/Hooks/AuthProvider';
import React, { useContext } from 'react';

const Registration = () => {
    const { createUser, logOut } = useContext(AuthContext)

    const handleCreateUser = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        formData.get('image')
        const email = form.email.value;
        console.log(email);
        const name = form.name.value;
        const password = form.password.value;
        const role = "customer";
        console.log('clicked');

        try {

            createUser(email, password)
                .then(res => {
                    if (res.user.uid) {
                        // const all = { name, email, role, status, uid: res.user.uid }
                        // axiosPublic.post('/register', all)
                        //     .then(() => {
                        //         logOut();
                        //         navigate('/login')
                        //     })
                        //     .catch(err => console.log(err))
                    } else {
                        console.log('firebase id not found.');
                    }


                    // form.reset();
                    console.log(res.user.uid, 'headshot')
                })
                .catch(error => console.error(toast.error(error.message)))

        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div>
            <div className="flex flex-col justify-center font-[sans-serif] sm:h-screen p-4">
                <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
                    <form onSubmit={handleCreateUser}>
                        <div className="space-y-6">
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Your Name</label>
                                <input
                                    name="name"
                                    type="text"
                                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                    placeholder="Enter email"
                                />
                            </div>
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Email Id</label>
                                <input
                                    name="email"
                                    type="text"
                                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                    placeholder="Enter email"
                                />
                            </div>
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Password</label>
                                <input
                                    name="password"
                                    type="password"
                                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                    placeholder="Enter password"
                                />
                            </div>
                            
                        </div>
                        <div className="!mt-8">
                            <button
                                type="submit"
                                className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                            >
                                Create an account
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default Registration;