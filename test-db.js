const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function testDatabase() {
  try {
    // Test koneksi database
    await prisma.$connect()
    console.log('✅ Database connected successfully!')
    
    // Test create data
    const user = await prisma.userProfile.create({
      data: {
        fullName: 'Dr. Arif Maimun',
        phone: '081234567890',
        email: 'arif@example.com',
        address: 'Jakarta'
      }
    })
    console.log('✅ User created:', user)
    
    // Test read data
    const users = await prisma.userProfile.findMany()
    console.log('✅ Users found:', users.length)
    
    await prisma.$disconnect()
    console.log('✅ Database disconnected successfully!')
  } catch (error) {
    console.error('❌ Database error:', error)
  }
}

testDatabase()
