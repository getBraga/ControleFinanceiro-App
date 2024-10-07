export class FormatPrice {
  private _price: number = 0;
  constructor(price: number) {
    this._price = price;
  }
  public formatarPreco(): string {
    return this._price.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    });
  }
}
