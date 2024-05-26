import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarriorCardComponent } from './warrior-card.component';

describe('WarriorCardComponent', () => {
  let component: WarriorCardComponent;
  let fixture: ComponentFixture<WarriorCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WarriorCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WarriorCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
