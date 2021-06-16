import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.scss']
})
export class TarjetaCreditoComponent implements OnInit {
  listasTarjetas: any[] = [
    {
      Titular:"Francisco",
      Tarjeta: "1258745669",
      Expira: "15/06",
      Cvv:"123"
    },
    {
      Titular: "Johnkel Santos",
      Tarjeta: "47589632154",
      Expira: "08/12",
      Cvv: "258"
    }
  ]

  form: FormGroup;
  constructor(private fb: FormBuilder, private toastr: ToastrService) 
  {
    this.form = this.fb.group({
      Titular:['', Validators.required],
      Tarjeta:['', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      Expira:['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      Cvv:['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]]
    })
  }

  ngOnInit(): void {
  }

  agregarTarjeta(){

    console.log(this.form)

    const tarjeta: any = {
      Titular: this.form.get('Titular')?.value,
      Tarjeta: this.form.get('Tarjeta')?.value,
      Expira: this.form.get('Expira')?.value,
      Cvv: this.form.get('Cvv')?.value
    }

    
    this.listasTarjetas.push(tarjeta);
    this.toastr.success('La tarjeta a Sido Registrada con Exito', 'Tarjeta Registrada')
    this.form.reset();
    
  }

  eliminarTarjeta(index: number){
    this.listasTarjetas.splice(index,1)
    this.toastr.error('La Tarjeta ha sido Eliminada Correctamente','Tarjeta Eliminada')
  }
}
