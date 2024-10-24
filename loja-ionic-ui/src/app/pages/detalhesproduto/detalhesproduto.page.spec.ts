import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalhesprodutoPage } from './detalhesproduto.page';

describe('DetalhesprodutoPage', () => {
  let component: DetalhesprodutoPage;
  let fixture: ComponentFixture<DetalhesprodutoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhesprodutoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
