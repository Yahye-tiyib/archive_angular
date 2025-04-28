import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichierDuBoxComponent } from './fichier-du-box.component';

describe('FichierDuBoxComponent', () => {
  let component: FichierDuBoxComponent;
  let fixture: ComponentFixture<FichierDuBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FichierDuBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichierDuBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
