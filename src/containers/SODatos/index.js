import React, { Component } from 'react'
import { connect } from 'react-redux'

class Datos extends Component {


  render() {
    return (
      <div>
        Datos
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Datos)
