import { Expose } from 'class-transformer';
import { IsString, IsDefined, IsNumber,IsDate, MaxLength,IsOptional,IsNotEmpty,ValidateIf,Max } from 'class-validator';

export class ProductosG {
    @Expose({ name: "id"})
    @ValidateIf(o => o["id-producto"] !== undefined)
    @IsNotEmpty({ message: 'The id-producto cannot be empty' })
    @IsDefined({ message: () => { throw { status: 422, message: "The id-producto is required" } } })
    @IsNumber({}, { message: () => { throw { status: 406, message: "The id-producto must be a number" } } })
    ["id-producto"]: number;

    @Expose({ name: "Nombre"})
    @ValidateIf(o => o["nombre-productos"] !== undefined)
    @IsNotEmpty({ message: 'The nombre-productos cannot be empty' })
    @IsDefined({ message: () => { throw { status: 422, message: "The nombre-productos is required" } } })
    @MaxLength(25, { message: () => { throw { status: 406, message: "The nombre-productos must be less than 50 characters" } } })
    @IsString({ message: () => { throw { status: 406, message: "The nombre-productos must be a string" } } })
    ["nombre-productos"]: string;

    @Expose({ name: "Descripcion"})
    @ValidateIf(o => o["descripcion-productos"] !== undefined)
    @IsNotEmpty({ message: 'The descripcion-productos cannot be empty' })
    @IsDefined({ message: () => { throw { status: 422, message: "The descripcion-productos is required" } } })
    @MaxLength(50, { message: () => { throw { status: 406, message: "The descripcion-productos must be less than 50 characters" } } })
    @IsString({ message: () => { throw { status: 406, message: "The descripcion-productos must be a string" } } })
    ["descripcion-productos"]: string;

    @Expose({name: "estado"})
    @ValidateIf(o => o["estado-productos"] !== undefined)
    @IsNotEmpty({ message: 'The estado-productos cannot be empty' })
    @IsDefined({ message: () => { throw { status: 422, message: "The estado-productos is required" } } })
    @MaxLength(1, { message: () => { throw { status: 406, message: "The estado-productos must be less than 50 characters" } } })
    @IsString({ message: () => { throw { status: 406, message: "The estado-productos must be a string" } } })
    ["estado-productos"]: string;

    @Expose({name: "created_by"})
    @ValidateIf(o => o["created-by"] !== undefined)
    @IsNotEmpty({ message: 'The created-by cannot be empty' })
    @IsDefined({ message: () => { throw { status: 422, message: "The created-by is required" } } })
    @IsString({ message: () => { throw { status: 406, message: "The created-by must be a string" } } })
    ["created-by"]: string;

    @Expose({name: "created_at"})
    @ValidateIf(o => o["created-at"] !== undefined)
    @IsNotEmpty({ message: 'The created-at cannot be empty' })
    @IsDefined({ message: () => { throw { status: 422, message: "The created-at is required" } } })
    @IsDate({ message: () => { throw { status: 406, message: "The created-at must be a date" } } })
    ["created-at"]: Date;

    @Expose({name: "updated_by"})
    @ValidateIf(o => o["updated-by"] !== undefined)
    @IsNotEmpty({ message: 'The updated-by cannot be empty' })
    @IsDefined({ message: () => { throw { status: 422, message: "The updated-by is required" } } })
    @IsString({ message: () => { throw { status: 406, message: "The updated-by must be a string" } } })
    ["updated-by"]: string;

    @Expose({name: "updated_at"})
    @ValidateIf(o => o["updated-at"] !== undefined)
    @IsNotEmpty({ message: 'The updated-at cannot be empty' })
    @IsDefined({ message: () => { throw { status: 422, message: "The updated-at is required" } } })
    @IsDate({ message: () => { throw { status: 406, message: "The updated-at must be a date" } } }) 
    ["updated-at"]: Date;

    @Expose({name: "deleted_at"})
    @ValidateIf(o => o["deleted-at"] !== undefined)
    @IsNotEmpty({ message: 'The deleted-at cannot be empty' })
    @IsDefined({ message: () => { throw { status: 422, message: "The deleted-at is required" } } })
    @IsDate({ message: () => { throw { status: 406, message: "The deleted-at must be a date" } } })
    ["deleted-at"]: Date;

    constructor(data: Partial<ProductosG>) {Object.assign(this, data)}
}

export class ProductosGT {
    
    @Expose({ name: '_id'})
    @ValidateIf(o => 0["id-producto"] !== undefined)
    @IsNotEmpty({ message: 'The id-producto cannot be empty' })
    @IsDefined({ message: () => { throw { status: 422, message: "The id-producto is required" } } })
    @IsNumber({}, { message: () => { throw { status: 406, message: "The id-producto must be a number" } } })
    ["id-producto"]: number;

