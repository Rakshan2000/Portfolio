import Image from '@/models/Image';
import connectToDB from "@/database/index";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
    try {
        await connectToDB();

        // Fetch all images from the database
        const images = await Image.find({});

        // Extract publicId from each image
        const publicIds = images.map(image => image.publicId);

        return NextResponse.json({
            success: true,
            data: publicIds
        });
    } catch (e) {
        console.log(e);

        return NextResponse.json({
            success: false,
            message: "Something went wrong! Please try again",
        });
    }
}