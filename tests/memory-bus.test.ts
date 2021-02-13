import { describe } from "mocha";
import { assert } from "chai";
import { MemoryBus, MemoryBusBuilder } from "../src";
import { Container } from "inversify";
import { Types } from "../src/types";
import {
  QueryWithInjectedService,
  QueryWithInjectedServiceHandler,
  TestQuery,
  TestQueryHandler,
  TestRequest,
  TestRequestHandler,
  TestResponse,
  VoidCommand,
  VoidCommandHandler,
} from "./test.requestst";
import * as sinon from 'sinon';
import { ServiceResponse, TestService } from "./test.service";


describe("Command and Query execution tests", () => {
  var bus: MemoryBus;
  beforeEach(() => {
    const container = new Container();
    container.bind(Types.CommnadHandler).to(TestRequestHandler);

    container.bind(Types.QueryHandler).to(TestQueryHandler);
    container.bind(Types.QueryHandler).to(QueryWithInjectedServiceHandler);

    container.bind("__TEST__").to(TestService);

    bus = new MemoryBusBuilder().addInversifyContainer(container).build() as MemoryBus;
  });
  it("excute command should return changed value", async () => {
    const request = new TestRequest();
    request.data = true;

    const response = await bus.excuteCommand(request);
    assert.equal(false, response.data);
  });

  it("execute query should return resposne", async () => {
    const query = new TestQuery();

    const response = await bus.excuteQuery<TestResponse>(query);

    assert.equal(true, response.data);
  });

  it("execute query should return value form injected service", async () => {
    const query = new QueryWithInjectedService();

    const response = await bus.excuteQuery<ServiceResponse>(query);

    assert.equal(1, response.id);
    assert.equal("AMEJZING", response.data);
    assert.equal(true, response.state);
  });

  it("execute void command should call injected service", async () =>{
    let service = sinon.createStubInstance(TestService);
    
    bus.register(new VoidCommandHandler(service));

    bus.excuteCommand(new VoidCommand());
    
    sinon.assert.calledOnce(service.doSomethingAmazing)
    
  });

  afterEach(() => {
    bus = null;
  });
});
