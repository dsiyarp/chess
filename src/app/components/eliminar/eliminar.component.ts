import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { UsuariosService } from '../../services/usuarios.service';
import { IUsuario } from 'src/app/interfaces/iusuario';

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.css']
})
export class EliminarComponent implements OnInit {
  form: FormGroup;
  loading = false;
  loadingEliminar = false;
  submitted = false;
  user: IUsuario;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private usuario: UsuariosService
  ) {

    this.route.params.subscribe(params => {
      this.loading = true;

      this.usuario.getUsuario(params['id'])
        .subscribe((data: any) => {
          this.user = data;
          this.loading = false;
          //console.log(data);
        });
      // console.log(this.heroe);
    });
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: ['']
    });
  }

  onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loadingEliminar = true;

    this.usuario.deleteUsuario(this.user)
      .subscribe(
        data => {
          this.router.navigate(['/'], { relativeTo: this.route });
        },
        error => {
          this.loadingEliminar = false;
        });

  }

}
