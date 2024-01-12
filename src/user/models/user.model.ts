import { Column, DataType, Model, Table, Unique } from 'sequelize-typescript';
import Sequelize from 'sequelize';

@Table({ timestamps: true })
export class User extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Unique({
    name: 'email',
    msg: 'user with this email already exists',
  })
  @Column(DataType.STRING)
  email: string;
}
