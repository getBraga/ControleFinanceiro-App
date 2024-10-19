import { Component, OnInit } from '@angular/core';
import { Empresa } from '@app/models/Empresa';
import { Receita } from '@app/models/Receita';

@Component({
  selector: 'app-empresa-lista',
  templateUrl: './empresa-lista.component.html',
  styleUrls: ['./empresa-lista.component.css'],
})
export class EmpresaListaComponent implements OnInit {
  public empresas: Empresa[] = [];
  constructor() {}

  ngOnInit() {
    this.getEmpresas();
  }
  getEmpresas(): void {
    this.empresas.push({
      id: 1,
      nome: 'Santander',
      userId: 1,
    });
  }
}
