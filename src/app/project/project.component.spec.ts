import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectComponent } from './project.component';
import { Router } from '@angular/router';

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;

  const routerStub = {
    url: '/testpro/testpro'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectComponent],
      providers: [
        { provide: Router, useValue: routerStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;

    localStorage.clear();
    localStorage.setItem('TESTPRO', JSON.stringify({
      name: "TESTPRO",
      description: "test",
      deadline: { d: 31, m: 12, y: 1999 },
      tasks: []
    }));

    // Mock tings that can mess with testing

    component.goToHome = () => {};

    component.save = () => {};

    fixture.detectChanges();
  });

  it('should add a task to the project', () => {
    component.addTask();
    expect(component.project.tasks.length).toBe(1);
  });

  it('should change deadline to day = 1 , month = 1 , year = 2000', () => {
    component.project.deadline = { d: 31, m: 12, y: 1999 };
    component.changeDeadline('d', 1)
    expect(component.project.deadline.d).toBe(1);
    expect(component.project.deadline.m).toBe(1);
    expect(component.project.deadline.y).toBe(2000);
  });

  it('should change deadline to day = 31 , month = 12 , year = 1999', () => {
    component.project.deadline = { d: 1, m: 1, y: 2000 };
    component.changeDeadline('d', -1)
    expect(component.project.deadline.d).toBe(31);
    expect(component.project.deadline.m).toBe(12);
    expect(component.project.deadline.y).toBe(1999);
  });

  it('should change description on project', () => {
    component.cangeDescription("New description");
    expect(component.project.description).toBe("New description");
  });

  it('should delite project when selecten "ok" on confirm', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    component.removeProject()
    expect(localStorage.getItem("TESTPRO")).toBeNull()
  })

  it('should not delite project when selecten "cancel" on confirm', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    component.removeProject()
    expect(localStorage.getItem("TESTPRO")).not.toBeNull()
  })

  it('Every id should be unique', () => {
    component.addTask();
    let checkId = component.project.tasks[0].id

    for (let i = 0; i < 1000; i++) {
      component.addTask();
    }
    for (let taskIndex1 = 0; checkId < component.project.tasks.length; taskIndex1++) {
      for (let taskIndex2 = 0; taskIndex2 < component.project.tasks.length; taskIndex2++) {
        if (taskIndex1 != taskIndex2 && component.project.tasks[taskIndex1] == component.project.tasks[taskIndex2]) {
          fail("Tasks with the same id exists!")
        }
      }
    }
    expect(true).toBeTrue();
  })

});