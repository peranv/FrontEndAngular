import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import { Medico } from 'src/app/models/medico.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  public cargando: boolean = true;
  public medicos: Medico[] = [];
  private imgSubs: Subscription;

  constructor(private medicoService: MedicoService,
              private modalImagenService: ModalImagenService,
              private busquedasService: BusquedasService) { }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarMedicos();

    this.imgSubs = this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(
      delay(100)
    )
    .subscribe(img=> this.cargarMedicos())
  }

  buscar(termino: string){
    if(termino.length === 0){
      return this.cargarMedicos();
   }else{
    return  this.busquedasService.buscar('medicos', termino)
    .subscribe( (resp: Medico[])=> {
      this.medicos = resp;
    } );
   }
  }

  cargarMedicos(){
    this.cargando = true;
   this.medicoService.cargarMedicos()
       .subscribe(medicos =>{
        this.cargando = false;
        this.medicos = medicos;
       })
  }

  abrirModal(medico: Medico){
    this.modalImagenService.abrirModal('medicos', medico._id, medico.img)
  }

  borrarMedico(medico: Medico){

     Swal.fire({
      title: 'Borrar Médico?',
      text: `Esta a punto de borrar a ${ medico.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
       this.medicoService.borrarMedico(medico._id)
           .subscribe( resp=> {
             this.cargarMedicos();
             Swal.fire(
               'Medico Borraro', 
               `${medico.nombre} fue eliminado correctamente.`,
               'success'
               )
           })
      }
    })


  }

}
