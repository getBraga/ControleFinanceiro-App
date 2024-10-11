import { Component, OnInit, TemplateRef } from '@angular/core';
import { ReceitaService } from '@app/services/receita.service';
import { Receita } from '@app/models/Receita';
import { FormatPrice } from '@app/helpers/FormatPrice.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-receitas',

  templateUrl: './receitas.component.html',
  styleUrls: ['./receitas.component.scss'],
})
export class ReceitasComponent implements OnInit {
  ngOnInit(): void {}
}
