import { createFeatureSelector, createSelector } from "@ngrx/store";
import { authStateInterface } from "./auth.model";


export const selectAuth = createFeatureSelector<authStateInterface>('auth')


export const selectIsLoggedIn = createSelector( selectAuth, s => s.isLoggedIn )

export const selectIsAdmin = createSelector( selectAuth, s => s.isAdmin )

export const selectUser = createSelector( selectAuth, s => s.currentUser )