"use client"

import FormControls from "../form-controls"

const controls = [
{
    name: 'username',
    placeholder : 'Enter your Username',
    type: 'text',
    label : 'Username'
},
{
    name : 'password',
    placeholder : 'Enter Your Password',
    type : 'password',
    label : 'Password'
}
]

export default function AdminLoginView({formData,setFormData,handleLogin}) {
    console.log(formData);
    return <div className="w-full">
        <div className="bg-[#ffffff] shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <FormControls
                controls={controls}
                formData={formData}
                setFormData={setFormData}
            />
            <button onClick={handleLogin} className="border border-green-600 p-4 font-bold text-[16px]">Login</button>
        </div>
    </div>
}