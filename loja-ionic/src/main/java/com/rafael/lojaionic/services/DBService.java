package com.rafael.lojaionic.services;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.rafael.lojaionic.domain.Categoria;
import com.rafael.lojaionic.domain.Cidade;
import com.rafael.lojaionic.domain.Cliente;
import com.rafael.lojaionic.domain.Endereco;
import com.rafael.lojaionic.domain.Estado;
import com.rafael.lojaionic.domain.ItemPedido;
import com.rafael.lojaionic.domain.Pagamento;
import com.rafael.lojaionic.domain.PagamentoComBoleto;
import com.rafael.lojaionic.domain.PagamentoComCartao;
import com.rafael.lojaionic.domain.Pedido;
import com.rafael.lojaionic.domain.Produto;
import com.rafael.lojaionic.domain.enuns.EstadoPagamento;
import com.rafael.lojaionic.domain.enuns.Perfil;
import com.rafael.lojaionic.domain.enuns.TipoCliente;
import com.rafael.lojaionic.repositories.CategoriaRepository;
import com.rafael.lojaionic.repositories.CidadeRepository;
import com.rafael.lojaionic.repositories.ClienteRepository;
import com.rafael.lojaionic.repositories.EnderecoRepository;
import com.rafael.lojaionic.repositories.EstadoRepository;
import com.rafael.lojaionic.repositories.ItemPedidoRepository;
import com.rafael.lojaionic.repositories.PagamentoRepository;
import com.rafael.lojaionic.repositories.PedidoRepository;
import com.rafael.lojaionic.repositories.ProdutoRepository;

@Service
public class DBService {

	@Autowired
	private CategoriaRepository categoriaRepository;

	@Autowired
	private ProdutoRepository produtoRepository;

	@Autowired
	private EstadoRepository estadoRepository;

	@Autowired
	private CidadeRepository cidadeRepository;

	@Autowired
	private ClienteRepository clienteRepository;

	@Autowired
	private EnderecoRepository enderecoRepository;

	@Autowired
	private PedidoRepository pedidoRepository;

	@Autowired
	private PagamentoRepository pagamentoRepository;

	@Autowired
	private ItemPedidoRepository itemPedidoRepository;
	
	@Autowired
	private BCryptPasswordEncoder pe;

