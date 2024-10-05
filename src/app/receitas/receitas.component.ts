import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-receitas',
  templateUrl: './receitas.component.html',
  styleUrls: ['./receitas.component.scss']
})


export class ReceitasComponent implements OnInit{
public receitas:any;
public receita: any = {
  Nome: "Pagamento",
  Descricao: "Pagamento Mensal"
}
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.getReceitas();
  }
  public getReceitas():void{
    this.http.get('https://localhost:7112/api/Receita').subscribe(
      response => this.receitas = response,
      error => console.log(error)
    );
  }
}

