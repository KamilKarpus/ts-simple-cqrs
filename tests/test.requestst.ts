import { inject, injectable } from "inversify";
import { CommnadHandler, QueryHandler } from "../src";
import { EventHandler } from "../src/decorators/event-decorator";
import { EventBaseHandler } from "../src/models/event-handlers.interface";
import { EventBase } from "../src/models/event.interface";
import { CommandBaseHandler, CommandBaseHandlerWithResponse, QueryBaseHandler } from "../src/models/request-handler-interface";
import { ITestService, ServiceResponse, TestService } from "./test.service";

export class TestRequest{
    data: boolean;
}

export class TestResponse{
    data: boolean;
}

@injectable()
@CommnadHandler(TestRequest)
export class TestRequestHandler implements CommandBaseHandlerWithResponse<TestRequest,TestResponse>{

    async handle(request: TestRequest): Promise<TestResponse> {
        var testResponse = new TestResponse();
        testResponse.data = !request.data;
        return testResponse;
    }

}


export class TestQuery{

}

@injectable()
@QueryHandler(TestQuery)
export class TestQueryHandler implements QueryBaseHandler<TestQuery, TestResponse>{
    async handle(request: TestQuery): Promise<TestResponse> {
        const response = new TestResponse();
        response.data = true;
        return response;
    }

}

export class QueryWithInjectedService{

}

@injectable()
@QueryHandler(QueryWithInjectedService)
export class QueryWithInjectedServiceHandler implements QueryBaseHandler<QueryWithInjectedService, ServiceResponse>{

    constructor(@inject("__TEST__") private readonly service : ITestService){

    }
    async handle(request: QueryWithInjectedService): Promise<ServiceResponse> {
        return this.service.doSomethingAmazing();
    }

}


export class VoidCommand{

}

@CommnadHandler(VoidCommand)
export class VoidCommandHandler implements CommandBaseHandler<VoidCommand>{
    
    constructor(private readonly service : ITestService){

    }
    async handle(request: VoidCommand): Promise<void> {
        this.service.doSomethingAmazing();
    }

}


export class TestEvent{

}

@injectable()
@EventHandler(TestEvent)
export class TestEventHandler implements EventBaseHandler<TestEvent>{
    constructor(@inject("__TEST__") private readonly service : ITestService){

    }
    async handle(event: TestEvent): Promise<void> {
        this.service.doSomethingAmazing();
    }

}


@injectable()
@EventHandler(TestEvent)
export class TestEventHandler2 implements EventBaseHandler<TestEvent>{
    constructor(@inject("__TEST__") private readonly service : ITestService){

    }
    async handle(event: TestEvent): Promise<void> {
        this.service.doSomethingAmazing();
    }

}


export class HandlerWithoutDecorator implements EventBaseHandler<TestEvent>{
    handle(event: TestEvent): Promise<void> {
        throw new Error("Method not implemented.");
    }

}

export class EventWithoutHandler{

}