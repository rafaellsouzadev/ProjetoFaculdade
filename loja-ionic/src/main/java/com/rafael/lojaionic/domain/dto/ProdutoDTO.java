package com.rafael.lojaionic.domain.dto;

import java.io.Serializable;

import org.springframework.beans.BeanUtils;

import com.rafael.lojaionic.domain.Produto;

public class ProdutoDTO implements Serializable{

	private static final long serialVersionUID = 1L;

	private Integer id;

	private String nome;
	
	private String descricao;
	
	private String imageUri;

	private Double preco;
	
	public ProdutoDTO() {		
	}
	
	public ProdutoDTO(Produto data) {
		BeanUtils.copyProperties(data, this);
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
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
	
	public String getImageUri() {
		return imageUri;
	}
	
	public void setImageUri(String imageUri) {
		this.imageUri = imageUri;
	}

	public Double getPreco() {
		return preco;
	}

	public void setPreco(Double preco) {
		this.preco = preco;
	}
	
	

}
