import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(request : Request){
    
    try {
        const session = await getServerSession(authOptions)
        
        if (!session) {
            return new Response("Unauthorized", { status: 403 })
        }
        
        const { user } = session
        const resumes = await prisma.resume.findMany({
            where: {
                userId : user.id,
            },
        })
        
        return new Response(JSON.stringify(resumes))
    } catch (error) {
        return new Response(null, { status: 500 })
    }
    
}

export async function POST(request: Request){
    // const body = await request.json();
    // const uid = body.uid;

    const session = await getServerSession(authOptions)

    if (!session) {
        return new Response("Unauthorized", { status: 403 })
    }

    const { user } = session;
    const uid = user.id;

    const personalInfo = await prisma.personalInfo.create({
        data: {
            fullName: '',
            phone: '',
            address: '',
            city: '',
            state: '',
            country: '',
            postalCode: '',
            website: '',
            summary: '',
        },
    });

    const newResume = await prisma.resume.create({
        data: {
            userId: uid,
            personalInfoId: personalInfo.id,
            educations: {
                create: [
                    {
                        institution: '',
                        degree: '',
                        fieldOfStudy: '',
                        startDate: new Date(),
                        endDate: null,
                        achievements: '',
                    },
                ],
            },
            workExperiences: {
                create: [
                    {
                        title: '',
                        company: '',
                        location: '',
                        startDate: new Date(),
                        endDate: null,
                        description: '',
                    },
                ],
            },
            skills: {
                create: [
                    {
                        name: '',
                        level: '',
                    },
                ],
            },
            projects: {
                create: [
                    {
                        name: '',
                        description: '',
                        url: '',
                    },
                ],
            },
        },
    });

    // Increment resumeCount for the user
    await prisma.user.update({
        where: {
            id: uid,
        },
        data: {
            resumeCount: {
                increment: 1,
            },
        },
    });

    return new Response(JSON.stringify(newResume), {status: 201});
}

