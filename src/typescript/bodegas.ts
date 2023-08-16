import { Expose } from 'class-transformer';
import { IsString, IsDefined, IsNumber,IsDate, MaxLength, Max, IsOptional, ValidateIf, IsNotEmpty } from 'class-validator';   

export class BodegasG {
    
    @Expose({name: "id"})
    @IsDefined({ message: () => { throw { status: 422, message: "The id-bodega is required" } } })
    @IsNumber({}, { message: () => { throw { status: 406, message: "The id-bodega must be a number" } } })
    @Max(11, { message: () => { throw { status: 406, message: "The id-bodega cannot contain more than 11 characters"}}})
    ["id-bodega"]: number

    @Expose({name: 'Nombre'})
    @IsDefined({ message: () => { throw { status: 422, message: "The nombre-bodega is required" } } })
    @IsString({ message: () => { throw { status: 406, message: "The nombre-bodega must be a string" } } })
    @MaxLength(25, { message: () => { throw { status: 406, message: "The nombre-bodega cannot contain more than 25 characters"}}})
    ["nombre-bodega"]: string;

    @Expose({name: "id_responsable"})
    @IsDefined({ message: () => { throw { status: 422, message: "The responsable-bodega is required" } } })
    @IsNumber({}, { message: () => { throw { status: 406, message: "The responsable-bodega must be a number" } } })
    @Max(20, { message: () => { throw { status: 406, message: "The responsable-bodega cannot contain more than 20 characters"}}})
    ["responsable-bodega"]: number

    @Expose({name: "estado"})
    @IsDefined({ message: () => { throw { status: 422, message: "The estado-bodega is required" } } })
    @IsNumber({}, { message: () => { throw { status: 406, message: "The estado-bodega must be a number" } } })
    @Max(1, { message: () => { throw { status: 406, message: "The estado-bodega cannot contain more than 1 characters"}}})
    ["estado-bodega"]: number

    @Expose({name: "created_by"})
    @IsOptional()
    @IsNumber({}, { message: () => { throw { status: 406, message: "The created-by must be a number" } } })
    @Max(20, { message: () => { throw { status: 406, message: "The created-by cannot contain more than 20 characters"}}})
    ["created-by "]: number

    @Expose({name: "update_by"})
    @IsOptional()
    @IsNumber({}, { message: () => { throw { status: 406, message: "The update-by must be a number" } } })
    @Max(20, { message: () => { throw { status: 406, message: "The update-by cannot contain more than 20 characters"}}})
    ["update-by"]: number

    @Expose({name: "created_at"})
    @IsOptional()
    @IsDate({ message: () => { throw { status: 406, message: "The created-at must be a date" } } })
    ["created-at"]: string

    @Expose({name: "update_at"})
    @IsOptional()
    @IsDate({ message: () => { throw { status: 406, message: "The updated-at must be a date" } } })
    ["update-at"]: string

    @Expose({name: "deleted_at"})
    @IsOptional()
    @IsDate({ message: () => { throw { status: 406, message: "The deleted-at must be a date" } } })
    ["deleted-at"]: string

    constructor(data: Partial<BodegasG>) {Object.assign(this, data)}
}

export class BodegasP {
    
    @Expose({name: "id-bodega"})
    @IsNotEmpty({ message: () => { throw { status: 422, message: "The id-bodega cannot be empty" } } })
    @IsDefined({ message: () => { throw { status: 422, message: "The id-bodega is required" } } })
    @IsNumber({}, { message: () => { throw { status: 406, message: "The id-bodega must be a number" } } })
    @Max(11, { message: () => { throw { status: 406, message: "The id-bodega cannot contain more than 11 characters"}}})
    ID_Bodega: number

    @Expose({name: 'nombre-bodega'})
    @IsNotEmpty({ message: () => { throw { status: 422, message: "The nombre-bodega cannot be empty" } } })
    @IsDefined({ message: () => { throw { status: 422, message: "The nombre-bodega is required" } } })
    @MaxLength(25, { message: () => { throw { status: 406, message: "The nombre-bodega cannot contain more than 25 characters"}}})
    @IsString({ message: () => { throw { status: 406, message: "The nombre-bodega must be a string" } } })
    Nombre: string;

    @Expose({name: "responsable-bodega"})
    @IsNotEmpty({ message: () => { throw { status: 422, message: "The responsable-bodega cannot be empty" } } })
    @IsDefined({ message: () => { throw { status: 422, message: "The responsable-bodega is required" } } })
    @Max(20, { message: () => { throw { status: 406, message: "The responsable-bodega cannot contain more than 20 characters"}}})
    @IsNumber({}, { message: () => { throw { status: 406, message: "The responsable-bodega must be a number" } } })
    Responsable: number

    @Expose({name: "estado-bodega"})
    @IsNotEmpty({ message: () => { throw { status: 422, message: "The estado-bodega cannot be empty" } } })
    @IsDefined({ message: () => { throw { status: 422, message: "The estado-bodega is required" } } })
    @Max(1, { message: () => { throw { status: 406, message: "The estado-bodega cannot contain more than 1 characters"}}})
    @IsNumber({}, { message: () => { throw { status: 406, message: "The estado-bodega must be a number" } } })
    Estado: number

    @Expose({name: "created-by"})
    @IsOptional()
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

    constructor(data: Partial<BodegasP>) {Object.assign(this, data)}
}