import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmacaoPedidoPage } from './confirmacao-pedido.page';

describe('ConfirmacaoPedidoPage', () => {
  let component: ConfirmacaoPedidoPage;
  let fixture: ComponentFixture<ConfirmacaoPedidoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmacaoPedidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
