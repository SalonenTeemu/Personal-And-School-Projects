/** @format */
import { expect, test, describe, beforeEach, afterEach } from "vitest";
import { shallowMount } from "@vue/test-utils";

import RequestStatus from "../RequestStatus.vue";

const randomWord = () => Math.random().toString(36).substring(7);

describe("RequestStatus component", () => {
  let wrapper;
  const reqStatus = randomWord();

  beforeEach(() => {
    wrapper = shallowMount(RequestStatus, {
      slots: {
        status: reqStatus,
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  test("should render the component, inside which is an element with id 'request-status'", () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find("#request-status").exists()).toBe(true);
  });

  test("should render the component with the correct status", () => {
    const requestStatus = wrapper.find("#request-status");
    expect(requestStatus.exists()).toBe(true);
    expect(requestStatus.text()).toBe(reqStatus);
  });
});
