export interface IContainerResolver{
    resolve<T>(param : string) : T[];
    hasDepedency(param : string) : boolean;
}