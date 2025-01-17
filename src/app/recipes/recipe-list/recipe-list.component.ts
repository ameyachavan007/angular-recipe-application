import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from '../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  recipesChangeSubscription: Subscription;

  constructor (
    private router: Router,
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {

  }

  ngOnInit(): void {
    this.recipesChangeSubscription = this.recipeService.recipesChanged
    .subscribe({
      next: (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    })
    this.recipes = this.recipeService.getRecipe();
  }

  onNewRecipeClicked() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy(): void {
   this.recipesChangeSubscription.unsubscribe(); 
  }

}
