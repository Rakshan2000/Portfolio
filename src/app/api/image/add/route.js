import Image from '@/models/Image';
import connectToDB from "@/database/index";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
    try {
        console.log(req); // Log the incoming request for debugging
        await connectToDB();

        const formData = await req.formData(); // Use formData() to extract data
        const url = formData.get("url"); // Get the URL from FormData
        const publicId = formData.get("publicId"); // Get the public ID from FormData

        // Create a new image document
        const saveData = await Image.create({ url, publicId }); // Save the data to MongoDB

        if (saveData) {
            return NextResponse.json({
                success: true,
                message: "Data saved successfully",
                data: saveData
            });
        } else {
            return NextResponse.json({
                success: false,
                message: "Something goes wrong! Please try again",
            });
        }
    } catch (e) {
        console.log(e);

        return NextResponse.json({
            success: false,
            message: "Something goes wrong! Please try again",
        });
    }
}