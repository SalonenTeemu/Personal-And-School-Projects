/** @format */

import { mount } from "@vue/test-utils";
import AddPlayer from "../AddPlayer.vue";
import { describe, test, expect, beforeEach, afterEach } from "vitest";

describe("AddPlayer", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(AddPlayer);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  test('emits an "add-player" event with the input value when the form is submitted', async () => {
    const input = wrapper.find("input");
    input.element.value = "Test Player";
    input.trigger("input");
    wrapper.find("form").trigger("submit");
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("add-player")).toEqual([["Test Player"]]);
  });

  test("clears the input when the form is submitted", async () => {
    const input = wrapper.find("input");
    input.element.value = "Test Player";
    input.trigger("input");
    wrapper.find("form").trigger("submit");
    await wrapper.vm.$nextTick(); // How long is next tick?

    expect(input.element.value).toBe("");
  });
});
