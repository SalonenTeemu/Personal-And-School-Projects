/** @format */

import { mount } from "@vue/test-utils";
import AuthUser from "../AuthUser.vue";
import { describe, it, expect, afterEach } from "vitest";

describe("Link and button text", () => {
  let wrapper;

  afterEach(() => {
    wrapper.unmount();
  });

  it('Link text is "Logout", when isLoggedIn is true', () => {
    wrapper = mount(AuthUser, {
      props: {
        isLoggedIn: true,
      },
    });

    expect(wrapper.find("a").text()).toBe("Logout");
  });

  it(' "Go to register" by default in link, "login" by default in button', () => {
    wrapper = mount(AuthUser, {
      props: {
        isLoggedIn: false,
      },
    });

    expect(wrapper.find("a").text()).toBe("Go to register");
    expect(wrapper.find("button").text()).toMatch(/[Ll]ogin/);
  });

  it('Text is "Go to login" when isLoggedIn is false and Link is clicked once, "register" in button', async () => {
    wrapper = mount(AuthUser, {
      props: {
        isLoggedIn: false,
      },
    });
    await wrapper.find("a").trigger("click");

    expect(wrapper.find("a").text()).toBe("Go to login");
    expect(wrapper.find("button").text()).toMatch(/[Rr]egister/);
  });
});

describe("Logout: Emited events", () => {
  let wrapper;

  afterEach(() => {
    wrapper.unmount();
  });

  it('emits "logout" event when isLoggedIn is true and the logout link is clicked', () => {
    wrapper = mount(AuthUser, {
      props: {
        isLoggedIn: true,
      },
    });
    // click the link

    wrapper.find("a").trigger("click");
    expect(wrapper.emitted("logout")).toBeTruthy();
  });
});

describe("submit", () => {
  let wrapper;

  afterEach(() => {
    wrapper.unmount();
  });

  it('emits "login" event with username and password when isLogin is true', () => {
    wrapper = mount(AuthUser, {
      props: {
        isLoggedIn: false,
      },
    });

    const userDetails = {
      username: "test",
      password: "password",
    };
    // Fill inputs with ids auth-username and auth-password
    wrapper.find("#username").setValue(userDetails.username);
    wrapper.find("#password").setValue(userDetails.password);
    // Trigger submit event in the form
    wrapper.find("form").trigger("submit");
    expect(wrapper.emitted("login")).toBeTruthy();
    expect(wrapper.emitted("login")[0][0]).toEqual({ ...userDetails });
  });

  it('emits "register" event with username and password when isLogin is false', () => {
    wrapper = mount(AuthUser, {
      props: {
        isLoggedIn: false,
      },
    });
    // click the link
    wrapper.find("a").trigger("click");
    const userDetails = {
      username: "test",
      password: "password",
    };
    // Fill inputs with ids auth-username and auth-password
    wrapper.find("#username").setValue(userDetails.username);
    wrapper.find("#password").setValue(userDetails.password);
    // Trigger submit event in the form
    wrapper.find("form").trigger("submit");
    expect(wrapper.emitted("register")).toBeTruthy();
    expect(wrapper.emitted("register")[0][0]).toEqual({ ...userDetails });
  });
});
