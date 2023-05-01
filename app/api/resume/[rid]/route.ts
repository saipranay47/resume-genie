import prisma from 'lib/prisma';
import * as z from 'zod';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

const routeContextSchema = z.object({
  params: z.object({
    rid: z.string(),
  }),
});

export async function DELETE(req: Request, context: z.infer<typeof routeContextSchema>) {

  try {
    const params = routeContextSchema.parse(context);

    if (!(await verifyCurrentUserHasAccessToPost(params.params.rid))) {
      return new Response(null, { status: 403 })
    }

    await prisma.resume.delete({
      where: {
        id: params.params.rid,
      },
    });

    return new Response(null, { status: 204 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }

}

async function verifyCurrentUserHasAccessToPost(resumeId: string) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return false
  }

  const count = await prisma.resume.count({
    where: {
      id: resumeId,
      userId: session?.user.id,
    },
  })

  return count > 0
}