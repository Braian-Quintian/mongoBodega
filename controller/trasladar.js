var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Expose, Transform } from 'class-transformer';
import { IsNumber, IsPositive } from 'class-validator';
export class ValidateTraslado {
    constructor(p1, p2, p3, p4) {
        this.id = p1;
        this.cant = p2;
        this.origen = p3;
        this.destino = p4;
    }
}
__decorate([
    Expose({ name: 'producto_id' }),
    IsNumber({}, { message: 'El ID del producto debe ser un número' }),
    __metadata("design:type", Number)
], ValidateTraslado.prototype, "id", void 0);
__decorate([
    Expose({ name: 'cantidad' }),
    Transform(({ value }) => value, { toClassOnly: true }),
    IsNumber({}, { message: 'La cantidad debe ser un número' }),
    IsPositive({ message: 'La cantidad debe ser un valor positivo' }),
    __metadata("design:type", Number)
], ValidateTraslado.prototype, "cant", void 0);
__decorate([
    Expose({ name: 'bodega_origen_id' }),
    IsNumber({}, { message: 'El ID del almacén de origen debe ser un número' }),
    __metadata("design:type", Number)
], ValidateTraslado.prototype, "origen", void 0);
__decorate([
    Expose({ name: 'bodega_destino_id' }),
    IsNumber({}, { message: 'El ID del almacén de destino debe ser un número' }),
    __metadata("design:type", Number)
], ValidateTraslado.prototype, "destino", void 0);
