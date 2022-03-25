
export class Page<T> {

    constructor(public content: T[],
                public totalElements: number, // total amount of elements.
                public number : number, // number of the current Slice.
                public size : number, //the size of the Slice.
                public totalPages : number, // number of total pages.
                public numberOfElements : number, //the number of elements currently on this Slice.
                public first : boolean,
                public last : boolean,
                public empty : boolean) {}
    // fonction utilitaire, genere une page vide du type voulu    
    public static emptyPage<T>() : Page<T> {
        return new Page<T>([], 0, 0, 5, 1, 0, true, true, true);
    }
}
