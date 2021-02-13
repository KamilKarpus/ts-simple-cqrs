import { Container } from "inversify";
import { describe } from "mocha";
import { EventBus } from "../src/event.bus";
import { Types } from "../src/types";
import { EventWithoutHandler, HandlerWithoutDecorator, TestEvent, TestEventHandler, TestEventHandler2 } from "./test.requestst";
import * as sinon from 'sinon';
import { TestService } from "./test.service";
import { EventBusBuilder } from "../src/utils/event-bus.builder";
import { expect } from "chai";
import { InvalidRequestException } from "../src/exceptions/invalid-request.exception";
import { InvalidOperationException } from "../src/exceptions/invalid-operation.exception";

describe('Event Bus execution tests', () =>{
    var eventBus : EventBus;
    let service;
    beforeEach(()=>{
        let container = new Container();
        container.bind(Types.EventHandler).to(TestEventHandler);
        service = sinon.createStubInstance(TestService);
        container.bind("__TEST__").toConstantValue(service);
        container.bind(TestEventHandler).toSelf();
        eventBus = new EventBusBuilder()
            .addInversifyContainer(container)
            .build() as EventBus;
    })

    it('publish event should invoke injected service', async ()=>{
        var event = new TestEvent();
        eventBus.publish(event);
        sinon.assert.calledOnce(service.doSomethingAmazing)
    })
    it('publish event and invoke many handlers', async ()=>{
        eventBus.registerHandler(new TestEventHandler2(service));

        var event = new TestEvent();
        eventBus.publish(event);

        sinon.assert.calledTwice(service.doSomethingAmazing);
    })
    it('should throw exception when register handler without decorator', ()=>{
        let handler = new HandlerWithoutDecorator();
        expect(()=>eventBus.registerHandler(handler)).to.throw(InvalidRequestException);
    })

    it('should throw exception when handler is not registred', ()=>{
        let event = new EventWithoutHandler();
        expect(()=>eventBus.publish(event)).to.throw(InvalidOperationException);
    })

})