import { Container } from "inversify";
import { describe } from "mocha";
import { EventBus } from "../src/event.bus";
import { Types } from "../src/types";
import { TestEvent, TestEventHandler } from "./test.requestst";
import * as sinon from 'sinon';
import { TestService } from "./test.service";
import { EventBusBuilder } from "../src/utils/event-bus.builder";

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
            .build();
    })

    it('publish event should invoke injected service', async ()=>{
        var event = new TestEvent();
        eventBus.publish(event);
        sinon.assert.calledOnce(service.doSomethingAmazing)
    })

})