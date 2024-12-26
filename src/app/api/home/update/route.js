import connectToDB from "@/database/index";
import Home from "@/models/Home";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    await connectToDB();
    
    const body = await req.text();
    if (!body) {
      return NextResponse.json({
        success: false,
        message: "Request body is empty",
      });
    }

    const extractData = JSON.parse(body);
    const {
        _id, 
        heading,
        summary
    } = extractData;

    // Check if the document exists before updating
    const existingDocument = await Home.findById(_id);
    if (!existingDocument) {
      return NextResponse.json({
        success: false,
        message: "Document not found",
      });
    }

    // Proceed to update the document
    const updateData = await Home.findOneAndUpdate(
      { _id: _id }, // Find the document by _id
      { heading, summary }, // Update the fields
      { new: true } // Return the updated document
    );

    if (updateData) {
      return NextResponse.json({
        success: true,
        data: updateData,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something went wrong! Please try again",
      });
    }

  } catch (e) {
    console.log(e);

    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
}