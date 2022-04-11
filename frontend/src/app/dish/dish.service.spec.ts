import { TestBed } from '@angular/core/testing';
import { DishService } from './dish.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('DishService', () => {
  let service: DishService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DishService]
    });

    service = TestBed.get(DishService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
