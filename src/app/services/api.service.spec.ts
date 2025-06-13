import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ApiService);
  });

  it('testing getTasks() failure', () => {
    spyOn(console, 'warn');
    service.getTasks("somthing wrong").subscribe((res) => {  
      expect(console.warn).toHaveBeenCalledWith('no connection to api: ' + service.apiUrl + "somthing wrong")
    })
  });
});