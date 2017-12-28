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
    console.log(body)
    console.log(id)
    return this.http.put(this.api + '/' + id, body, options ).map((res: Response) => res.json());
  }

  /* Adiciona o valor de 50 ao parametro "atingido", a uma respetiva id */

  adicionarCq(id){
  	this.getById(id).subscribe(data => {
  		console.log(data);
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

  /* Obtem a api */

  getData(){
  	return this.http.get(this.api)
  		.map((res: Response) => res.json())
  }

  /* Obtém todos os dados da API */

  getProdutos(){
  	this.getData().subscribe(data => {
  		console.log(data);
  		this.data = data;
  	})
  }

  /* Função post */

  createService(artigo){
  	let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    console.log(artigo)
    let body = JSON.stringify(artigo);
    return this.http.post(this.api, body, options ).map((res: Response) => res.json());
  }

  adicionarProduto(){
  	let artigo = {
  					nome: this.nome,
  					valor: this.preco,
  					atingido: this.atingido
  				 };
  	this.createService(artigo).subscribe(
  		data => {
  			this.getProdutos();
  			return true
  		}
  	)}
}
