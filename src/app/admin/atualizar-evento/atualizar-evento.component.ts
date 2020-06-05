import { Evento } from './../../core/evento/evento.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from './../../core/admin/admin.service';
import { CasaDeShowService } from './../../core/casa-de-show/casa-de-show.service';
import { EventoService } from './../../core/evento/evento.service';
import { CasaDeShow } from 'src/app/core/casa-de-show/casa-de-show.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventoForm } from './../../core/evento/evento-form.model';
import { Component, OnInit } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-atualizar-evento',
  templateUrl: './atualizar-evento.component.html',
  styleUrls: ['./atualizar-evento.component.css']
})
export class AtualizarEventoComponent implements OnInit {

  eventoForm: FormGroup;
  casasDeShow: CasaDeShow[] = [];
  page: number = 0;
  id: string;
  card: any;
  banner: any;
  nomeCard: string = "Foto do Card";
  nomeBanner: string = "Foto do Banner";
  

  constructor(
    private eventoService: EventoService,
    private casaDeShowService: CasaDeShowService,
    private adminService: AdminService,
    private router: Router,
    private currencyPipe: CurrencyPipe,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    formBuilder: FormBuilder) {
      this.id = this.route.snapshot.paramMap.get('id');
      this.eventoForm = formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
      descricao: ['', [Validators.required, Validators.minLength(2)]],
      pequenaDescricao: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(120)]],
      data:['', [Validators.required, Validators.pattern(/^(?:(?:31(\/)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/)]],
      hora:['', [Validators.required, Validators.pattern(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)]],
      preco:['', [Validators.required, Validators.pattern(/([0-9]),([0-9]{2}$)/)]],
      ingressosDisponiveis:['', [Validators.required, Validators.min(10)]],
      limiteCliente:['', [Validators.required, Validators.min(1)]],
      idCasaDeShow:['',[Validators.required]],
      status: ['', [Validators.required]],
      });
     }

  ngOnInit(): void {
    this.adminService.changeTab(0);
    this.eventoService.getById(this.id).subscribe( res => this.populateForm(res));
    this.casaDeShowService.getAll(this.page).subscribe( res => this.casasDeShow = res.content)
  }

  cadastrar(){
    const data:string = this.eventoForm.get("data").value;
    const hora:string = this.eventoForm.get("hora").value;
    const nome = this.eventoForm.get("nome").value;
    const descricao = this.eventoForm.get("descricao").value;
    const pequenaDescricao = this.eventoForm.get("pequenaDescricao").value;
    const pre: string = this.eventoForm.get("preco").value;
    const ingressosDisponiveis = this.eventoForm.get("ingressosDisponiveis").value;
    const limiteCliente = this.eventoForm.get("limiteCliente").value;
    const casaDeShow = this.eventoForm.get("idCasaDeShow").value;
    const status: string = this.eventoForm.get('status').value;
    const dataHora = data.split("/")[2] + '-' + data.split("/")[1] + '-' + data.split("/")[0] + 'T' + hora;
    const preco = pre.replace(",", ".");

    const evento: EventoForm = {
      data: dataHora,
      descricao: descricao,
      ingressosDisponiveis: ingressosDisponiveis,
      idCasaDeShow: casaDeShow,
      limiteCliente: limiteCliente,
      nome: nome,
      pequenaDescricao: pequenaDescricao,
      preco: preco,
      status: status,
    };

    this.eventoService.update(this.id, evento).subscribe( res => {
      if(!!this.card){
        var formData: any = new FormData();
        formData.append("foto", this.card);
        this.eventoService.saveFoto(res.id, 'card', formData)
          .subscribe(() => '',
          (error) => console.log(error));
      }
      if(!!this.banner){
        var formData: any = new FormData();
        formData.append("foto", this.banner);
        this.eventoService.saveFoto(res.id, 'banner', formData)
          .subscribe(() => '',
          (error) => console.log(error));
      }
      this.eventoService.showMessage("Evento atualizado!");
      this.router.navigate(['/admin']);
    });
  }

  limpar(campo: string): void {
    if(campo == "nome"){
      this.eventoForm.patchValue({"nome":''});
    } 
    if(campo == "descricao"){
      this.eventoForm.patchValue({"descricao":''});
    }
    if(campo == "pequenaDescricao"){
      this.eventoForm.patchValue({"pequenaDescricao":''});
    }
    if(campo == "preco"){
      this.eventoForm.patchValue({"preco":''});
    }
    if(campo == "ingressosDisponiveis"){
      this.eventoForm.patchValue({"ingressosDisponiveis":''});
    }
    if(campo == "limiteCliente"){
      this.eventoForm.patchValue({"limiteCliente":''});
    }
    if(campo == "data"){
      this.eventoForm.patchValue({"data":''});
    }
    if(campo == "hora"){
      this.eventoForm.patchValue({"hora":''});
    }
  }

  onScroll() {
    this.page += 1;
    this.casaDeShowService.getAll(this.page, "aberto").subscribe(value => {
      this.casasDeShow = this.casasDeShow.concat(value.content);
    })
  }

  cancelar() {
    this.router.navigate(['/admin']);
  }

  populateForm(evento: Evento) {
    this.eventoForm.patchValue({
      data: this.datePipe.transform(evento.data, 'dd/MM/yyyy'),
      hora: this.datePipe.transform(evento.data, 'HH:mm'),
      descricao: evento.descricao,
      ingressosDisponiveis: evento.ingressosDisponiveis,
      idCasaDeShow: evento.casaDeShow.id,
      limiteCliente: evento.limiteCliente,
      nome: evento.nome,
      pequenaDescricao: evento.pequenaDescricao,
      preco: this.currencyPipe.transform(evento.preco, 'BRL', ''),
      status: evento.status
    });
    if(!!evento.nomeImagemCard){
      this.nomeCard = evento.nomeImagemCard;
    }
    if(!!evento.nomeImagemBanner){
      this.nomeBanner = evento.nomeImagemBanner;
    }
  }

  uploadCard(event) {
    const foto = (event.target as HTMLInputElement).files[0];
    this.card = foto;
    this.nomeCard = foto.name;
  }

  uploadBanner(event) {
    const foto = (event.target as HTMLInputElement).files[0];
    this.banner = foto;
    this.nomeBanner = foto.name;
  }
}
