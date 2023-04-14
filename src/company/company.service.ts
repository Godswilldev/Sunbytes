import { Like, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Company } from "src/company/entities/company.entity";
import { shuffle, shuffleNumbers } from "src/utils/company.utils";
import { QueryDto, paginateResponse } from "src/utils/pagination.utils";
import { ResponseManager, StandardResponse } from "src/utils/responseManager.utils";
import {
  CreateCompanyDto,
  CompanyDto,
  UpdateCompanyDto,
  TestInterface,
} from "src/company/dto/company.dto";

@Injectable()
export class CompanyService {
  constructor(@InjectRepository(Company) private companyRepository: Repository<Company>) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<StandardResponse<CompanyDto>> {
    const shuffledData: TestInterface = {
      owner: shuffleNumbers(createCompanyDto.owner),
      name: shuffle(createCompanyDto.name),
      company: shuffle(createCompanyDto.company),
    };

    const newCompany = this.companyRepository.create(shuffledData);

    await newCompany.save();

    return ResponseManager.StandardResponse({
      code: 201,
      status: "success",
      message: "company created successfully",
      data: newCompany,
    });
  }

  async findAll(query: QueryDto): Promise<StandardResponse<Company[]>> {
    const limit = query.limit || 10;
    const page = query.page || 1;
    const skip = (page - 1) * limit;
    const search = query.search || "";

    const companies = await this.companyRepository.findAndCount({
      where: [{ name: Like(`%${search}%`), company: Like(`%${search}%`) }],
      take: limit,
      skip,
    });

    return ResponseManager.StandardResponse({
      code: 200,
      message: "product fetched successfully",
      ...paginateResponse(companies, page, limit),
    });
  }

  async findOne(id: string): Promise<StandardResponse<Company>> {
    const company = await this.companyRepository.findOneBy({ id });

    if (!company) {
      ResponseManager.NotFoundResponse("company doesn't exist");
    }

    return ResponseManager.StandardResponse({
      status: "success",
      code: 200,
      message: "Company retrieved Successfully",
      data: company,
    });
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto): Promise<StandardResponse<Company>> {
    const company = await this.companyRepository.findOneBy({ id });

    if (!company) {
      ResponseManager.NotFoundResponse("company doesn't exist");
    }

    await this.companyRepository.update({ id }, { ...updateCompanyDto });

    return ResponseManager.StandardResponse({
      status: "success",
      code: 200,
      message: "Company Updated Successfully",
      data: company,
    });
  }

  async remove(id: string): Promise<StandardResponse<null>> {
    const company = await this.companyRepository.findOneBy({ id });

    if (!company) {
      ResponseManager.NotFoundResponse("company doesn't exist");
    }
    await this.companyRepository.delete({ id });

    return ResponseManager.StandardResponse({
      status: "success",
      code: 204,
      message: "Company deleted Successfully",
      data: null,
    });
  }
}
