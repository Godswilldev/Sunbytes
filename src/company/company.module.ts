import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CompanyService } from "src/company/company.service";
import { Company } from "src/company/entities/company.entity";
import { CompanyController } from "src/company/company.controller";

@Module({
  controllers: [CompanyController],
  providers: [CompanyService],
  imports: [TypeOrmModule.forFeature([Company])],
})
export class CompanyModule {}
