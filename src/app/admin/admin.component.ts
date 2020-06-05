import { AdminService } from './../core/admin/admin.service';
import { BehaviorSubject } from 'rxjs';
import { HeaderService } from './../core/template/header/header.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  selected = new FormControl(0);

  constructor(
    private adminService: AdminService,
    headerService: HeaderService) { 
    headerService.headerData = {
      title: 'Administração',
      icon: 'build',
      routerUrl: '/admin'
    }
  }

  ngOnInit(): void {
    this.adminService.selected.subscribe(tab => this.selected.setValue(tab));
  }

}
