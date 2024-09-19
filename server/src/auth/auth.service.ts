import { Injectable, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { User } from '../entity/user.entity';
import { Role } from '../entity/role.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<{ status: number; message: string; user?: User }> {
    const { name, firstName, email, password } = registerDto;
  
    const existingUser = await this.userRepository.findOneBy({ email });
    if (existingUser) {
      return { status: HttpStatus.CONFLICT, message: 'Cet email est déjà utilisé' };
    }
   
    const hashedPassword = await argon2.hash(password);
   
    const professeurRole = await this.roleRepository.findOneBy({ name: 'professeur' });
    if (!professeurRole) {
      return { status: HttpStatus.BAD_REQUEST, message: 'Le rôle de professeur n\'existe pas' };
    }
    
    const newUser = this.userRepository.create({
      name,
      firstName,
      email,
      password: hashedPassword,
      role: professeurRole,
    });

    const savedUser = await this.userRepository.save(newUser);
    return { status: HttpStatus.CREATED, message: 'Compte professeur créé avec succès', user: savedUser };
  }

async login(loginDto: LoginDto): Promise<{ status: number; message: string; accessToken?: string }> {
  const { email, password } = loginDto;
  const user = await this.userRepository.findOne({
    where: { email },
    relations: ['role'],
  });

  if (!user) {
    return { status: HttpStatus.UNAUTHORIZED, message: 'Identifiants invalides' };
  }

  if (user.role.name !== 'professeur') {
    return { status: HttpStatus.UNAUTHORIZED, message: 'Utilisateur non autorisé' };
  }

  const isPasswordValid = await argon2.verify(user.password, password);
  if (!isPasswordValid) {
    return { status: HttpStatus.UNAUTHORIZED, message: 'Identifiants invalides' };
  }

  const payload = { email: user.email, sub: user.id, roles: [user.role.name] };
  const accessToken = this.jwtService.sign(payload, { expiresIn: '4h' });
  
  const decodedToken = this.jwtService.decode(accessToken) as { exp: number };
  const expirationDate = new Date(decodedToken.exp * 1000);
  console.log(`Token généré avec expiration le ${expirationDate.toLocaleString()} (dans 4 heures)`);

  return { status: HttpStatus.OK, message: 'Connexion réussie', accessToken } 
  }
}
