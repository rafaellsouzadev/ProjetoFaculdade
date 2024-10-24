package com.rafael.lojaionic.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rafael.lojaionic.domain.ItemPedido;
import com.rafael.lojaionic.domain.ItemPedidoPK;

public interface ItemPedidoRepository extends JpaRepository<ItemPedido, ItemPedidoPK>{

}
