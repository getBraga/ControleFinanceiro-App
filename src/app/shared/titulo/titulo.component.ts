import { Component, input, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.component.html',
  styleUrls: ['./titulo.component.css'],
})
export class TituloComponent implements OnInit {
  @Input() titulo: string = '';
  @Input() iconClass: string = 'fa fa-user';
  @Input() subtitulo: string = 'Desde 2024';
  @Input() mostrarListar: boolean = false;
  @Input() nomeListar: string = '';
  @Input() rotaTela: string = '';
  constructor() {}

  ngOnInit() {}
}
