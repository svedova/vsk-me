/* global describe, test */
import React from "react"
import { mount } from "enzyme"
import About from "./index"

describe("(Component) About", () => {
  test("should match the snapshot", () => {
    const comp = mount(<About/>)
    expect(comp).toMatchSnapshot()
  })
})