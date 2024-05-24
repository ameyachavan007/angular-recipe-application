import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/model/ingredient.model';
import { ShoppingService } from './services/shopping.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private ingredientsChangeSubscription: Subscription;
  constructor (private shoppingService: ShoppingService) {

  }

  ngOnInit(): void {
    this.ingredients = this.shoppingService.getShoppingList();
    this.ingredientsChangeSubscription = this.shoppingService.ingredientsChanged.subscribe({
      next: (ingredientsList: Ingredient[]) => {
        this.ingredients = ingredientsList;
      }
    });
  }

  onEditItem(i: number) {
    this.shoppingService.startedEditing.next(i);
  }

  ngOnDestroy(): void {
    this.ingredientsChangeSubscription.unsubscribe();
  }

}
