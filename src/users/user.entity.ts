import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, ManyToMany, JoinTable } from 'typeorm';
import { hash } from 'bcrypt';
import { Rol } from 'src/roles/rol.entity';

@Entity({name: 'users'})
export class User {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: String;

    @Column()
    lastname: String;
    
    @Column({ unique: true})
    email: String;
    
    @Column({ unique: true})
    phone: String;

    @Column({nullable: true})
    image: String;

    @Column()
    password: String;

    @Column({nullable: true})
    notification_token: String;

    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date;

    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    updated_at: Date;

    @JoinTable({
        name: 'user_has_roles',
        joinColumn: {
            name: 'id_user'
        },
        inverseJoinColumn: {
            name: 'id_rol'
        }
    })
    @ManyToMany(() => Rol, (rol) => rol.users)
    roles: Rol[];

    @BeforeInsert()
    async hashPassword(){
        this.password = await hash(this.password, Number(process.env.HASH_SALT));
    }

}