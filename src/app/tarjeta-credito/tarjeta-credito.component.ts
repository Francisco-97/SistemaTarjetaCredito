import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TarjetaService } from '../Service/tarjeta.service';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.scss']
})
export class TarjetaCreditoComponent implements OnInit {
  listasTarjetas: any[] = []

  accion = 'agregar';
  nombreButton = 'Acceder'
  id: number | undefined;

  form: FormGroup;
  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private _tarjetaService: TarjetaService) 
  {
    this.form = this.fb.group({
      titular:['', Validators.required],
      numeroTarjeta:['', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      FechaExpiracion:['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      Cvv:['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]]
    })
  }

  ngOnInit(): void {
    this.ObtenerTarjeta()
  }

  ObtenerTarjeta(){
    this._tarjetaService.getListTarjeta().subscribe(data => {
      console.log(data)
      this.listasTarjetas = data;
    }, error =>{
      console.log(error)
    })
  }
  guardarTarjeta(){

    console.log(this.form)

    const tarjeta: any = {
      titular: this.form.get('titular')?.value,
      numeroTarjeta: this.form.get('numeroTarjeta')?.value,
      FechaExpiracion: this.form.get('FechaExpiracion')?.value,
      Cvv: this.form.get('Cvv')?.value
    }
    
    if(this.id == undefined){
      //Agregamos tarjeta
      this._tarjetaService.saveTarjeta(tarjeta).subscribe(data =>{
        this.toastr.success('La tarjeta a Sido Registrada con Exito', 'Tarjeta Registrada')
        this.ObtenerTarjeta()
        this.form.reset();
      },error =>{
        console.log(error)
        this.toastr.error("Opss...Ha ocurrido un error","ERROR")
      });
    }else{
      tarjeta.id = this.id
      //Editamos tarjeta
      this._tarjetaService.updateTarjeta(this.id,tarjeta).subscribe(data =>{
        this.form.reset();
        this.accion = 'Agregar'
        this.id = undefined
        this.toastr.info("La tarjeta a sido Actualizada","ACTUALIZACION")
        this.ObtenerTarjeta()
      }, error =>{
        console.log(error)
        this.toastr.error("Opss...Ha ocurrido un error","ERROR")
      })
    }
    
    
    
  }

  eliminarTarjeta(id: number){
    this._tarjetaService.deleteTarjeta(id).subscribe(data =>{
    this.toastr.error('La Tarjeta ha sido Eliminada Correctamente','Tarjeta Eliminada')
    this.ObtenerTarjeta()
    }, error =>{
      this.toastr.error("Opps... Ha Ocurrido un Error","Error")
    })
    
  }

  editarTarjeta(tarjeta: any){
    this.accion = 'editar';
    this.nombreButton = 'Guardar Cambios'
    this.id = tarjeta.id;

    this.form.patchValue({
      titular: tarjeta.titular,
      numeroTarjeta: tarjeta.numeroTarjeta,
      FechaExpiracion: tarjeta.fechaExpiracion,
      Cvv: tarjeta.cvv
    })
    
  }
}
