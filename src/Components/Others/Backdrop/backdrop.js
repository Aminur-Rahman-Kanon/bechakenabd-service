import React from 'react'

const style = {
    width: '100%',
    height: '100vh',
    position: 'fixed',
    top: '0',
    left: '0',
    backgroundColor: '#00000099',
    zIndex: '400'
}

function Backdrop ({backdrop, closeSideDrawerDisplay}) {
    if (!backdrop) return;
  return (
    <div style={style} onClick={ closeSideDrawerDisplay }>
      
    </div>
  )
}

export default Backdrop
