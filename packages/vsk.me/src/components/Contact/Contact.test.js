/* global describe, test, expect */
import React from "react"
import Contact from "./Contact"
import { mount } from "enzyme"

describe("(Component) Contact", () => {
  test("should match the snapshot", () => {
    const comp = mount(<Contact/>)
    expect(comp).toMatchSnapshot()
  })
})
