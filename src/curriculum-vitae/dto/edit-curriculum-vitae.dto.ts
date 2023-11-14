import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EditCurriculumVitaeDto {
  @ApiPropertyOptional({
    description: 'The full name of your CV',
    example: 'morgan freeman',
  })
  @IsString()
  @IsNotEmpty()
  fullName?: string;

  @ApiPropertyOptional({
    description: 'The email of your CV',
    example: 'morganfreeman@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  email?: string;

  @ApiPropertyOptional({
    description: 'The location of your CV',
    example: 'canada',
  })
  @IsString()
  @IsNotEmpty()
  location: string;

  // // @IsInt()
  // @IsNotEmpty()
  // phone?: number;

  @ApiPropertyOptional({
    description: 'The personal statement of your CV',
    example:
      'I am a qualified and experienced doctor with a passion for providing quality health care to patients. I have a strong background in general medicine, surgery, and emergency care, as well as certifications in various specialties. I am looking for a challenging and rewarding position in a reputable hospital where I can apply my skills and knowledge to improve the well-being of the community.',
  })
  @IsString()
  @IsNotEmpty()
  personalStatement?: string;

  @ApiPropertyOptional({
    description: 'The education and qualification of your CV',
    example:
      'I am a qualified and experienced doctor with a passion for providing quality health care to patients. I have a strong background in general medicine, surgery, and emergency care, as well as certifications in various specialties. I am looking for a challenging and rewarding position in a reputable hospital where I can apply my skills and knowledge to improve the well-being of the community.',
  })
  @IsString()
  @IsNotEmpty()
  educationAndQualification?: string;

  @ApiPropertyOptional({
    description: 'The skills of your CV',
    example:
      'critical thinking, emotional intelligence, teamwork, time management, problem-solving and a strong work ethic.',
  })
  @IsString()
  @IsNotEmpty()
  skills?: string;

  @ApiPropertyOptional({
    description: 'The languages of your CV',
    example: 'Spanish, English',
  })
  @IsString()
  @IsNotEmpty()
  languages?: string;

  @ApiPropertyOptional({
    description: 'The certifications of your CV',
    example: 'ECFMG Certification',
  })
  @IsString()
  @IsNotEmpty()
  certifications?: string;

  @ApiPropertyOptional({
    description: 'The working experience of your CV',
    example: '2009-2021: working in muhima hospital',
  })
  @IsString()
  @IsOptional()
  workExperience?: string;

  @ApiPropertyOptional({
    description: 'The working experience of your CV',
    example: 'reading book',
  })
  @IsOptional()
  @IsString()
  hobbiesAndInterests?: string;
}
