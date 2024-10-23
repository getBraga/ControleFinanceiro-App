import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FormatPrice } from 'src/app/helpers/FormatPrice.component';
import { Receita } from 'src/app/models/Receita';
import { ReceitaService } from '@app/services/receita-services/receita.service';

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
  public receitaNome: string = '';
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
    this.receitaService
      .getReceitas()
      .subscribe({
        next: (_receitas: any) => {
          var array: Receita[] = Array.from(_receitas);
          this._receitas = [];
          this._receitas.push(...array);
          this.receitas = this._receitas;
          this.calcularReceita(this._receitas);
        },
        error: (error: any) => {
          this.toastr.error(`A aplicação está fora do ar`, 'error');
        },
      })
      .add(() => this.spinner.hide());
  }
  openModal(template: TemplateRef<any>, id: number, receitaNome: string) {
    this.receitaNome = receitaNome;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm',
      id: id,
    });
  }

  excluirReceita(id: number) {
    this.receitaService.deleteReceita(id).subscribe({
      next: (result: any) => {
        this.modalRef.hide();
        this.toastr.success(`${result.message}`, 'Sucesso!');
        this.getReceitas();
      },
      error: (error: any) => {
        console.log(error, 'error');
      },
    });
  }
  confirm() {
    if (this.modalRef.id) {
      var id = +this.modalRef.id;
      this.excluirReceita(id);
    }
  }
  decline() {
    this.modalRef.hide();
  }

  editarReceita(id: number): void {
    this.router.navigate([`receitas/detalhe/${id}`]);
  }
}
