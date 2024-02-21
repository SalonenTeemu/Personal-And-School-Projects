/** @format */

import { expect, describe, beforeEach, test, afterEach } from "vitest";
import { mount } from "@vue/test-utils";

import SelectedPlayer from "../SelectedPlayer.vue";

describe("SelectedPlayer component", () => {
  let wrapper;
  const player = { id: 1, name: "player 1", isActive: true };
  const inactivePlayer = { id: 2, name: "player 2", isActive: false };

  beforeEach(() => {
    wrapper = mount(SelectedPlayer, {
      props: { player },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  test("should render active player data correctly", () => {
    expect(wrapper.find("#player-name").text()).toBe("player 1");
    expect(wrapper.find("#player-status").text()).toBe("active");
  });

  test("should render inactive player data correctly", async () => {
    await wrapper.setProps({ player: inactivePlayer });
    expect(wrapper.find("#player-name").text()).toBe("player 2");
    expect(wrapper.find("#player-status").text()).toBe("inactive");
  });

  test("should not render if selected player is null", async () => {
    await wrapper.setProps({ player: null });
    const selectedPlayer = wrapper.find("#selected-player");
    expect(selectedPlayer.exists()).toBe(false);
  });
});
