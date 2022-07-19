import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

  public hospitales: Hospital[] = [];
  public cargando: boolean = true;
  public imgSubs: Subscription;

  constructor(private hospitalService: HospitalService,
              private modalImagenService: ModalImagenService) { }

  ngOnInit(): void {
    this.cargarHospitales();
    this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(
      delay(100)
    )
    .subscribe(img=> this.cargarHospitales())
  }

  cargarHospitales(){
    this.cargando = true;
    this.hospitalService.cargarHospitales()
        .subscribe( hospitales=> {
          console.log(hospitales);
          this.cargando = false;
          this.hospitales = hospitales;

        })
  }

  guardarCambios(hospital: Hospital){
    this.hospitalService.actualizarHospital(hospital._id, hospital.nombre)
    .subscribe( resp => {
      Swal.fire('Actualizado', hospital.nombre, 'success')
    });

  }

  eliminarHospital(hospital: Hospital){
    this.hospitalService.borrarHospital(hospital._id)
    .subscribe( resp => {
      this.cargarHospitales();
      Swal.fire('Actualizado', hospital.nombre, 'success')
    });

  }


  async abrirSweetAlert(){
    const {value} = await Swal.fire<string>({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputLabel: 'URL address',
      inputPlaceholder: 'Nombre del Hospital',
      showCancelButton: true
    })
    if(value.trim().length>0){
      this.hospitalService.crearHospital(value)
          .subscribe((resp: any) =>{
            this.hospitales.push(resp.hospital)
            console.log(resp)
          })
    }
    console.log(value);
  }

  abrirModal(hospital:Hospital){
    this.modalImagenService.abrirModal('hospitales', hospital._id, hospital.img)
  }

}
