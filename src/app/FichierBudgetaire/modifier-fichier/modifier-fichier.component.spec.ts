import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierFichierComponent } from './modifier-fichier.component';

describe('ModifierFichierComponent', () => {
  let component: ModifierFichierComponent;
  let fixture: ComponentFixture<ModifierFichierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierFichierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierFichierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
