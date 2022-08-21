import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';

import { HttpClientModule } from '@angular/common/http';
import { CadastroComponent } from './cadastro/cadastro.component';
import { FormsModule } from '@angular/forms';
import { CategoriaComponent } from './categoria/categoria.component';
import { EditarCategoriaComponent } from './editar/editar-categoria/editar-categoria.component';
import { DeletarCategoriaComponent } from './deletar/deletar-categoria/deletar-categoria.component';
import { ProdutoComponent } from './produto/produto.component';
import { InserirProdutoComponent } from './inserir-produto/inserir-produto.component';
import { ClienteComponent } from './cliente/cliente.component';
import { AlertasComponent } from './alertas/alertas.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FocoProdutoComponent } from './foco-produto/foco-produto.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    CadastroComponent,
    CategoriaComponent,
    EditarCategoriaComponent,
    DeletarCategoriaComponent,
    ProdutoComponent,
    InserirProdutoComponent,
    ClienteComponent,
    AlertasComponent,
    DashboardComponent,
    FocoProdutoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
