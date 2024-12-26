"use client"

import FormControls from "../form-controls"

const controls = [
    {
        name: 'Timeline',
        placeholder: 'Enter your Timeline of Studies',
        type: 'text',
        label: 'Timeline'
    },
    {
        name: 'College',
        placeholder: 'Enter the college name',
        type: 'text',
        label: 'College Name'
    },
    {
        name: 'Degree',
        placeholder: 'Enter the Degree Name',
        type: 'text',
        label: 'Degree'
    }
]

export default function AdminEducationView({formData,setFormData, handleSaveInfo, data}) {
    console.log(formData);
    return <div className="w-full">
        
        <div className="bg-[#ffffff] shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className=" mb-10">
            {
                data && data.length ? 
                data.map(item=> <div className="flex flex-col gap-4 border p-4 border-green-700">
                    <p>Timeline : {item.Timeline}</p>
                    <p>College : {item.College}</p>
                    <p>Degree : {item.Degree}</p>
                </div>)
                 : null
            }
        </div>
            <FormControls
                controls={controls}
                formData={formData}
                setFormData={setFormData}
            />
            <button onClick={()=>handleSaveInfo('education')} className="border border-green-600 p-4 font-bold text-[16px]">Add Info</button>
        </div>
    </div>
}