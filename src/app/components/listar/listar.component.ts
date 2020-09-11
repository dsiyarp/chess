import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  usuarios: any[] = [];
  loading: boolean;

  constructor(private usuario: UsuariosService) {

    this.loading = true;

    this.usuario.getUsuarios()
        .subscribe( (data: any) => {
          this.usuarios = data;
          this.loading = false;
          //console.log(data);
        });
   }

  ngOnInit(): void {
  }


}
