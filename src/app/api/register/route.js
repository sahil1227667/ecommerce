import connectToDB from "@/database";
import Joi from "joi";
import { NextResponse } from "next/server";
import User from "@/models/User"; // Adjust the import path to your User model
import { hash } from "bcryptjs"; // Adjust the import path to bcryptjs

const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().required()
});

export const dynamic = 'force-dynamic';

export async function POST(req) {
    await connectToDB();

    const { name, email, password, role } = await req.json();

    // Validate the schema
    const { error } = schema.validate({ name, email, password, role });

    if (error) {
        return NextResponse.json({
            success: false,
            message: error.details[0].message
        });
    }

    try {
        // Check if the user already exists
        const isUserAlreadyExists = await User.findOne({ email });

        if (isUserAlreadyExists) {
            return NextResponse.json({
                success: false,
                message: 'User already exists. Please try with a different email address.'
            });
        } else {
            const hashPassword = await hash(password, 12);
            const newlyCreatedUser = await User.create({
                name,
                email,
                password: hashPassword,
                role
            });

            if (newlyCreatedUser) {
                return NextResponse.json({
                    success: true,
                    message: 'Account created successfully.'
                });
            }
        }
    } catch (error) {
        console.error('Error in new user registration:', error);

        return NextResponse.json({
            success: false,
            message: 'Something went wrong! Please try again later.'
        });
    }
}
