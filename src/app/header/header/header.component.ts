import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from '../../servicios/autenticacion.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  //es public para que pueda ser llamado desde la vista.
  constructor(public authService: AutenticacionService,
              private router:Router,) { }

  ngOnInit(): void {
  }

  logout():void{
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
