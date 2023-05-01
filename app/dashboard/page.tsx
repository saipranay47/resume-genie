import React from 'react';
import Balancer from 'react-wrap-balancer';
import ResumeCard from '@/components/dashboard/resume-card';
import CreateResumeButton from '@/components/dashboard/create-resume';
import { getCurrentUser } from '@/lib/session';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';

export default async function Dashboard() {

  // const [resumes , setResumes] = React.useState([]);

  const user = await getCurrentUser();

  if (!user) {
    redirect("/");
  }

  const resumes = await prisma.resume.findMany({
    where: {
      userId: user.id,
    },
  })
  // console.log(resumes);
  // setResumes(res);

  return (
    <>
      <div className="z-10 w-full px-5 xl:px-0">
        <div className='flex w-full justify-between items-center'>
          <h1
            className="w-full animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text  font-display text-3xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:text-5xl md:leading-[5rem]"
            style={{ animationDelay: '0.15s', animationFillMode: 'forwards' }}
          >
            <Balancer>Your Resumes</Balancer>
          </h1>
          <CreateResumeButton className="w-[140px] bg-sky-400 text-white" />
        </div>

        <div className="w-full flex mt-20 flex-wrap">
          {/* <ResumeCard title="Pranay" />
          <ResumeCard title="Pranay" /> */}

          {/* if resume length is 0 then display text */}
          {resumes.length === 0 && (
            <div className="flex flex-col items-center justify-center w-full h-full">
              <h1 className="text-3xl font-medium">No Resumes Found</h1>
              <p className="text-gray-500">Create a new resume to get started</p>
            </div>
          )}
          {
            resumes.map((resume) => (
              <ResumeCard key={resume.id} title={resume.title} id={resume.id} />
            ))
          }
        </div>
      </div>
    </>
  );
}

