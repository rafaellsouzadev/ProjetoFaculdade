package com.rafael.lojaionic.domain.dto;

import java.io.Serializable;

import javax.persistence.Column;

import com.rafael.lojaionic.domain.Produto;

public class NewProdutoDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private String nome;
	
	@Column(columnDefinition = "text", length = 2000)
	private String descricao;
	
	@Column(columnDefinition = "text", length = 2000)
	private String imagemUri;
	private Double preco;
	private Integer idCategoria;
	
	public NewProdutoDTO() {
	}
	
	public NewProdutoDTO(Produto entity) {
		this.nome = entity.getNome();
		this.descricao = entity.getDescricao();
		this.imagemUri = entity.getImageUri();
		this.preco = entity.getPreco();
		this.idCategoria = entity.getCategorias().get(0).getId();
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}	
	
	public String getDescricao() {
		return descricao;
	}
	
	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}
	
	public String getImagemUri() {
		return imagemUri;
	}
	
	public void setImagemUri(String imagemUri) {
		this.imagemUri = imagemUri;
	}

	public Double getPreco() {
		return preco;
	}

	public void setPreco(Double preco) {
		this.preco = preco;
	}

	public Integer getIdCategoria() {
		return idCategoria;
	}

	public void setIdCategoria(Integer idCategoria) {
		this.idCategoria = idCategoria;
	}
	
	

}
