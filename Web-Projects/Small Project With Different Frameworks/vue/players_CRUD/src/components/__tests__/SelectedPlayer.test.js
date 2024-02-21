/** @format */

import { mount } from "@vue/test-utils";
import SelectedPlayer from "../SelectedPlayer.vue";
import { describe, test, expect, beforeEach, afterEach } from "vitest";

describe("SelectedPlayer", () => {
  let player;
  let wrapper;
  beforeEach(async () => {
    player = { id: 1, name: "Test Player", isActive: true };
    wrapper = mount(SelectedPlayer, { props: { player: null } });
    await wrapper.setProps({ player });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  test("displays the selected player information when a player is passed as a prop with correct ui", async () => {
    expect(wrapper.find(".player-id").text()).toBe("1");
    expect(wrapper.find("#player-name").text()).toBe("Test Player");
    expect(wrapper.find("#player-status").text()).toBe("active");
    // expect the checkbox to be checked
    expect(wrapper.find("#checkbox").element.checked).toBe(true);
    // expect the submit button to be disabled
    expect(wrapper.find(".btn-update").element.disabled).toBe(true);

    // Toggle the checkbox
    const checkbox = wrapper.find("#checkbox");
    if (checkbox.wrapperElement?._modelValue !== undefined) {
      // student is using v-model
      checkbox.element.checked = !checkbox.element.checked;
    }
    checkbox.trigger("change");
    await wrapper.vm.$nextTick();
    expect(wrapper.find("#player-status").text()).toBe("inactive");
    // expect the checkbox to be unchecked
    expect(wrapper.find("#checkbox").element.checked).toBe(false);
    // expect the submit button to be enabled
    expect(wrapper.find(".btn-update").element.disabled).toBe(false);
  });

  test("should not render if selected player is null", async () => {
    await wrapper.setProps({ player: null });
    const selectedPlayer = wrapper.find("#selected-player");
    expect(selectedPlayer.exists()).toBe(false);
  });

  test('emits a "delete-player" event with the player id when the delete button is clicked', async () => {
    wrapper.find(".btn-delete").trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("delete-player")).toEqual([[1]]);
  });

  test('emits a "put-player" event with the updated player active state when the update button is clicked', async () => {
    // Toggle the checkbox
    const checkbox = wrapper.find("#checkbox");
    if (checkbox.wrapperElement?._modelValue !== undefined) {
      // student is using v-model
      checkbox.element.checked = !checkbox.element.checked;
    }
    checkbox.trigger("change");

    const changedPlayerState = !player.isActive;
    await wrapper.vm.$nextTick();

    // Click the update button
    const updateBtn = wrapper.find(".btn-update");
    updateBtn.trigger("click");

    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("put-player")).toEqual([[changedPlayerState]]);
  });

  test("should not call handleUpdate if checkbox is clicked twice (aka player state is not changed)", async () => {
    // Toggle the checkbox
    const checkbox = wrapper.find("#checkbox");
    if (checkbox.wrapperElement?._modelValue !== undefined) {
      // student is using v-model
      checkbox.element.checked = !checkbox.element.checked;
    }
    checkbox.trigger("change");
    await wrapper.vm.$nextTick();
    if (checkbox.wrapperElement?._modelValue !== undefined) {
      // student is using v-model
      checkbox.element.checked = !checkbox.element.checked;
    }
    checkbox.trigger("change");
    await wrapper.vm.$nextTick();
    // Click the update button
    const updateBtn = wrapper.find(".btn-update");
    updateBtn.trigger("click");
    await wrapper.vm.$nextTick();
    // make sure the event is not emitted
    expect(wrapper.emitted("put-player")).toBe(undefined);
  });
});
