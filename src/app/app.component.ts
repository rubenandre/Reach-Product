import { Component } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import 'rxjs/add/operator/map'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	  /* URL API */
  	private api = 'http://localhost:3000/produtos'

  	/* Dados obtidos da api uteis para funções internas */
  	data: any = {};
  	id:number = this.data.id
  	atingido: number = 0;

  	/* Conteudo do Modal */
  	nome: string = "";
  	preco: number;
  	mostrarModal: boolean = false;

  constructor(private http: Http){
  	this.getProdutos();
  	this.getData();
  }

  /* Funções Relacionadas com o Modal */

  abrirModal(){
  	this.mostrarModal = true;
  }

  fecharModal(){
  	this.mostrarModal = false;
  }

  limparFormModal(){
  	this.nome = "";
  	this.preco = null
  }

  /* Obtem na api as respetivas informações correspondentes a uma id */

  getById(id){
  	return this.http.get(this.api + '/' + id)
  		.map((res: Response) => res.json())
  }

  /* Função de Remoçao de dados após termos chegado à meta */

  removerService(id){
    return this.http.delete(this.api + '/' + id);
  }

  /* Remover */

  removerProduto(id){
    if (confirm("Tem a certeza que deseja remover?")){
      this.removerService(id).subscribe(
        data => {
          this.getProdutos();
          return true
        })
    }
  }

  /* Função de Atualização dos dados de uma id */

  atualizarService(id, atingido, valorTotal, produtoNome) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let artigo = {
  						nome: produtoNome,
  						valor: valorTotal,
  						atingido: atingido
  				 };
    let body = JSON.stringify(artigo);
    return this.http.put(this.api + '/' + id, body, options ).map((res: Response) => res.json());
  }

  /* Adiciona o valor de 50 ao parametro "atingido", a uma respetiva id */

  adicionarCq(id){
  	this.getById(id).subscribe(data => {
  		this.data = data;
  		let valorAdicionar:number = 50;
  		let valorInicial:number = data.atingido;
  		let valorTotal:number = data.valor;
  		let produtoNome:string = data.nome;
  		let valorFinal:number = (+valorInicial) + (+valorAdicionar);
  		let atingido = valorFinal;
  		if(atingido > valorTotal){
  			atingido = valorTotal;
  		}
  		this.atualizarService(id, atingido, valorTotal, produtoNome).subscribe(
       		data => {
         		this.getProdutos();
         		return true;
      		 })
  	})
  }

  /* Adiciona o valor de 25 ao parametro "atingido", a uma respetiva id */

  adicionarVc(id){
    this.getById(id).subscribe(data => {
      this.data = data;
      let valorAdicionar:number = 25;
      let valorInicial:number = data.atingido;
      let valorTotal:number = data.valor;
      let produtoNome:string = data.nome;
      let valorFinal:number = (+valorInicial) + (+valorAdicionar);
      let atingido = valorFinal;
      if(atingido > valorTotal){
        atingido = valorTotal;
      }
      this.atualizarService(id, atingido, valorTotal, produtoNome).subscribe(
           data => {
             this.getProdutos();
             return true;
           })
    })
  }

  /* Adiciona o valor de 10 ao parametro "atingido", a uma respetiva id */

  adicionarDz(id){
    this.getById(id).subscribe(data => {
      this.data = data;
      let valorAdicionar:number = 10;
      let valorInicial:number = data.atingido;
      let valorTotal:number = data.valor;
      let produtoNome:string = data.nome;
      let valorFinal:number = (+valorInicial) + (+valorAdicionar);
      let atingido = valorFinal;
      if(atingido > valorTotal){
        atingido = valorTotal;
      }
      this.atualizarService(id, atingido, valorTotal, produtoNome).subscribe(
           data => {
             this.getProdutos();
             return true;
           })
    })
  }

  /* Adiciona o valor de 5 ao parametro "atingido", a uma respetiva id */

  adicionarCin(id){
    this.getById(id).subscribe(data => {
      this.data = data;
      let valorAdicionar:number = 5;
      let valorInicial:number = data.atingido;
      let valorTotal:number = data.valor;
      let produtoNome:string = data.nome;
      let valorFinal:number = (+valorInicial) + (+valorAdicionar);
      let atingido = valorFinal;
      if(atingido > valorTotal){
        atingido = valorTotal;
      }
      this.atualizarService(id, atingido, valorTotal, produtoNome).subscribe(
           data => {
             this.getProdutos();
             return true;
           })
    })
  }

  /* Adiciona o valor de 1 ao parametro "atingido", a uma respetiva id */

  adicionarUn(id){
    this.getById(id).subscribe(data => {
      this.data = data;
      let valorAdicionar:number = 1;
      let valorInicial:number = data.atingido;
      let valorTotal:number = data.valor;
      let produtoNome:string = data.nome;
      let valorFinal:number = (+valorInicial) + (+valorAdicionar);
      let atingido = valorFinal;
      if(atingido > valorTotal){
        atingido = valorTotal;
      }
      this.atualizarService(id, atingido, valorTotal, produtoNome).subscribe(
           data => {
             this.getProdutos();
             return true;
           })
    })
  }

    /* Adiciona o valor de 25 ao parametro "atingido", a uma respetiva id */

  adicionarCent(id){
    this.getById(id).subscribe(data => {
      this.data = data;
      let valorAdicionar:number = 0.1;
      let valorInicial:number = data.atingido;
      let valorTotal:number = data.valor;
      let produtoNome:string = data.nome;
      let valorFinal:number = (+valorInicial) + (+valorAdicionar);
      let atingido = valorFinal;
      if(atingido > valorTotal){
        atingido = valorTotal;
      }
      this.atualizarService(id, atingido, valorTotal, produtoNome).subscribe(
           data => {
             this.getProdutos();
             return true;
           })
    })
  }

  /* Obtem a api */

  getData(){
  	return this.http.get(this.api)
  		.map((res: Response) => res.json())
  }

  /* Obtém todos os dados da API */

  getProdutos(){
  	this.getData().subscribe(data => {
  		this.data = data;
  	})
  }

  /* Função post */

  createService(artigo){
    this.mostrarModal = false
  	let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(artigo);
    return this.http.post(this.api, body, options ).map((res: Response) => res.json());
  }

  adicionarProduto(){
    if (this.preco == null && this.nome.trim() == ""){
      alert("Campos Inválidos")
    } else {
      let artigo = {
            nome: this.nome,
            valor: this.preco,
            atingido: this.atingido
           };
      this.createService(artigo).subscribe(
        data => {
          this.getProdutos();
          return true;
        })
      }
    }
}
