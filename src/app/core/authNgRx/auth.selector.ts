import { createFeatureSelector, createSelector } from "@ngrx/store";
import { authStateInterface } from "./auth.model";
import { userInterface } from "../../../shared/sharedContent/entities";
//import { userInterface } from "../../../shared/sharedContent/entities";


export const AUTH_FEATURE_KEY = 'auth'


export const selectAuth = createFeatureSelector<authStateInterface>(AUTH_FEATURE_KEY)


export const selectIsLoggedIn = createSelector( selectAuth, ( s : authStateInterface ) : boolean => s.isLoggedIn )

export const selectUser = createSelector( selectAuth, ( s : authStateInterface ) : userInterface | null => s.currentUser )

export const selectIsLoading = createSelector( selectAuth, s => s.isLoading ) ;

export const selectEror = createSelector( selectAuth, s => s.theError )


// Derivar admin por rol, no por flag manual

export const selectIsAdmin = createSelector( selectUser, ( user : userInterface | null ) : boolean => user?.role === 'admin' )
