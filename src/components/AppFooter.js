import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
      </div>
      <div className="ms-auto">
        <a href="/#" target="_blank" rel="noopener noreferrer">
          Avvocato App
        </a>
        <span className="ms-1">&copy; 2022 all right reserved.</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
