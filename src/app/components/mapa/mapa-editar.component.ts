import { Marcador } from './../../classes/marcador.class';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms'
import { ClassGetter } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-mapa-editar',
  templateUrl: './mapa-editar.component.html',
  styleUrls: ['./mapa-editar.component.css']
})
export class MapaEditarComponent implements OnInit {
  
  forma: FormGroup

  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<MapaEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public datos: Marcador) 
    {
      console.log("Dentro de mapa-editar constructor: ",datos);
      this.forma = fb.group({
        'titulo': datos.titulo,
        'desc': datos.desc
      });
    }


  ngOnInit(): void {
  }


  guardarCambios(){
    
    this.dialogRef.close(this.forma.value);

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
