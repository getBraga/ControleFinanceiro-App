import { Component, OnInit } from '@angular/core';
import { ReceitaService } from '../../services/receita.service';
import { Receita } from '../../models/Receita';
import { FormatPrice } from '../../helpers/FormatPrice.component';
@Component({
  selector: 'app-receitas',

  templateUrl: './receitas.component.html',
  styleUrls: ['./receitas.component.scss'],
})
export class ReceitasComponent implements OnInit {
  [x: string]: any;
  public receitas: Receita[] = [];
  private _receitas: Receita[] = [];
  public totalReceita: number = 0.0;
  public valorTotal: number = 0;
  private _filtroReceita: string = '';
  public get filtroReceita(): string {
    return this._filtroReceita;
  }

  public set filtroReceita(value: string) {
    this._filtroReceita = value;
    this.receitas = this._receitas;
    this.receitas = this._filtroReceita
      ? this.filtrarReceitas(this._filtroReceita)
      : this._receitas;
    this.calcularReceita(this.receitas);
  }
  public filtrarReceitas(filtrarPor: string): any {
    filtrarPor = filtrarPor.toLocaleLowerCase();

    return this.receitas.filter((receita) => {
      return (
        receita.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
        receita.descricao.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
        receita.empresa?.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
        String(receita.valor).startsWith(filtrarPor)
      );
    });
  }
  constructor(private receitaService: ReceitaService) {}
  public ngOnInit(): void {
    this.getReceitas();
  }
  private calcularReceita(receitas: any[] = []) {
    this.totalReceita = new FormatPrice().calcularValorTotal(receitas);
  }
  public precoFormatado(valor: number): string {
    return new FormatPrice(valor).formatarPreco();
  }
  public formatarData(data?: Date) {
    if (data) {
      return new Date(data).toLocaleDateString('pt-br');
    }
    return;
  }
  public getReceitas(): void {
    this.receitaService.getReceitas().subscribe({
      next: (_receitas: Receita[]) => {
        var array = Object.entries(_receitas).map(([chave, receita]) => {
          return receita;
        });

        this._receitas.push(...array);
        this.receitas = this._receitas;
        this.calcularReceita(this._receitas);
      },
      error: (error) => {
        console.error('error', error);
      },
      complete: () => {
        console.log('loading', this.receitas);
      },
    });
  }
}
