import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'users-details' })
export class UserDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column('text')
  address: string;

  @ApiProperty()
  @Column()
  phone: string;

  @ApiProperty()
  @Column('text')
  city: string;

  @ApiProperty()
  @Column('text')
  country: string;

  @ManyToOne(() => User, (user) => user.details, { onDelete: 'CASCADE' })
  user: User;
}
