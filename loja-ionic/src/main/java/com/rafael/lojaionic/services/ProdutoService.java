package com.rafael.lojaionic.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.rafael.lojaionic.domain.Categoria;
import com.rafael.lojaionic.domain.Produto;
import com.rafael.lojaionic.domain.dto.NewProdutoDTO;
import com.rafael.lojaionic.domain.dto.ProdutoDTO;
import com.rafael.lojaionic.repositories.CategoriaRepository;
import com.rafael.lojaionic.repositories.ProdutoRepository;
import com.rafael.lojaionic.services.exceptions.ObjectNotFoundException;

@Service
public class ProdutoService {

	@Autowired
	private ProdutoRepository produtoRepository;
	
	@Autowired
	private CategoriaRepository categoriaRepository;
	
	public Produto find(Integer id) {
		Optional<Produto> produto = produtoRepository.findById(id);
		return produto.orElseThrow(() ->   new ObjectNotFoundException("Objeto não encontrado! id: " + id +
				", Tipo: " + Produto.class.getName()));
	}
	
	public List<Produto> findAll() {
		return produtoRepository.findAll();
	}
	
	public Page<Produto> search(String nome, List<Integer> ids, Integer page, 
			Integer linesPerPage, String orderBy, String direction) {
		
		PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction), orderBy);
		List<Categoria> categorias = categoriaRepository.findAllById(ids);
		return produtoRepository.search(nome, categorias, pageRequest);
	}
	
	public Produto insert(Produto produto) {
		produto.setId(null);
		produto = produtoRepository.save(produto);
		return produto;
	}
	
	
	public Produto fromDTO(NewProdutoDTO dto) {
		Categoria cat = new Categoria(dto.getIdCategoria(), null);
		Produto prod = new Produto(null, dto.getNome(),dto.getDescricao(), dto.getImagemUri() , dto.getPreco());
		prod.getCategorias().add(cat);
		
		return prod;
	}
	
	public Produto update(Produto produto) {
		Produto newProduto = find(produto.getId());
		newProduto(newProduto, produto);
		return produtoRepository.save(newProduto);
	}
	
	private void newProduto(Produto newProduto, Produto produto) {
		if (produto.getNome() != null ) {
			newProduto.setNome(produto.getNome());
		}
		if (produto.getDescricao() != null) {
			newProduto.setDescricao(produto.getDescricao());
		}
		if (produto.getImageUri() != null) {
			newProduto.setImageUri(produto.getImageUri());
		}
		if (produto.getPreco() != null) {
			newProduto.setPreco(produto.getPreco());
		}
		
	}
	
	public Produto fromDTO(ProdutoDTO dto) {
		Produto produto = new Produto(null, dto.getNome(),dto.getDescricao(),dto.getImageUri() ,dto.getPreco());
		
		return produto;
	}


}
