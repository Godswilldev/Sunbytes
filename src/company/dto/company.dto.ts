import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsAlpha, IsAlphanumeric, IsInt } from "class-validator";

export interface TestInterface {
  owner: number;
  name: string;
  company: string;
}

export class CompanyDto implements TestInterface {
  @ApiProperty({ example: "hday334-ewui4-3whdsi-3836-dke0" })
  id: string;

  @ApiProperty({ example: 12 })
  owner: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  company: string;
}

export class CreateCompanyDto implements TestInterface {
  @ApiProperty()
  @IsInt()
  owner: number;

  @ApiProperty()
  @IsAlpha()
  name: string;

  @ApiProperty()
  @IsAlphanumeric()
  company: string;
}

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {}
