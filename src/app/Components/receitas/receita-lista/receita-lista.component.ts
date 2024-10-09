import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FormatPrice } from 'src/app/helpers/FormatPrice.component';
import { Receita } from 'src/app/models/Receita';
import { ReceitaService } from 'src/app/services/receita.service';

@Component({
  selector: 'app-receita-lista',
  templateUrl: './receita-lista.component.html',
  styleUrl: './receita-lista.component.scss',
})
export class ReceitaListaComponent implements OnInit {
  modalRef: BsModalRef;
  public receitas: Receita[] = [];
  private _receitas: Receita[] = [];
  public totalReceita: number = 0.0;
  private _filtroReceita: string = '';
  private router: Router = new Router();
  constructor(
    private receitaService: ReceitaService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    this.modalRef = new BsModalRef();
  }
  public ngOnInit(): void {
    this.spinner.show();
    this.getReceitas();
  }

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
      error: (error: any) => {
        this.spinner.hide();
        this.toastr.error(`${error}`, 'error');
      },
      complete: () => {
        this.spinner.hide();
        this.toastr.success('Receita carregada com sucesso.', 'Sucesso!');
      },
    });
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
  confirm() {
    this.modalRef.hide();
    this.toastr.success('Receita excluida com sucesso.', 'Sucesso!');
  }
  decline() {
    this.modalRef.hide();
  }

  editarReceita(id: number): void {
    this.router.navigate([`receitas/detalhe/${id}`]);
  }
}
