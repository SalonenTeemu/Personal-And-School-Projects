/** @format */
import { mount } from "@vue/test-utils";
import { createPinia } from "pinia";
import RequestStatus from "../RequestStatus.vue";
import { expect, test, describe, beforeEach, afterEach } from "vitest";
import { usePlayerStore } from "../../pinia/playerStore";

const randomWord = () => Math.random().toString(36).substring(7);

describe("RequestStatus component", () => {
  let wrapper;
  const reqStatus = randomWord();
  let store;

  beforeEach(() => {
    const pinia = createPinia();
    store = usePlayerStore(pinia);
    store.reqStatus = reqStatus;
    wrapper = mount(RequestStatus, {
      global: {
        plugins: [pinia],
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  test("should render the component with the correct status", () => {
    const requestStatus = wrapper.find("#request-status");
    expect(requestStatus.exists()).toBe(true);
    expect(requestStatus.text()).toBe(reqStatus);
  });
});
