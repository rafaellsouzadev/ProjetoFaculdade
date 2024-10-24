import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EscolhaEnderecoPage } from './escolha-endereco.page';

describe('EscolhaEnderecoPage', () => {
  let component: EscolhaEnderecoPage;
  let fixture: ComponentFixture<EscolhaEnderecoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EscolhaEnderecoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
