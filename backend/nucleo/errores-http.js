/** Error controlado que conserva un código HTTP y detalles seguros. */
export class ErrorHttp extends Error {
  constructor(estado, mensaje, errores = []) { super(mensaje); this.name='ErrorHttp'; this.estado=estado; this.errores=errores; }
}
