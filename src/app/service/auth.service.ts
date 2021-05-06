import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  /* RETONA UM VALOR true OU false CASO O TOKEN ESTA PREENCHIDO, CASO ESTEJA VAZIO RETONA false, CASO ESTEJA COM DADOS RETONA true*/
  logado() {
    /* CRIA UMA VARIAVEL BOOLEAN */
    let identificador:boolean = false;

    if(window.document.URL != 'http://localhost:4200/login') {
      identificador = true;

    }

    /* RETORNA O VALOR DA VARIAVEL */
    return identificador;
  }
}
