import { Matches, IsOptional, IsNumber, IsAlphanumeric, IsAscii, IsObject, IsEmail, IsString, MaxLength, MinLength, IsDateString, IsNotEmpty } from "class-validator"
import { messages } from "src/common/messages";
import { Expose, Type } from 'class-transformer';

export class UpdateUserDto {
    @Expose()
    @IsNotEmpty({ message: messages.ID_INVALID }) // Ensure the id is provided in the update request
    @IsNumber()
    @Type(() => Number)
    id: number;

    @Expose()
    @IsOptional()
    @IsEmail({ require_tld: true }, { message: messages.EMAIL_INVALID }) // Validate email format
    email?: string;     // Ensure the email is a valid email format

    @Expose()
    @IsOptional()
    @IsString()        // Ensure the password is a string
    @IsAscii()         // Ensure the password is ASCII characters only (not 2 byte characters)
    @MinLength(8)      // Minimum length of 8 characters
    @MaxLength(16)     // Maximum length of 16 characters
    @IsAlphanumeric()  // Ensure the password is alphanumeric
    pw?: string;

    @Expose()
    @IsOptional()
    @Matches(/^[A-Za-z\s]+$/, {
        message: messages.FIRST_NAME_INVALID,
    })
    @MaxLength(16)     // Maximum length of 16 characters
    first_name?: string;

    @Expose()
    @IsOptional()
    @Matches(/^[A-Za-z\s]+$/, {
        message: messages.LAST_NAME_INVALID,
    })
    @MaxLength(16)     // Maximum length of 16 characters
    last_name?: string;

    @Expose()
    @IsOptional()
    @IsDateString()          // Ensure the date of birth is a valid date
    date_of_birth?: Date;

    @Expose()
    @IsOptional()
    @IsString()        // Ensure the phone number is a string
    @MaxLength(15)     // Maximum length of 15 characters
    phone?: string;

    @Expose()
    @MaxLength(50)     // Maximum length of 15 characters
    @IsOptional()
    @IsString()
    address?: string;

    @Expose()
    @IsObject()
    @IsOptional()
    delivery?: Record<string, string>;

    @Expose()
    @IsOptional()
    enabled?: boolean = true;
    @Expose()
    @IsOptional()
    created_at?: Date;
    @Expose()
    @IsOptional()
    updated_at?: Date = new Date();
}