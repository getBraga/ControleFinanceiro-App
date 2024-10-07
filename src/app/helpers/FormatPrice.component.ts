export class FormatPrice {
  private _price: number = 0;
  private _total: number = 0;
  constructor(price: number = 0) {
    this._price = price;
  }
  public formatarPreco(): string {
    return this._price.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    });
  }
  public calcularValorTotal(valores: any[] = []): number {
    valores.map(({ valor }) => {
      this._total += valor;
    });
    return this._total;
  }
}
