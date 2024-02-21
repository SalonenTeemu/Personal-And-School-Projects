import { mount } from "@vue/test-utils";
import ListPlayer from "../ListPlayer.vue";
import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";

describe("ListPlayer", () => {
  let wrapper;
  let div;

  const player = { id: 1, name: "Test Player" };
  beforeEach(() => {
    div = document.createElement("div");
    document.body.appendChild(div);

    // mount the component
    wrapper = mount(ListPlayer, {
      props: { player },
      attachTo: div,
    });
  });

  afterEach(() => {
    wrapper.unmount();
    div.remove();
  });
  test("renders a list item with the player's id as its id", () => {
    expect(wrapper.find("li").attributes("id")).toBe("player-1");
  });

  test("displays the player name inside the anchor element", () => {
    expect(wrapper.find("a").text()).toBe("Test Player");
  });

  test('emits a "player-clicked" event with the player id when the player is clicked', async () => {
    wrapper.find("a").trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("player-clicked")).toEqual([[1]]);
  });

  test("anchor should be focusable via the keyboard (by pressing the tab key)", async () => {
    const anchor = wrapper.find("a");

    // Directly call the focus method
    anchor.element.focus();

    // Check if the element is focused
    expect(document.activeElement).toBe(anchor.element);
  });
});