    @Expose({ name: 'Nombre'})
    @ValidateIf(o => o["nombre-productos"] !== undefined)
    @IsNotEmpty({ message: 'The nombre-productos cannot be empty' })
    @IsDefined({ message: () => { throw { status: 422, message: "The nombre-productos is required" } } })
    @MaxLength(25, { message: () => { throw { status: 406, message: "The nombre-productos must be less than 50 characters" } } })
    @IsString({ message: () => { throw { status: 406, message: "The nombre-productos must be a string" } } })
    ["nombre-productos"]: string;

    @Expose({ name: "total_cantidad"})
    @ValidateIf(o => o["cantidad-total"] !== undefined)
    @IsNotEmpty({ message: 'The cantidad-total cannot be empty' })
    @IsDefined({ message: () => { throw { status: 422, message: "The cantidad-total is required" } } })
    @IsNumber({}, { message: () => { throw { status: 406, message: "The cantidad-total must be a number" } } })
    ["cantidad-total"]: number;

    constructor(data: Partial<ProductosGT>) {Object.assign(this, data)}
}

export class ProductosP {
    
    @Expose({name: "id-producto"})
    @IsNotEmpty({ message: () => { throw { status: 422, message: "The id-producto cannot be empty" } } })
    @IsDefined({ message: () => { throw { status: 422, message: "The id-producto is required" } } })
    @IsNumber({}, { message: () => { throw { status: 406, message: "The id-producto must be a number" } } })
    @Max(11, { message: () => { throw { status: 406, message: "The id-producto cannot contain more than 11 characters"}}})
    ID_Producto: number

    @Expose({name: 'nombre-producto'})
    @IsNotEmpty({ message: () => { throw { status: 422, message: "The nombre-producto cannot be empty" } } })
    @IsDefined({ message: () => { throw { status: 422, message: "The nombre-producto is required" } } })
    @MaxLength(25, { message: () => { throw { status: 406, message: "The nombre-producto cannot contain more than 25 characters"}}})
    @IsString({ message: () => { throw { status: 406, message: "The nombre-producto must be a string" } } })
    Nombre: string;

    @Expose({name: "descripcion-producto"})
    @IsNotEmpty({ message: () => { throw { status: 422, message: "The descripcion-producto cannot be empty" } } })
    @IsDefined({ message: () => { throw { status: 422, message: "The descripcion-producto is required" } } })
    @MaxLength(100, { message: () => { throw { status: 406, message: "The descripcion-producto cannot contain more than 100 characters"}}})
    @IsString( { message: () => { throw { status: 406, message: "The descripcion-producto must be a string" } } })
    Description: string

    @Expose({name: "estado-producto"})
    @IsNotEmpty({ message: () => { throw { status: 422, message: "The estado-producto cannot be empty" } } })
    @IsDefined({ message: () => { throw { status: 422, message: "The estado-producto is required" } } })
    @Max(1, { message: () => { throw { status: 406, message: "The estado-producto cannot contain more than 1 characters"}}})
    @IsNumber({}, { message: () => { throw { status: 406, message: "The estado-producto must be a number" } } })
    Estado: number

    @Expose({name: "created-by"})
    @IsNotEmpty({ message: () => { throw { status: 422, message: "The created-by cannot be empty" } } })
    @IsDefined({ message: () => { throw { status: 422, message: "The created-by is required" } } })
    @Max(20, { message: () => { throw { status: 406, message: "The created-by cannot contain more than 20 characters"}}})
    @IsNumber({}, { message: () => { throw { status: 406, message: "The created-by must be a number" } } })
    Creador: number

    @Expose({name: "update-by"})
    @IsOptional()
    @Max(20, { message: () => { throw { status: 406, message: "The update-by cannot contain more than 20 characters"}}})
    @IsNumber({}, { message: () => { throw { status: 406, message: "The update-by must be a number" } } })
    Update: number

    @Expose({name: "created-at"})
    @IsOptional()
    @IsDate({ message: () => { throw { status: 406, message: "The created-at must be a date" } } })
    CreatedAt: string

    @Expose({name: "updated-at"})
    @IsOptional()
    @IsDate({ message: () => { throw { status: 406, message: "The updated-at must be a date" } } })
    UpdatedAt: string

    @Expose({name: "deleted-at"})
    @IsOptional()
    @IsDate({ message: () => { throw { status: 406, message: "The deleted-at must be a date" } } })
    DeletedAt: string

    constructor(data: Partial<ProductosP>) {Object.assign(this, data)}
}