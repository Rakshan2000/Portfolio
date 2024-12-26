"use client"
import FormControls from "../form-controls"

const controls =[
    {
        name : 'AboutMe',
        placeholder: 'Enter your About Me',
        type: 'text',
        label: 'About Me'
    },
    {
        name : 'Projects',
        placeholder: 'Enter your total number of projects',
        type: 'text',
        label: 'Projects'
    },
    {
        name : 'Experience',
        placeholder: 'Enter your year of experience ',
        type: 'text',
        label: 'Experience'
    },
    {
        name : 'Clients',
        placeholder: 'Enter your count of clients',
        type: 'text',
        label: 'Clients'
    },
    {
        name : 'Skills',
        placeholder: 'Enter your skills here',
        type: 'text',
        label: 'Skills'
    }
]

export default function AdminAboutView({formData, setFormData, handleSaveInfo}) {
    console.log(formData);
    return <div className="w-full">
        <div className="bg-[#ffffff] shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <FormControls
                controls={controls}
                formData={formData}
                setFormData={setFormData}
            />
            <button onClick={()=>handleSaveInfo('about')} className="border border-green-600 p-4 font-bold text-[16px]">Add Info</button>
        </div>
    </div>
}