"use client"

export default function AdminContactView({data}) {
    return <div className="w-full" >
            <div className="bg-[#ffffff] shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className=" mb-10">
            {
                data && data.length ? 
                data.map(item=> <div className="flex flex-col gap-4 border p-4 border-green-700">
                    <p>Name : {item.name}</p>
                    <p>E-mail : {item.email}</p>
                    <p>Phone Number: {item.contact}</p>
                    <p>Message : {item.message}</p>
                </div>)
                 : null
            }
            </div>
            </div>
        </div>
}