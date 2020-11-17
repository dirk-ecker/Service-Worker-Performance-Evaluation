import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UnsplashApiService {

  constructor(private httpClient: HttpClient) { }

  key = "p7F-7qF7auJjgYKKNV6XcSEsWuJNCu4OMGJ7pHTewxA";
  page = 1;
  per_page = 50;
  getImage() {
    return this.httpClient.get(
      `https://api.unsplash.com/photos/?page=${this.page}&per_page=${this.per_page}&client_id=${this.key}`
    );
  }
}