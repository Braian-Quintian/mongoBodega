var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
export class validateProductos {
    constructor(p1, p2, p3, p4, p5) {
        this.NOM = p1;
        this.DESCRIPCION = p2;
        this.ESTADO = p3;
        this.CREADOR = p4;
        this.ACTUALIZADOR = p5;
    }
}
__decorate([
    Expose({ name: 'nombre' }),
    IsString({ message: 'Nombre must be a string' }),
    __metadata("design:type", String)
], validateProductos.prototype, "NOM", void 0);
__decorate([
    Expose({ name: 'descripcion' }),
    IsString({ message: 'Descripcion must be a string' }),
    __metadata("design:type", String)
], validateProductos.prototype, "DESCRIPCION", void 0);
__decorate([
    Expose({ name: 'estado' }),
    IsNumber({}, { message: 'Estado must be a number' }),
    __metadata("design:type", Number)
], validateProductos.prototype, "ESTADO", void 0);
__decorate([
    Expose({ name: 'created_by' }),
    IsNumber({}, { message: 'Created By must be a number' }),
    __metadata("design:type", Number)
], validateProductos.prototype, "CREADOR", void 0);
__decorate([
    Expose({ name: 'update_by' }),
    IsNumber({}, { message: 'Update By must be a number' }),
    __metadata("design:type", Number)
], validateProductos.prototype, "ACTUALIZADOR", void 0);
