import { Entity, Column } from "typeorm";
import BaseModel from "src/entities/baseModel.entity";
import { TestInterface } from "src/company/dto/company.dto";

@Entity()
export class Company extends BaseModel implements TestInterface {
  @Column({ nullable: false, type: "int" })
  owner: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  company: string;
}
