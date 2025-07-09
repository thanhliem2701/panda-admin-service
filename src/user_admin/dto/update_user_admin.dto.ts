import { Matches, IsOptional, IsNumber, IsAlphanumeric, IsAscii,  IsEmail, IsIn, IsString, MaxLength, MinLength, IsDateString, IsNotEmpty, IsBoolean } from "class-validator"
import { messages } from "src/common/messages";
import { Expose,Type } from 'class-transformer';

export class UpdateUserAdminDto {
    @Expose()
    @IsNotEmpty({ message: messages.ID_INVALID }) // Ensure the id is not provided in the update request
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
    @IsAlphanumeric()  // Ensure the phone number is alphanumeric
    @MaxLength(15)     // Maximum length of 15 characters
    phone?: string;

    @Expose()
    @IsOptional()
    @IsString()        // Ensure the role is a string
    @IsIn(["ADMIN", "OPERATOR"]) // Ensure the role is either ADMIN 
    role?: string = "ADMIN";

    @Expose()
    @IsBoolean()
    @IsOptional()
    enabled?: boolean = true;

}