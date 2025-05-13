
export class GlobalComponent {
    public static readonly API_URL: string = 'https://api.example.com';

    public static readonly ID_REMOVED: number = -1;
    public static readonly ID_UNASSIGNED: number = 0;

    public static readonly TASK_STATUS_TO_DO: number = 0;
    public static readonly TASK_STATUS_IN_PROGRESS: number = 1;
    public static readonly TASK_STATUS_DONE: number = 2;
    public static readonly TASK_STATUS_REMOVED: number = -1;

    public static readonly TASK_MAX_PRIORITY: number = 30;
}