import { Injectable, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { User } from '../entity/user.entity';
import { Role } from '../entity/role.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { RedisService } from 'src/service/redis.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    private jwtService: JwtService,
    private redisService: RedisService,
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
    
      async login(loginDto: LoginDto): Promise<LoginResponseDto> {
        const { email, password } = loginDto;
        const user = await this.userRepository.findOne({
          where: { 
            email,
            password: Not(IsNull()) 
          },
          relations: ['role'],
        });
    
        if (!user) {
          throw new Error('Identifiants invalides');
        }
    
        const isPasswordValid = await argon2.verify(user.password, password);
        if (!isPasswordValid) {
          throw new Error('Identifiants invalides');
        }
    
        const payload = { email: user.email, sub: user.id, roles: [user.role.name] };
        const accessToken = this.jwtService.sign(payload, { expiresIn: '4h' });
        
        const decodedToken = this.jwtService.decode(accessToken) as { exp: number };
        const expirationDate = new Date(decodedToken.exp * 1000);
    
        const response: LoginResponseDto = {
          id: user.id,
          name: user.name,
          firstName: user.firstName,
          email: user.email,
          role: user.role.name,
          
          expiration: expirationDate.toISOString(),
          accessToken: accessToken,
        };
    
        return response;
      }

      async inviteStudent(email: string, name: string, firstName: string): Promise<{ status: number; message: string; token?: never } | 
      { status: number; message: string; token: string }> {
        const existingUser = await this.userRepository.findOneBy({ email });
        if (existingUser) {
          return { status: HttpStatus.CONFLICT, message: 'Cet email est déjà utilisé' };
        }
    
        const studentRole = await this.roleRepository.findOneBy({ name: 'eleve' });
        if (!studentRole) {
          return { status: HttpStatus.BAD_REQUEST, message: 'Le rôle d\'élève n\'existe pas' };
        }
    
        const newUser = this.userRepository.create({
          email,
          name,
          firstName,
          role: studentRole,
        });
    
        const savedUser = await this.userRepository.save(newUser);
        
        const token = uuidv4();
        await this.redisService.setToken(token, savedUser.id, 86400); // jeton : 24 heures
        //console.log('Token:', token);
        
        
        return {
          status: HttpStatus.CREATED,
          message: 'Invitation envoyée avec succès',
          token: token
        };
    
      }
}
