"use client"

import FormControls from "../form-controls"

const controls = [
    {
        name:'Position',
        placeholder:'Enter your postion held',
        type:'text',
        label : 'Postion'
    },
    {
        name: 'Company',
        placeholder: 'Enter your company name',
        type: 'text',
        label : 'Company Name'
    },
    {
        name:'Duration',
        placeholder:'Enter the Duration Worked',
        type:'text',
        label : 'Duration'
    },
    {
        name:'Location',
        placeholder: 'Enter the Location',
        type:'text',
        label : 'Location'
    },
    {
        name:'JobProfile',
        placeholder:'Enter the Job Profile',
        type:'text',
        label : 'Job Profile'
    }
] 
export default function AdminExperienceView({formData,setFormData, handleSaveInfo, data}) {
    console.log(formData);
    return <div className="w-full">
        <div className="bg-[#ffffff] shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className=" mb-10">
            {
                data && data.length ? 
                data.map(item=> <div className="flex flex-col gap-4 border p-4 border-green-700">
                    <p>Position : {item.Position}</p>
                    <p>Company : {item.Company}</p>
                    <p>Duration : {item.Duration}</p>
                    <p>Location : {item.Location}</p>
                    <p>Job Profile : {item.JobProfile}</p>
                </div>)
                 : null
            }
        </div>
            <FormControls
                controls={controls}
                formData={formData}
                setFormData={setFormData}
            />
            <button onClick={()=>handleSaveInfo('experience')} className="border border-green-600 p-4 font-bold text-[16px]">Add Info</button>
        </div>
    </div>
}