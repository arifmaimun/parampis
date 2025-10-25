const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function testPrismaClient() {
  try {
    // Test koneksi database
    await prisma.$connect()
    console.log('✅ Database connected successfully!')
    
    // Test read existing data
    const users = await prisma.userProfile.findMany()
    console.log('✅ Users found:', users.length)
    
    // Test create new data
    const location = await prisma.location.create({
      data: {
        name: 'Home Visit',
        type: 'home_visit',
        address: 'Layanan Home Visit',
        isDefault: true
      }
    })
    console.log('✅ Location created:', location)
    
    // Test create animal species
    const species = await prisma.animalSpecies.createMany({
      data: [
        { name: 'Anjing', displayOrder: 1 },
        { name: 'Kucing', displayOrder: 2 },
        { name: 'Burung', displayOrder: 3 },
        { name: 'Reptil', displayOrder: 4 },
        { name: 'Kelinci', displayOrder: 5 },
        { name: 'Hamster', displayOrder: 6 }
      ]
    })
    console.log('✅ Animal species created:', species.count)
    
    await prisma.$disconnect()
    console.log('✅ Database disconnected successfully!')
  } catch (error) {
    console.error('❌ Database error:', error)
  }
}

testPrismaClient()
