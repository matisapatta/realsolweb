import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

class Datos extends Component {

Test = () => {
  const request = axios.get('/api/');
  request.then(({data})=>{
    alert(data);
  })

  
}

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
