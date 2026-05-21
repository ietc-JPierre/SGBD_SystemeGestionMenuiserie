import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategorieService {

  categories = signal<any[]>([]);

  async loadCategories() {
    const data = await window.electronAPI.getCategories();
    this.categories.set(data);
  }

  async createCategory(data: any) {
    await window.electronAPI.createCategory(data);
    await this.loadCategories();
  }

  async updateCategory(id: number, data: any) {
    await window.electronAPI.updateCategory(id, data);
    await this.loadCategories();
  }

  async deleteCategory(id: number) {
    await window.electronAPI.deleteCategory(id);
    await this.loadCategories();
  }

}