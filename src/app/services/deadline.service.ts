import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class DeadlineService {

    // Returns a dedline with changed date. dmy can be "d" (day), "m" (month), or "y" (year). Amaount can be + or -.
    changeDeadline <T extends { d: number; m: number; y: number }> (deadline: T, dmy: string, amount: number): T {
        switch (dmy) {
            case "d":
                deadline.d += amount;
                if (deadline.d > 31) {
                    deadline.d = 1;
                    deadline = this.changeDeadline(deadline, 'm', 1);
                } else if (deadline.d <= 0) {
                    deadline.d = 31;
                    deadline = this.changeDeadline(deadline, 'm', -1);
                }
                break;

            case "m":
                deadline.m += amount;
                if (deadline.m > 12) {
                    deadline.m = 1;
                    deadline = this.changeDeadline(deadline, 'y', 1);
                } else if (deadline.m <= 0) {
                    deadline.m = 12;
                    deadline = this.changeDeadline(deadline, 'y', -1);
                }
                break;

            case "y":
                deadline.y += amount;
                break;

            default:
                console.error('"dmy" can only be "d" (day), "m" (month), or "y" (year).');
                return deadline;
        }
        return deadline;
    }
}