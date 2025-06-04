import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(() => {

    localStorage.clear();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(component, 'gotoSubPage');
    function gotoSubPage(arg: string) {return};

    component.projects = [
      {
        name: "PROJECT_TEST",
        description: "Used for testing... Stay at a safe distance!",
        deadline: {
          d: 10,
          m: 7,
          y: 3003
        },
        tasks: []
      },
      {
        name: "OTHER_TEST",
        description: "Used for testing... Stay at a safe distance!",
        deadline: {
          d: 8,
          m: 6,
          y: 3002
        },
        tasks: []
      },
      {
        name: "THING",
        description: "Used for testing... Stay at a safe distance!",
        deadline: {
          d: 6,
          m: 5,
          y: 3001
        },
        tasks: []
      }
    ];
    localStorage.setItem('PROJECT_TEST', JSON.stringify(component.projects[0]));
    localStorage.setItem('OTHER_TEST', JSON.stringify(component.projects[1]));
    localStorage.setItem('THING', JSON.stringify(component.projects[2]));

  });

  it('should add a new project if passed all conditions; no spaces, no unsupoeted chars, not allredy existing, project have a name', () => {
    spyOn(window, 'alert');

    component.addProject('New-Pro');
    expect(component.projects.length).toBe(4);

    component.addProject('');
    expect(window.alert).toHaveBeenCalledWith("Project Needs To Have A Name");

    component.addProject('Ö');
    expect(window.alert).toHaveBeenCalledWith("You Have Used Unsuported Characters");

    component.addProject('New Pro');
    expect(window.alert).toHaveBeenCalledWith("No Spaces In Project Name");

    component.addProject('New-Pro');
    expect(window.alert).toHaveBeenCalledWith('Name "NEW-PRO" Alredy In Use');

    expect(component.projects.length).toBe(4);
  });

  it('should have corect name after being added', () => {
    component.addProject('New-Pro-2');
    expect(localStorage.getItem("NEW-PRO-2")).not.toBeNull();
  })

  it('testing changeProjectName() should change project name', () => {
    component.projectReName = 'new-project-test';
    component.changeProjectName(component.projects[0]);

    expect(localStorage.getItem("PROJECT_TEST")).toBeNull();
    expect(localStorage.getItem("NEW-PROJECT-TEST")).not.toBeNull();
  });

  it('should change projects to only contain projects that matches with projectSearch', () => {

    component.projectSearch = "TEST"
    component.searchProjects();
    expect(component.projects.length).toBe(2);

    component.projectSearch = "other"
    component.searchProjects();
    expect(component.projects[0].name).toBe("OTHER_TEST");

    component.projectSearch = ""
    component.searchProjects();
    expect(component.projects.length).toBe(3);
  })

  it('shoud get all projects from localstorage', () => {
    expect(component.getProjects().length).toBe(3);
  })
});
