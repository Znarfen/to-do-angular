import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryComponent } from './category.component';

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('if taskStatus = 0 getStatusName() shuld return "To Do"', () => {
    component.taskStatus = 0;
    expect(component.getStatusName()).toBe('To Do')
  })

  it('if taskStatus = 1 getStatusName() shuld return "In Progress"', () => {
    component.taskStatus = 1;
    expect(component.getStatusName()).toBe('In Progress')
  })

  it('if taskStatus = 2 getStatusName() shuld return "Done"', () => {
    component.taskStatus = 2;
    expect(component.getStatusName()).toBe('Done')
  })

  it('if taskStatus = -1 getStatusName() shuld return "Removed"', () => {
    component.taskStatus = -1;
    expect(component.getStatusName()).toBe('Removed')
  })

  it('if taskStatus = not (-1 to 2) , getStatusName() shuld return "Unknown"', () => {
    component.taskStatus = 123;
    expect(component.getStatusName()).toBe('Unknown')
  })

});
