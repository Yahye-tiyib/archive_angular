import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterFichierComponent } from './ajouter-fichier.component';

describe('AjouterFichierComponent', () => {
  let component: AjouterFichierComponent;
  let fixture: ComponentFixture<AjouterFichierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterFichierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterFichierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
