import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-receitas',
  templateUrl: './receitas.component.html',
  styleUrls: ['./receitas.component.scss']
})



export class ReceitasComponent implements OnInit{
public receitas:any[] = [];
private  _receitas:any[] = [];
public totalReceita: number = 0.0;
public valorTotal: number = 0;
private _filtroReceita: string = "";
public get filtroReceita(): string{
  return this._filtroReceita;
}
public set filtroReceita(value: string) {
  this._filtroReceita = value;
  this.receitas = this._receitas;
  this.receitas  = this._filtroReceita ? this.filtrarReceitas(this._filtroReceita):
  this._receitas;
  this.calcularReceita(this.receitas);
}
filtrarReceitas(filtrarPor: string):any {
filtrarPor = filtrarPor.toLocaleLowerCase();

return this.receitas.filter(
  receita => receita.nome.toLocaleLowerCase().indexOf(filtrarPor)!== -1 ||
  receita.descricao.toLocaleLowerCase().indexOf(filtrarPor)!== -1 ||
  receita.empresa.nome.toLocaleLowerCase().indexOf(filtrarPor)!== -1 ||
  String(receita.valor).startsWith(filtrarPor)

)
}
  constructor(private http: HttpClient) {}
    ngOnInit(): void {
    this.getReceitas();

  }
  private calcularReceita(receitas:any[] = []) {
    this.valorTotal = 0;
       receitas.map((receita) => {
      this.valorTotal += receita.valor;
     })
     return this.valorTotal;
  }
  public getReceitas():void{
    this.http.get('https://localhost:7112/api/Receita').subscribe((receitas) => {

    var array =Object.entries(receitas).map(([chave, receita]) => {
      this.valorTotal += receita.valor;
      return receita;
    });

      this._receitas.push(...array)
 this.receitas = this._receitas;
    });
  }
}

