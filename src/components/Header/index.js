import React from 'react'

import styled from 'styled-components'

const Container = styled.header`
  text-align: center
`

const Header = (props) =>
  <Container>
    <span>
      <h1>WHO'S WHO</h1>
      <h3><i>a musical guessing game</i></h3>
    </span>
  </Container>

export default Header
