import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signinInput, signUpInput } from '@pratikwasekar/blog-common';

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    }
}>();

userRouter.post('/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json()
  const { success } = signUpInput.safeParse(body);
  if(!success) {
    c.status(411);
    return c.json({
      message:"Invalid inputs"
    })
  } 
  try {
    const user = await prisma.user.create({
      data: {
        email: body.username,
        password: body.password,
        name: body.name
      },
    })

    const token = await sign({ id: user.id }, c.env.JWT_SECRET)

    return c.json({
      jwt: token
    })
  } catch (e) {
    c.status(403);
		return c.json({ error: "error while signing up" });
  }
})

userRouter.post('/signin', async (c) => {
   const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
  const body = await c.req.json();

  const { success } = signinInput.safeParse(body);
  if(!success) {
    c.status(411);
    return c.json({
      message: "Invalid inputs"
    })
  }
  try {
    const user = await prisma.user.findUnique({
    where: {
      email: body.username,
      password: body.password
    }
  })

  if (!user) {
    c.status(403)
    return c.json({
      error: "Incorrect creds"
    })
  }
  const token = await sign({id: user.id}, c.env.JWT_SECRET)
  return c.json({token})
  } catch (e) {
    console.log(e)
    c.status(411);
    return c.text('Invalid')
  }
  

})
