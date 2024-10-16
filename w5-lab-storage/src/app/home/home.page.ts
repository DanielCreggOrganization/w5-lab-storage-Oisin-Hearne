import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [ FormsModule, IonicModule],
})
export class HomePage {
  key: string = ""
  value: string = ""
  output: string = ""
  keys: string[] = [""]
  pairs: string[] = []

  constructor(private storage: StorageService, private route: Router) {}

  async setItem() {
    try {
      await this.storage.set(this.key, this.value);
      this.output = `Set ${this.key}: ${this.value}`;
    } catch (error) {
      console.error("Error setting item", error);
      this.output = `Error setting item: ${error}`;
    }
  }

  async getItem() {
    try {
      const value = await this.storage.get(this.key);
      this.output = `Get ${this.key}: ${this.value}`
    } catch (error) {
      console.error("Error getting item", error)
      this.output = `Error getting item: ${error}`
    }
  }

  async removeItem() {
    try{
      this.output = `Deleting ${this.key}...`
      await this.storage.delete(this.key);
    } catch (error) {
      console.error("Error deleting item", error)
      this.output = `Error deleting item: ${error}`
    }
  }

  async clearItems() {
    try{
      this.output = `Clearing all keys.`
      await this.storage.clear();
    } catch (error) {
      console.error("Error deleting items", error)
      this.output = `Error deleting items: ${error}`
    }
  }

  async getKeys() {
    try{
      this.keys = await this.storage.keys()
      this.output = `Keys: ${this.keys}`
    } catch (error) {
      console.error("Error getting keys", error)
      this.output = `Error getting keys: ${error}`
    }
  }

  async numItems() {
    try{
      this.output = `Items: ${await this.storage.length()}...`
    } catch (error) {
      console.error("Error getting items", error)
      this.output = `Error getting item: ${error}`
    }
  }

  async forKeys() {
    try{
      await this.storage.forEach((k, v) => {this.pairs.push(k, v)})
      this.output = `Items: ${this.pairs}`
      this.pairs = []
    } catch (error) {
      console.error("Error getting items", error)
      this.output = `Error getting items: ${error}`
    }
  }

  movieNav() {
    this.route.navigate(['/movies'])
  }
}
