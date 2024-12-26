import connectToDB from "@/database/index";
import About from "@/models/About";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(req) {
  try {
    await connectToDB();
    const extractData = await req.json();
    const {_id, 
        AboutMe,
        Projects,
        Experience,
        Clients,
        Skills} = extractData;

        const updateData = await About.findOneAndUpdate(
        {
            _id : _id,
        },
        {
            AboutMe,
            Projects,
            Experience,
            Clients,
            Skills 
        },
        {
            new : true
        });

        if (updateData) {
            return NextResponse.json({
              success: true,
              data: updateData,
            });
          } else {
            return NextResponse.json({
              success: false,
              message: "Something went wrong !Please try again",
            });

        }

  } catch (e) {
    console.log(e);

    return NextResponse.json({
      success: false,
      message: "Something went wrong !Please try again",
    });
  }
}