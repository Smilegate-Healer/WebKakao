import React from 'react'
import { inject } from 'mobx-react'
import './styles.scss'
import Me from "../Me"

@inject("stores")
class More extends React.Component {

  render() {
    return (
      <div>
        <Me/>
      </div>
    )
  }
}

export default More