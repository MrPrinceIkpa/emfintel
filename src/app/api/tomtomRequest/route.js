import { NextResponse } from "next/server";
export async function GET(req) {
    return NextResponse.json({ success: true, tomtomKey: `${process.env.TOMTOM_API_KEY}`});
}