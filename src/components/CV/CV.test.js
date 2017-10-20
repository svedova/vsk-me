/* global describe, test, expect */
import React from "react"
import CV from "./CV"
import { mount } from "enzyme"

describe("(Components) CV", () => {
  test("should match the snapshot", () => {
    const comp = mount(<CV/>)
    expect(comp).toMatchSnapshot()
  })
})