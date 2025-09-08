import { ActionReducer, INIT, MetaReducer, UPDATE } from '@ngrx/store';
import { authStateInterface } from '../authNgRx/auth.model';
import { RoutingPaths } from '../../../shared/urlRoutesEnum';

const STORAGE_KEY = '__app_state__';

export interface authStoreInterface {
  auth : authStateInterface;
}


export function hydrationMetaReducer<GlobalStateI extends authStoreInterface> ( reducer : ActionReducer< GlobalStateI > ) : ActionReducer< GlobalStateI > {
  
    return (state, action) : GlobalStateI => {
    // Hidratación al iniciar la app


        const isHomeURL = window.location.pathname === RoutingPaths.HOME_WITH_BAR  ||  window.location.pathname === RoutingPaths.HOME  ;

        const condition_HomeRoute_ActionType : boolean = !isHomeURL && (action.type === INIT || action.type === UPDATE )  
        

        if ( condition_HomeRoute_ActionType ) {

            const saved : string | null = localStorage.getItem(STORAGE_KEY);

            if ( saved ) {

                try {
                const parsedJSON = JSON.parse(saved) as Partial<authStoreInterface>;

                return reducer(
                    { ...(state as GlobalStateI), ...parsedJSON } as GlobalStateI ,
                    action
                );

                } catch { /* ignore corrupted storage */ }

            }
        }

        const next = reducer(state, action);

        // Persistencia en cada acción
        try {

            const toPersist : Partial<authStoreInterface> = {
                auth: next?.auth,
            };

            localStorage.setItem(STORAGE_KEY, JSON.stringify(toPersist));

        } 
        catch { /* storage full or private mode */ }

        return next;

    };
}

export const myMetaReducers : MetaReducer[] = [hydrationMetaReducer];