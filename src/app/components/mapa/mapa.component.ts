import { MapaEditarComponent } from './mapa-editar.component';
import { Marcador } from './../../classes/marcador.class';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  marcadores: Marcador[] = [];

  lat = 51.678418;
  lng = 7.809007;

  constructor( private snackBar: MatSnackBar,
               public dialog: MatDialog ) 
  {
    if(localStorage.getItem('marcadores')){
      this.marcadores  = JSON.parse(localStorage.getItem('marcadores'));
    }
  }

  ngOnInit(): void {
  }

  agregarMarcador( evento ){
    /* Lo que está entre llaves es para asignarle tipo a las variables que se van a almacenar */
    const coords: { lat: number, lng: number } = evento.coords;
    const nuevoMarcador = new Marcador( coords.lat, coords.lng );
    this.marcadores.push(nuevoMarcador);
    this.guardarStorage();
    this.snackBar.open('Marcador agregado', 'Cerrar', {duration: 3000} );
  }

  guardarStorage(){
    localStorage.setItem( 'marcadores', JSON.stringify(this.marcadores) );
  }

  obtenerStorage(){
    localStorage.getItem('marcadores');
  }

  borrarMarcador(indiceBorrar: number){
    this.marcadores.splice(indiceBorrar, 1);
    this.guardarStorage();
    this.snackBar.open('Marcador Borrado', 'Cerrar', {duration: 3000} );
  }

  editarMarcador(marc: Marcador){    
    
      const dialogRef = this.dialog.open( MapaEditarComponent, {
        width: '250px',
        data: {titulo: marc.titulo, desc: marc.desc}
      });
    
      dialogRef.afterClosed().subscribe(result => {
        
        if(!result){
          return;
        }

        marc.titulo = result.titulo;
        marc.desc = result.desc;
        this.guardarStorage();
        this.snackBar.open('Marcador actualizado', 'Cerrar', {duration: 3000} );
        
      });

  }


}
