import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterBoxComponent } from './ajouter-box.component';

describe('AjouterBoxComponent', () => {
  let component: AjouterBoxComponent;
  let fixture: ComponentFixture<AjouterBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
