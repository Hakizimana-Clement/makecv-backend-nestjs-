import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCurriculumVitaeDto {
  @ApiProperty({
    description: 'The full name of your CV',
    example: 'morgan freeman',
  })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    description: 'The email of your CV',
    example: 'morganfreeman@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The location of your CV',
    example: 'canada',
  })
  @IsString()
  @IsNotEmpty()
  location: string;

  // // @IsString()
  // // @IsInt()
  // @IsNotEmpty()
  // phone: number;

  @ApiProperty({
    description: 'The personal statement of your CV',
    example:
      'I am a qualified and experienced doctor with a passion for providing quality health care to patients. I have a strong background in general medicine, surgery, and emergency care, as well as certifications in various specialties. I am looking for a challenging and rewarding position in a reputable hospital where I can apply my skills and knowledge to improve the well-being of the community.',
  })
  @IsString()
  @IsNotEmpty()
  personalStatement: string;

  @ApiProperty({
    description: 'The education and qualification of your CV',
    example:
      'I am a qualified and experienced doctor with a passion for providing quality health care to patients. I have a strong background in general medicine, surgery, and emergency care, as well as certifications in various specialties. I am looking for a challenging and rewarding position in a reputable hospital where I can apply my skills and knowledge to improve the well-being of the community.',
  })
  @IsString()
  @IsNotEmpty()
  educationAndQualification: string;

  @ApiProperty({
    description: 'The skills of your CV',
    example:
      'critical thinking, emotional intelligence, teamwork, time management, problem-solving and a strong work ethic.',
  })
  @IsString()
  @IsNotEmpty()
  skills: string;

  @ApiProperty({
    description: 'The languages of your CV',
    example: 'Spanish, English',
  })
  @IsString()
  @IsNotEmpty()
  languages: string;

  @ApiProperty({
    description: 'The certifications of your CV',
    example: 'ECFMG Certification',
  })
  @IsString()
  @IsNotEmpty()
  certifications: string;

  @ApiProperty({
    description: 'The working experience of your CV',
    example: '2009-2021: working in muhima hospital',
  })
  @IsString()
  @IsOptional()
  workExperience?: string;

  @ApiProperty({
    description: 'The working experience of your CV',
    example: 'reading book',
  })
  @IsOptional()
  @IsString()
  hobbiesAndInterests?: string;
}
