import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { TaskComponent } from './task.component';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;

  beforeEach(async () => {
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'task') {
        return JSON.stringify({ id: 1, name: 'Stored Task' });
      }
      return JSON.stringify({});
    });

    await TestBed.configureTestingModule({
      imports: [TaskComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            snapshot: {
              paramMap: {
                get: () => null,
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;

    component.task = {
      name: 'task-test',
      id: 1,
      description: 'task-test-description',
      priority: 1,
      editMode: false,
      status: 1,
      deadline: {
        d: 31,
        m: 12,
        y: 1999,
      },
    };

    fixture.detectChanges();
  });

  it('test changeDeadline()', () => {
    component.changeDeadline(component.task, 'd', 1);

    expect(component.task.deadline.d).toBe(1);
    expect(component.task.deadline.m).toBe(1);
    expect(component.task.deadline.y).toBe(2000);
  });

  it('test priorety()', () => {
    component.changePriority(component.task, -1);
    expect(component.task.priority).toBe(1);

    component.changePriority(component.task, 2);
    expect(component.task.priority).toBe(3);

    component.changePriority(component.task, 1);
    expect(component.task.priority).toBe(3);
  })

  it('test getStatus()', () => {
    component.task.status = 0;
    expect(component.getStatus(component.task, 0)).toBe('To Do');
    expect(component.getStatus(component.task, 1)).toBe('Ongoing');
    expect(component.getStatus(component.task, 2)).toBe('Done');
  });

});
