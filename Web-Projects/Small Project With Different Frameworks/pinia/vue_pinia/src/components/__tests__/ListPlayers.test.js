/** @format */

import { mount } from "@vue/test-utils";
import { createPinia } from "pinia";
import { describe, test, expect, beforeEach, afterEach } from "vitest";
import { usePlayerStore } from "../../pinia/playerStore";
import { waitFor } from "@testing-library/vue";
import ListPlayers from "../ListPlayers.vue";
import ListPlayer from "../ListPlayer.vue";
import { describe, test, expect, beforeEach, vi, afterEach } from "vitest";

describe("ListPlayers", () => {
  let wrapper;

  const players = [
    { id: 1, name: "Test Player 1" },
    { id: 2, name: "Test Player 2" },
    { id: 3, name: "Test Player 3" },
  ];

  let mockedGetPlayer;

  beforeEach(() => {
    const pinia = createPinia();
    const store = usePlayerStore(pinia);
    store.players = players;
    // mount the component
    mockedGetPlayer = vi.fn();

    wrapper = mount(ListPlayers, {
      global: {
        plugins: [pinia],
      },
      components: { ListPlayer },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  test('renders a list with id "players-list"', () => {
    expect(wrapper.find("#players-list").exists()).toBe(true);
  });

  test("renders a ListPlayer for each player in the players prop", () => {
    expect(wrapper.findAllComponents(ListPlayer).length).toBe(players.length);
  });
});
