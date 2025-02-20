import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.user.createMany({
        data: [
            {
                email: 'brayanrl0322@gmail.com',
                password: 'hashed_password1', // Recuerda usar bcrypt para encriptar
                fullName: 'Test User 1',
                isActive: true
            },
        ],
    });

    console.log('Seed data inserted successfully');
}

main()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