	public void instantiateTestDatabase() throws ParseException {
		Categoria cat1 = new Categoria(null, "Smoothies");
		

		categoriaRepository.saveAll(Arrays.asList(cat1));

		/*------------------------------PRODUTO------------------------------------------------------------------------------------------------------*/

		Produto p1 = new Produto(null, "RED WAVES","200g de morango, 50ml de leite, 170g de iogurte natural, 1 scoop de whey de baunilha.", "https://github.com/RafaelSouzaJava/imagens-projeto-faculdade/blob/main/img4.jpeg?raw=true", 15.00);
		Produto p2 = new Produto(null, "BANANA BLISS","200g de banana, canela, 50ml de leite, 170g de iogurte natural, 1 scoop de whey de baunilha.", "https://github.com/RafaelSouzaJava/imagens-projeto-faculdade/blob/main/img3.jpeg?raw=true", 15.00);
		Produto p3 = new Produto(null, "AÇAÍ ENERGY","300g de açaí, 170g de iogurte natural, 1 scoop de whey.", "https://github.com/RafaelSouzaJava/imagens-projeto-faculdade/blob/main/img2.jpeg?raw=true", 15.00);
		Produto p4 = new Produto(null, "FRESH AIR", "150g de abacaxi, 50g de banana, 50ml de suco de maracujá, 100ml de suco de laranja, 170g de iogurte natural, 1 scoop de whey de baunilha.", "https://github.com/RafaelSouzaJava/imagens-projeto-faculdade/blob/main/img1.jpeg?raw=true", 15.00);
		
		cat1.getProdutos().addAll(Arrays.asList(p1, p2, p3, p4));
	

		p1.getCategorias().addAll(Arrays.asList(cat1));
		p2.getCategorias().addAll(Arrays.asList(cat1));
		p3.getCategorias().addAll(Arrays.asList(cat1));
		p4.getCategorias().addAll(Arrays.asList(cat1));		
		

		produtoRepository.saveAll(Arrays.asList(p1, p2, p3, p4));

		/*-----------------------------------ESTADOS-------------------------------------------------------------------------------------------------*/

		Estado est1 = new Estado(null, "Ceará");

		estadoRepository.saveAll(Arrays.asList(est1));

		/*----------------------------------CIDADES--------------------------------------------------------------------------------------------------*/

		Cidade cid1 = new Cidade(null, "Fortaleza", est1);
		Cidade cid2 = new Cidade(null, "Maracanaú", est1);

		est1.getCidades().addAll(Arrays.asList(cid1, cid2));

		cidadeRepository.saveAll(Arrays.asList(cid1, cid2));

		/*----------------------------------CLIENTE E ENDEREÇOS-------------------------------------------------------------------------------------*/

		Cliente cli1 = new Cliente(null, "Rafael de Souza Alves", "rmfashionmoda@gmail.com", "16734662063",
				TipoCliente.PESSOAFISICA, pe.encode("?Kill4r3e2w1q#"));
		cli1.getTelefones().addAll(Arrays.asList("85965702213", "85987665012"));
		cli1.addPerfil(Perfil.ADMIN);

		Cliente cli2 = new Cliente(null, "Hinata Hyuga", "teste@gmail.com", "36712049075", TipoCliente.PESSOAFISICA, pe.encode("123"));
		cli2.getTelefones().addAll(Arrays.asList("85950227654"));
		cli1.addPerfil(Perfil.CLIENTE);

		Endereco end1 = new Endereco(null, "Rua 13 de Maio", "300", null, "Fátima", "60040531", cli1, cid1);

		Endereco end2 = new Endereco(null, "Rua 03", "234", null, "Parangaba", "60040531", cli2, cid2);

		cli1.getEnderecos().addAll(Arrays.asList(end1));
		cli2.getEnderecos().addAll(Arrays.asList(end2));

		clienteRepository.saveAll(Arrays.asList(cli1, cli2));
		enderecoRepository.saveAll(Arrays.asList(end1, end2));

		/*------------------------------------PEDIDO E PAGAMENTO------------------------------------------------------------------------------------*/

		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm");

		Pedido ped1 = new Pedido(null, sdf.parse("30/09/2023 10:32"), cli1, end1);
		Pedido ped2 = new Pedido(null, sdf.parse("25/12/2023 23:32"), cli2, end2);

		Pagamento pagto1 = new PagamentoComCartao(null, EstadoPagamento.QUITADO, ped1, 6);
		ped1.setPagamento(pagto1);

		Pagamento pagto2 = new PagamentoComBoleto(null, EstadoPagamento.PENDENTE, ped2, sdf.parse("28/12/2023 00:00"),
				null);
		ped2.setPagamento(pagto2);

		cli1.getPedidos().addAll(Arrays.asList(ped1));
		cli2.getPedidos().addAll(Arrays.asList(ped2));

		pedidoRepository.saveAll(Arrays.asList(ped1, ped2));
		pagamentoRepository.saveAll(Arrays.asList(pagto1, pagto2));

		/*-------------------------------------ITENS DE PEDIDO-----------------------------------------------------------------------------------*/

		ItemPedido ip1 = new ItemPedido(ped1, p1, 0.00, 1, 2000.00);
		ItemPedido ip2 = new ItemPedido(ped1, p3, 0.00, 2, 80.00);
		ItemPedido ip3 = new ItemPedido(ped2, p2, 100.00, 1, 800.00);

		ped1.getItens().addAll(Arrays.asList(ip1, ip2));
		ped2.getItens().addAll(Arrays.asList(ip3));

		p1.getItens().addAll(Arrays.asList(ip1));
		p2.getItens().addAll(Arrays.asList(ip3));
		p3.getItens().addAll(Arrays.asList(ip2));

		itemPedidoRepository.saveAll(Arrays.asList(ip1, ip2, ip3));
	}
}
