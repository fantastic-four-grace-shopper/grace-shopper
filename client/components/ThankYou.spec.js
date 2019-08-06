import React from 'react'
import chai, {expect} from 'chai'
import chaiEnzyme from 'chai-enzyme'
chai.use(chaiEnzyme())
import {shallow} from 'enzyme'
import ThankYou from './ThankYou'

describe('ThankYou', () => {
  describe('should render Thank You', () => {
    let ThankYouWrapper

    beforeEach('create <ThankYou /> wrapper', () => {
      ThankYouWrapper = shallow(<ThankYou />)
    })
    it('includes a thank you note as a header', () => {
      expect(ThankYouWrapper.find('h2')).to.have.html(
        '<h2 id="order-placed">Your order has been placed!</h2>'
      )
    })
  })
})
