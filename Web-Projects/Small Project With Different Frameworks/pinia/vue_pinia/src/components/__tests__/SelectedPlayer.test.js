/** @format */

import { mount } from "@vue/test-utils";
import { createPinia } from "pinia";
import { waitFor } from "@testing-library/vue";
import SelectedPlayer from "../SelectedPlayer.vue";
import { describe, test, expect, beforeEach, afterEach } from "vitest";
import { usePlayerStore } from "../../pinia/playerStore";
import { players } from "../../mocks/players";

describe("SelectedPlayer", () => {
  let wrapper;
  let store;

  beforeEach(() => {
    const pinia = createPinia();
    store = usePlayerStore(pinia);
    store.players = players;
    store.selectedPlayer = players[0];
    wrapper = mount(SelectedPlayer, {
      global: {
        plugins: [pinia],
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  test("displays the selected player information correctly", () => {
    expect(wrapper.find(".player-id").text()).toBe(players[0].id.toString());
    expect(wrapper.find("#player-name").text()).toBe(players[0].name);
    expect(wrapper.find("#checkbox").element.checked).toBe(players[0].isActive);
  });

  test("updates the player's status on checkbox change and enables update button", async () => {
    const checkbox = wrapper.find("#checkbox");
    await checkbox.setChecked(!store.selectedPlayer.isActive);
    expect(wrapper.find(".btn-update").element.disabled).toBe(false);
  });

  test("calls store action to update player on update button click", async () => {
    const initialActiveStatus = store.selectedPlayer.isActive;
    // deep clone the first player from the players array

    const checkbox = wrapper.find("#checkbox");
    await checkbox.setChecked(!initialActiveStatus);
    await wrapper.find(".btn-update").trigger("click");

    await waitFor(() => {
      expect(store.selectedPlayer.isActive).not.toBe(initialActiveStatus);
      expect(
        store.players.find((p) => p.id === players[0].id).isActive
      ).not.toBe(initialActiveStatus);
    });
  });

  test("calls store action to delete player on delete button click", async () => {
    await wrapper.find(".btn-delete").trigger("click");

    await waitFor(() => {
      expect(store.selectedPlayer).toBeNull();
      expect(store.players.find((p) => p.id === 1)).toBeUndefined();
    });
  });

  test("should not render if selected player is null", async () => {
    store.selectedPlayer = null;
    await wrapper.vm.$nextTick();
    expect(wrapper.find("#selected-player").exists()).toBe(false);
  });
});
