import { DataSource } from 'typeorm';
import { User } from '../../entity/user.entity';
import { Role } from '../../entity/role.entity';
import { createUserFactory } from '../factory/user.factory';
import { hashPassword } from '../../utils/password.utils';

const TEST_PASSWORD = '12AZaz..%%';

export async function seedUsers(dataSource: DataSource) {
  const userRepository = dataSource.getRepository(User);
  const roleRepository = dataSource.getRepository(Role);

  const existingUsers = await userRepository.find();

  if (existingUsers.length === 0) {
    const roles = await roleRepository.find();
    const hashedTestPassword = await hashPassword(TEST_PASSWORD);

    const users = [];

    // Créer des utilisateurs aléatoires
    for (let i = 0; i < 5; i++) {
      const user = createUserFactory();
      user.role = roles[Math.floor(Math.random() * roles.length)];
      user.password = hashedTestPassword;
      users.push(user);
    }

    // Créer des utilisateurs de test spécifiques
    const testUsers = [
      { email: 'prof@test.com', role: 'professeur' },
      { email: 'eleve@test.com', role: 'eleve' },
      { email: 'assistant@test.com', role: 'assistant professeur' },
    ];

    for (const testUser of testUsers) {
      const role = roles.find((r) => r.name === testUser.role);
      if (role) {
        const user = userRepository.create({
          name: 'Test',
          firstName: testUser.role,
          email: testUser.email,
          password: hashedTestPassword,
          role: role,
        });
        users.push(user);
      }
    }

    await userRepository.save(users);
    console.log('Users seeded successfully');
    console.log('Test password for all accounts:', TEST_PASSWORD);
  } else {
    console.log('Users already exist, skipping seeding');
  }
}
