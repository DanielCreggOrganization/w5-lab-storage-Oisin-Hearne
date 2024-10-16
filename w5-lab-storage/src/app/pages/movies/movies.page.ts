import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class MoviesPage implements OnInit {
  movieName: string = '';
  releaseYear: string = '';
  movies: { name: string; year: string }[] = [];
  errorMessage: string = '';

  constructor(private storageService: StorageService) {}

  async ngOnInit() {
    await this.loadMovies();
  }

  async addMovie() {
    if (this.movieName && this.releaseYear) {
      const movie = { name: this.movieName, year: this.releaseYear };
      this.movies.push(movie);
      try {
        await this.storageService.set('movies', this.movies);
        this.movieName = '';
        this.releaseYear = '';
        this.errorMessage = '';
      } catch (error) {
        console.error('Error adding movie:', error);
        this.errorMessage = 'Error adding movie. Please try again.';
      }
    } else {
      this.errorMessage = 'Movie name and release year are required.';
    }
  }

  async editItem(itemIndex: number) {
    if(this.movieName && this.releaseYear) {
       this.movies[itemIndex] = {name: this.movieName, year: this.releaseYear}
       try{
        await this.storageService.set('movies', this.movies);
        this.movieName = '';
        this.releaseYear = '';
        this.errorMessage = '';
       } catch (error) {
        console.error("Error adding movie:", error);
        this.errorMessage = "Error making edit. Please try again.";
       }
    }
    else {
      this.errorMessage = "Please enter a name and release year for editing."
    }
  }

  async loadMovies() {
    try {
      const storedMovies = await this.storageService.get('movies');
      if (storedMovies) {
        this.movies = storedMovies;
      }
      this.errorMessage = '';
    } catch (error) {
      console.error('Error loading movies:', error);
      this.errorMessage = 'Error loading movies. Please try again.';
    }
  }

  async deleteMovie(index: number) {
    this.movies.splice(index, 1);
    try {
      await this.storageService.set('movies', this.movies);
      this.errorMessage = '';
    } catch (error) {
      console.error('Error deleting movie:', error);
      this.errorMessage = 'Error deleting movie. Please try again.';
    }
  }
}