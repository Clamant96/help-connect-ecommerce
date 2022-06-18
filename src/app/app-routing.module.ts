import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { ClienteComponent } from './cliente/cliente.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DeletarCategoriaComponent } from './deletar/deletar-categoria/deletar-categoria.component';
import { EditarCategoriaComponent } from './editar/editar-categoria/editar-categoria.component';
import { HomeComponent } from './home/home.component';
import { InserirProdutoComponent } from './inserir-produto/inserir-produto.component';
import { LoginComponent } from './login/login.component';
import { ProdutoComponent } from './produto/produto.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'cadastro', component: CadastroComponent
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'cliente', component: ClienteComponent
  },
  {
    path: 'categoria', component: CategoriaComponent
  },
  {
    path: 'edit-categoria/:id', component: EditarCategoriaComponent
  },
  {
    path: 'deletar-categoria/:id', component: DeletarCategoriaComponent
  },
  {
    path: 'produto', component: ProdutoComponent
  },
  {
    path: 'dashboard', component: DashboardComponent
  },
  {
    path: 'produto/:idProduto/pedido/:idPedido', component: InserirProdutoComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
