import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCurriculumVitaeDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  // @IsString()
  // @IsInt()
  // @IsNotEmpty()
  // phone: string;

  @IsString()
  @IsNotEmpty()
  personalStatement: string;

  @IsString()
  @IsNotEmpty()
  educationAndQualification: string;

  @IsString()
  @IsNotEmpty()
  skills: string;

  @IsString()
  @IsNotEmpty()
  languages: string;

  @IsString()
  @IsNotEmpty()
  certifications: string;

  @IsString()
  @IsOptional()
  workExperience?: string;

  @IsOptional()
  @IsString()
  hobbiesAndInterests?: string;
}
