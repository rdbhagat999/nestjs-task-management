import { Exclude, Expose } from 'class-transformer';
import { type } from 'node:os';
import { Task } from 'src/tasks/models/task.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { IUser } from './user.interface';

@Unique(['username', 'email'])
@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Exclude()
  @CreateDateColumn()
  createdAt: string;

  @Exclude()
  @UpdateDateColumn()
  updatedAt: string;

  @Exclude()
  @Column()
  salt: string;

  @OneToMany((type) => Task, (task) => task.user, { eager: true })
  tasks: Task[];

  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
