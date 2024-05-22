import { Pool } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";

export const runtime = 'edge'

const prismaClientSingleton = () => {
    const neon = new Pool({ connectionString: process.env.POSTGRES_PRISMA_URL })
    const adapter = new PrismaNeon(neon)
    const prisma = new PrismaClient({ adapter })
    return prisma
};

declare global {
    var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if(process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma