/** @format */

import { mount } from "@vue/test-utils";
import { createPinia } from "pinia";
import AddPlayer from "../AddPlayer.vue";
import { describe, test, expect, beforeEach, afterEach } from "vitest";
import { usePlayerStore } from "../../pinia/playerStore";
import { waitFor } from "@testing-library/vue";

describe("AddPlayer", () => {
  let wrapper;
  let store;

  beforeEach(() => {
    const pinia = createPinia();
    store = usePlayerStore(pinia);
    wrapper = mount(AddPlayer, {
      global: {
        plugins: [pinia],
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  test("adds a player to the store when the form is submitted", async () => {
    const input = wrapper.find("input");
    input.element.value = "Test Player";
    input.trigger("input");
    wrapper.find("form").trigger("submit");

    await waitFor(() => {
      expect(store.players).toEqual([
        { name: "Test Player", isActive: false, id: 6 },
      ]);
    });
  });

  test("clears the input when the form is submitted", async () => {
    const input = wrapper.find("input");
    input.element.value = "Test Player";
    input.trigger("input");
    wrapper.find("form").trigger("submit");
    await waitFor(() => {
      expect(store.players).toEqual([
        { name: "Test Player", isActive: false, id: 6 },
      ]);
    });
    expect(input.element.value).toBe("");
  });
});
