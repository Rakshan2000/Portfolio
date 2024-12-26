"use client"


import FormControls from "../form-controls"

const controls = [
    {
        name:'ProjectName',
        placeholder:'Enter your project name',
        type: 'text',
        label:'Project Name'
    },
    {
        name:'Technologies',
        placeholder:'Enter the Technnologies used',
        type: 'text',
        label:'Technologies'
    },
    {
        name:'Website',
        placeholder:'Please enter the website URL',
        type: 'text',
        label:'website URL'
    },
    {
        name:'GitHub',
        placeholder:'Please enter the GitHub Link',
        type: 'text',
        label:'GitHub Link'
    }
]
export default function AdminProjectsView({formData,setFormData, handleSaveInfo, data}) {
    console.log(formData);
    return <div className="w-full">
        <div className="bg-[#ffffff] shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className=" mb-10">
            {
                data && data.length ? 
                data.map(item=> <div className="flex flex-col gap-4 border p-4 border-green-700">
                    <p>Project Name : {item.ProjectName}</p>
                    <p>Technnologies : {item.Technologies}</p>
                    <p>Website : {item.Website}</p>
                    <p>GitHub : {item.GitHub}</p>
                </div>)
                 : null
            }
        </div>
            <FormControls
                controls={controls}
                formData={formData}
                setFormData={setFormData}
            />
            <button onClick={()=>handleSaveInfo('projects')} className="border border-green-600 p-4 font-bold text-[16px]">Add Info</button>
        </div>
    </div>
}