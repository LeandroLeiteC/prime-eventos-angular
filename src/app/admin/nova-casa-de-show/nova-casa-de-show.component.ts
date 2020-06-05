import { CasaDeShow } from 'src/app/core/casa-de-show/casa-de-show.model';
import { AdminService } from './../../core/admin/admin.service';
import { Viacep } from './../../core/model/viacep.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CasaDeShowService } from './../../core/casa-de-show/casa-de-show.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nova-casa-de-show',
  templateUrl: './nova-casa-de-show.component.html',
  styleUrls: ['./nova-casa-de-show.component.css']
})
export class NovaCasaDeShowComponent implements OnInit {

  casaDeShowForm: FormGroup;
  cep: Observable<string>;
  casaDeShow: CasaDeShow;


  constructor(
    private casaDeShowService: CasaDeShowService,
    private adminService: AdminService,
    private router: Router,
    private http: HttpClient,
    formBuilder: FormBuilder) {
      this.casaDeShowForm = formBuilder.group({
        nome: ['', [Validators.required]],
        cep: ['', [Validators.required, Validators.pattern(/^\d{5}[-]\d{3}$/)]],
        uf:['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
        cidade: ['', [Validators.required]],
        bairro: ['', [Validators.required]],
        rua: ['', [Validators.required]],
        numero: ['', [Validators.required, Validators.min(1)]],
        limitePessoas: ['', [Validators.required, Validators.min(10)]],
        telefone: ['', [Validators.required, Validators.pattern(/(\(\d{2}\)\s)(\d{4,5}\-\d{4})/)]],
        status: ['', [Validators.required]]
      });
     }

  ngOnInit(): void {
    this.adminService.changeTab(1);
  }

  cadastrar(){
    this.casaDeShow = this.casaDeShowForm.getRawValue();
    this.casaDeShowService.save(this.casaDeShow)
    .subscribe(() => {
      this.casaDeShowService.showMessage('Casa de show cadastrada!');
      this.router.navigate(['/admin']);
    })
  }

  consultaCEP() {
    if(!this.casaDeShowForm.get('cep').invalid){
      let cep = this.casaDeShowForm.get('cep').value;
      this.http.get<Viacep>(`//viacep.com.br/ws/${cep}/json`)
        .subscribe( dados => this.atualizaEndereco(dados));
    }
  }

  atualizaEndereco(dados: Viacep){
    this.casaDeShowForm.patchValue({
      uf: dados.uf,
      cidade: dados.localidade,
      bairro: dados.bairro,
      rua: dados.logradouro
    })
  }

  limpar(campo: string): void {
    if(campo == "nome"){
      this.casaDeShowForm.patchValue({"nome":''});
    } 
    if(campo == "cep"){
      this.casaDeShowForm.patchValue({"cep":''});
    }
    if(campo == "uf"){
      this.casaDeShowForm.patchValue({"uf":''});
    }
    if(campo == "cidade"){
      this.casaDeShowForm.patchValue({"cidade":''});
    }
    if(campo == "bairro"){
      this.casaDeShowForm.patchValue({"bairro":''});
    }
    if(campo == "rua"){
      this.casaDeShowForm.patchValue({"rua":''});
    }
    if(campo == "numero"){
      this.casaDeShowForm.patchValue({"numero":''});
    }
    if(campo == "limitePessoas"){
      this.casaDeShowForm.patchValue({"limitePessoas":''});
    }
    if(campo == "telefone"){
      this.casaDeShowForm.patchValue({"telefone":''});
    }
  }
  
  cancelar() {
    this.router.navigate(['/admin']);
  }
}
