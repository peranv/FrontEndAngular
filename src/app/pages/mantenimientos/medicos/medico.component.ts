import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoForm: FormGroup;
  public hospitales: Hospital[] = [];
  public hospitalSeleccionado: Hospital;

  constructor(private fb: FormBuilder,
              private hospitalService: HospitalService,
              private medicoService: MedicoService) { }

  ngOnInit(): void {
    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required]
    })

    this.cargarHospitales();
    //observable valueChanges observa cambios en hospital
    this.medicoForm.get('hospital').valueChanges
        .subscribe( hospitalId => {
           this.hospitalSeleccionado = this.hospitales.find(h => h._id=== hospitalId);
        })
  }
  cargarHospitales(){
     this.hospitalService.cargarHospitales()
        .subscribe( (hospitales: Hospital[]) =>{
          console.log(hospitales);
          this.hospitales= hospitales;
        })
  }

  guardarMedico(){
    this.medicoService.crearMedico(this.medicoForm.value)
        .subscribe(resp =>{
          console.log(resp);
        })
  }

}
