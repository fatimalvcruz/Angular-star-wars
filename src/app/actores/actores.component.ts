
import { Component, OnInit} from '@angular/core';
import { DataServiceService } from '../data-service.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-actores',
  templateUrl: './actores.component.html',
  styleUrls: ['./actores.component.scss']
})
export class ActoresComponent implements OnInit {

 
  indice: number;
  titulo: string;
  actores: any [] = [];
  pelicula: any;
  error: boolean = false;
  mensaje: string = "Hay un error en la carga";
  cargando: boolean;





  constructor(private miServicio: DataServiceService, private route: ActivatedRoute) { 

  }

   ngOnInit() {
    this.cargando = true;
    this.indice=this.route.snapshot.params['id'];

    this.miServicio.getPelis().subscribe({
      next:(respuesta: any) => {
        this.pelicula = respuesta.results.find((film:any) => film.episode_id == this.indice); 
        this.cargando = false;
        this.pelicula.characters.map(async (el:string) =>{
        this.miServicio.getActors(el).subscribe({
                next:(respuesta: any) => {
                 this.actores.push(respuesta);
             

            },
              error:(respuesta: Response) =>{
              this.error = true
            },
          });
        });
      },
          error:(respuesta: Response) =>{
            this.error = true
      },
    });



  

    }
   
  }

