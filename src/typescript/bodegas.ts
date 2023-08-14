import { Expose } from 'class-transformer';
import { IsString, IsDefined, IsNumber,IsDate, MaxLength, Max, IsOptional } from 'class-validator';   

export class Bodegas {
    
    @Expose({name: "id-bodega"})
    @IsDefined({ message: () => { throw { status: 422, message: "The id-bodega is required" } } })
    @IsNumber({}, { message: () => { throw { status: 406, message: "The id-bodega must be a number" } } })
    @Max(11, { message: () => { throw { status: 406, message: "The id-bodega cannot contain more than 11 characters"}}})
    ID_Bodega: number

    @Expose({name: 'nombre-bodega'})
    @IsDefined({ message: () => { throw { status: 422, message: "The nombre-bodega is required" } } })
    @IsString({ message: () => { throw { status: 406, message: "The nombre-bodega must be a string" } } })
    @MaxLength(25, { message: () => { throw { status: 406, message: "The nombre-bodega cannot contain more than 25 characters"}}})
    Nombre: string;

    @Expose({name: "responsable-bodega"})
    @IsDefined({ message: () => { throw { status: 422, message: "The responsable-bodega is required" } } })
    @IsNumber({}, { message: () => { throw { status: 406, message: "The responsable-bodega must be a number" } } })
    @Max(20, { message: () => { throw { status: 406, message: "The responsable-bodega cannot contain more than 20 characters"}}})
    Responsable: number

    @Expose({name: "estado-bodega"})
    @IsDefined({ message: () => { throw { status: 422, message: "The estado-bodega is required" } } })
    @IsNumber({}, { message: () => { throw { status: 406, message: "The estado-bodega must be a number" } } })
    @Max(1, { message: () => { throw { status: 406, message: "The estado-bodega cannot contain more than 1 characters"}}})
    Estado: number

    @Expose({name: "created-by"})
    @IsOptional()
    @IsNumber({}, { message: () => { throw { status: 406, message: "The created-by must be a number" } } })
    @Max(20, { message: () => { throw { status: 406, message: "The created-by cannot contain more than 20 characters"}}})
    Creador: number

    @Expose({name: "update-by"})
    @IsOptional()
    @IsNumber({}, { message: () => { throw { status: 406, message: "The update-by must be a number" } } })
    @Max(20, { message: () => { throw { status: 406, message: "The update-by cannot contain more than 20 characters"}}})
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

    constructor(data: Partial<Bodegas>) {
        Object.assign(this, data);
        this.ID_Bodega = 0;       
        this.Nombre = "Faker";
        this.Responsable = 0;
        this.Estado = 0;
        this.Creador = 0;
        this.Update = 0;
        this.CreatedAt = "Faker";
        this.UpdatedAt = "Faker";
        this.DeletedAt = "Faker";
    }
}