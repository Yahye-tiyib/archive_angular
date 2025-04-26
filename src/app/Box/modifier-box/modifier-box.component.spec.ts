import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierBoxComponent } from './modifier-box.component';

describe('ModifierBoxComponent', () => {
  let component: ModifierBoxComponent;
  let fixture: ComponentFixture<ModifierBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
