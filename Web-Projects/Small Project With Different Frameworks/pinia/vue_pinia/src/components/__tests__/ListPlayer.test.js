/** @format */

import { mount } from "@vue/test-utils";
import { createPinia } from "pinia";

import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import { usePlayerStore } from "../../pinia/playerStore";
import { waitFor } from "@testing-library/vue";
import ListPlayer from "../ListPlayer.vue";
import { players } from "../../mocks/players";

describe("ListPlayer", () => {
  let wrapper;
  let div;
  let store;

  const player = players[0];
  beforeEach(() => {
    div = document.createElement("div");
    document.body.appendChild(div);
    const pinia = createPinia();
    store = usePlayerStore(pinia);

    // mount the component
    wrapper = mount(ListPlayer, {
      props: { player },
      global: {
        plugins: [pinia],
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
    div.remove();
  });
  test("renders a list item with the player's id as its id", () => {
    expect(wrapper.find("li").attributes("id")).toBe("player-" + player.id);
  });

  test("displays the player name inside the anchor element", () => {
    expect(wrapper.find("a").text()).toBe(player.name);
  });

  // sets the selectedPlayer in the store when the anchor element is clicked
  test("sets the selectedPlayer in the store when the anchor element is clicked", async () => {
    await wrapper.find("a").trigger("click");
    await waitFor(() => {
      expect(store.selectedPlayer).toEqual(player);
    });
  });
});
