import { IsNotEmpty, IsInt, IsOptional, IsString } from 'class-validator';

export class EditCurriculumVitaeDto {
  @IsString()
  @IsNotEmpty()
  fullName?: string;

  @IsString()
  @IsNotEmpty()
  email?: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  // // @IsInt()
  // @IsNotEmpty()
  // phone?: number;

  @IsString()
  @IsNotEmpty()
  personalStatement?: string;

  @IsString()
  @IsNotEmpty()
  educationAndQualification?: string;

  @IsString()
  @IsNotEmpty()
  skills?: string;

  @IsString()
  @IsNotEmpty()
  languages?: string;

  @IsString()
  @IsNotEmpty()
  certifications?: string;

  @IsString()
  @IsOptional()
  workExperience?: string;

  @IsOptional()
  @IsString()
  hobbiesAndInterests?: string;
}
