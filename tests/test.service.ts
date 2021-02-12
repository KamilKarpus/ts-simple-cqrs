import { injectable } from "inversify";
export class ServiceResponse{
    id: number;
    data : string;
    state : boolean;
}


@injectable()
export class TestService implements ITestService{
    doSomethingAmazing() : ServiceResponse{
        return {
            id: 1,
            data: "AMEJZING",
            state : true
        };
    }
}


export interface ITestService{
    doSomethingAmazing() : ServiceResponse;
}