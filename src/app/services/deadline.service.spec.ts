import { TestBed } from '@angular/core/testing';
import { DeadlineService } from './deadline.service';

describe('deadlineService', () => {
    let service: DeadlineService;

    beforeEach(() => {
        TestBed.configureTestingModule({
        
        });
        service = TestBed.inject(DeadlineService);
    });

    it('expect changeDeadline({ d: 5, m: 6, y: 2030 }, "d", 1) to return {5, 7, 2030}}', () => {
        expect(service.changeDeadline({ d: 5, m: 6, y: 2030 }, 'd', 1)).toEqual({ d: 6, m: 6, y: 2030 });
    });

    it('expect changeDeadline({ d: 31, m: 6, y: 2035 }, "d", 1) to return {1, 7, 2035}}', () => {
        expect(service.changeDeadline({ d: 31, m: 6, y: 2035 }, 'd', 1)).toEqual({ d: 1, m: 7, y: 2035 });
    });
  
    it('expect changeDeadline({ d: 5, m: 7, y: 2031 }, "d", -1) to return {5, 7, 2030}}', () => {
        expect(service.changeDeadline({ d: 5, m: 7, y: 2031 }, 'y', -1)).toEqual({ d: 5, m: 7, y: 2030 });
    });

    it('expect an error: "" "dmy" can only be "d" (day), "m" (month), or "y" (year) "". when dmy is not "d", "m", or "y"', () => {
        spyOn(console, 'error');
        service.changeDeadline({ d: 5, m: 7, y: 2031 }, 'x', 1);
        expect(console.error).toHaveBeenCalledWith('"dmy" can only be "d" (day), "m" (month), or "y" (year).');
    });
});