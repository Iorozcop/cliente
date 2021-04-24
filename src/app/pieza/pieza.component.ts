import { Component, OnInit } from '@angular/core';
import { Pieza } from './pieza';
import { PiezasService } from '../servicios/piezas.service';
import Swal from 'sweetalert2'
import { AutenticacionService } from '../servicios/autenticacion.service';
import { ModalService } from './detalle/modal.service';


@Component({
  selector: 'app-pieza',
  templateUrl: './pieza.component.html',
  styleUrls: ['./pieza.component.css']
})
export class PiezaComponent implements OnInit {

  piezas: Pieza[] = [];
  piezaSeleccionada!: Pieza;
  
  constructor(private piezaService: PiezasService,
              public authService: AutenticacionService,
              private modalService: ModalService
              ) { }

  ngOnInit(): void {
    
    this.piezaService.getPiezas().subscribe(
      piezas => this.piezas = piezas
    );

    //para actualizar la foto si se cambia en el modal.
    this.modalService.notificarUpload.subscribe(pieza => {
      this.piezas = this.piezas.map(piezaOriginal=>{
        if(pieza.id == piezaOriginal.id){
          piezaOriginal.foto = pieza.foto;
        }
        return piezaOriginal;
      })
    })
    
  }

  delete(pieza:Pieza):void{
    Swal.fire({
      title: '¿Estas seguro?',
      text: `Vas a eliminar la pieza ${pieza.util} de la base de datos`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.piezaService.delete(pieza.id).subscribe(
          response => {
            this.piezas = this.piezas.filter(piez => piez !== pieza)
            Swal.fire(
            '¡Eliminado!',
            'La pieza ha sido eliminada',
            'success'
            )
          }
        )
      }
    })
  }

  abrirModal(pieza:Pieza){
    this.piezaSeleccionada = pieza;
    this.modalService.abrirModal();
  }
}
